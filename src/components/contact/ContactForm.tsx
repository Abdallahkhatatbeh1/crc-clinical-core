import { useState } from "react";
import { Send, User, Mail, Building2, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(200, "Company name must be less than 200 characters").optional(),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000, "Message must be less than 2000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  "Clinical Trial Partnership",
  "Site Feasibility Inquiry",
  "General Information",
  "Career Opportunities",
  "Other"
];

const ContactForm = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting CRC. We'll respond within 24-48 hours.",
      });
      
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Side */}
          <div className={`lg:col-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <BrandTag className="mb-6">Contact Us</BrandTag>
            <h2 className="text-foreground mb-6">
              Let's Start a <span className="text-primary">Conversation</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              CRC is a GCP-compliant clinical research center in Jordan, partnering with global CROs and sponsors to conduct high-quality Phase I–IV clinical trials.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a href="mailto:info@crc-jordan.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@crc-jordan.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    Irbid, Jordan<br />
                    Clinical Research District
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {["GCP Compliant", "Phase I-IV", "Global Partners"].map((badge) => (
                    <span key={badge} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-foreground">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`pl-11 h-12 ${errors.name ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`pl-11 h-12 ${errors.email ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="pl-11 h-12"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 rounded-md border bg-background text-foreground ${errors.subject ? 'border-destructive' : 'border-input'}`}
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      className={`pl-11 resize-none ${errors.message ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
