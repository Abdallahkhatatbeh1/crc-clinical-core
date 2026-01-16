import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

// Server-side input validation
function validateInput(data: ContactEmailRequest): { valid: boolean; error?: string } {
  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 100) {
    return { valid: false, error: 'Invalid name: must be 2-100 characters' };
  }
  
  // Email validation with proper regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email) || data.email.length > 254) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Subject validation
  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 1 || data.subject.length > 200) {
    return { valid: false, error: 'Invalid subject: must be 1-200 characters' };
  }
  
  // Message validation
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10 || data.message.length > 5000) {
    return { valid: false, error: 'Invalid message: must be 10-5000 characters' };
  }
  
  // Company validation (optional)
  if (data.company && (typeof data.company !== 'string' || data.company.length > 100)) {
    return { valid: false, error: 'Invalid company: must be under 100 characters' };
  }
  
  return { valid: true };
}

// Sanitize HTML to prevent XSS in email content
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    // Check rate limit
    if (isRateLimited(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": "60",
            ...corsHeaders 
          },
        }
      );
    }

    // Parse and validate request body
    let requestData: ContactEmailRequest;
    try {
      requestData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side validation
    const validation = validateInput(requestData);
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, company, subject, message } = requestData;

    // Sanitize all inputs for email content
    const safeName = sanitizeHtml(name.trim());
    const safeEmail = sanitizeHtml(email.trim());
    const safeCompany = company ? sanitizeHtml(company.trim()) : '';
    const safeSubject = sanitizeHtml(subject.trim());
    const safeMessage = sanitizeHtml(message.trim());

    // Send notification email to CRC
    const emailResponse = await resend.emails.send({
      from: "CRC Contact Form <onboarding@resend.dev>",
      to: ["info@crcjo.com"],
      subject: `New Contact: ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0097D6; border-bottom: 2px solid #0097D6; padding-bottom: 10px;">
            New Contact Form Submission
          </h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
            <p><strong>Subject:</strong> ${safeSubject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from the CRC website contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to the sender
    await resend.emails.send({
      from: "CRC Clinical Research Center <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting CRC",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0097D6;">Thank You for Contacting Us!</h1>
          
          <p>Dear ${safeName},</p>
          
          <p>We have received your message regarding "<strong>${safeSubject}</strong>" and will respond within 24-48 business hours.</p>
          
          <p>If you have any urgent inquiries, please don't hesitate to reach us at <a href="mailto:info@crcjo.com">info@crcjo.com</a>.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>CRC Clinical Research Center</strong><br>Irbid, Jordan</p>
          
          <hr style="margin-top: 40px; border: none; border-top: 1px solid #e0e0e0;">
          
          <p style="color: #888; font-size: 12px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in send-contact-email function:", errorMessage);
    // Return generic error to client (don't expose internal details)
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
