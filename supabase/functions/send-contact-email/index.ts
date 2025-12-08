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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, subject, message }: ContactEmailRequest = await req.json();

    // Send notification email to CRC
    const emailResponse = await resend.emails.send({
      from: "CRC Contact Form <onboarding@resend.dev>",
      to: ["info@crcjo.com"],
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0097D6; border-bottom: 2px solid #0097D6; padding-bottom: 10px;">
            New Contact Form Submission
          </h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
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
          
          <p>Dear ${name},</p>
          
          <p>We have received your message regarding "<strong>${subject}</strong>" and will respond within 24-48 business hours.</p>
          
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
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
