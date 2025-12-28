import { useState } from "react";
import { Send, Upload, User, Mail, Phone, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().trim().min(10, "Please describe your experience").max(2000, "Experience description is too long"),
  coverLetter: z.string().trim().max(3000, "Cover letter is too long").optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const availablePositions = [
  { value: "investigator", label: "Principal / Sub-Investigator" },
  { value: "scientist", label: "Research Scientist" },
  { value: "pharmacist", label: "Clinical Pharmacist" },
  { value: "coordinator", label: "Clinical Research Coordinator" },
  { value: "data_specialist", label: "Data Management Specialist" },
  { value: "clinical_staff", label: "Research Nurse / Clinical Staff" },
  { value: "lab_technician", label: "Laboratory Technician" },
  { value: "quality_assurance", label: "Quality Assurance Specialist" },
  { value: "regulatory_affairs", label: "Regulatory Affairs Specialist" },
  { value: "other", label: "Other Position" },
];

const JobApplicationForm = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
  });

  const handleChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ApplicationFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We will review your application and get back to you soon.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        coverLetter: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-4">Apply Now</BrandTag>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Job Application <span className="text-primary">Form</span>
            </h2>
            <p className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Take the first step towards joining our team. Fill out the form below and we'll be in touch.
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className={`bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="grid gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={`pl-12 h-12 ${errors.fullName ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`pl-12 h-12 ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+962 xxx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`pl-12 h-12 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Position Dropdown */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Position Applying For *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleChange("position", value)}
                  >
                    <SelectTrigger className={`pl-12 h-12 bg-background ${errors.position ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      {availablePositions.map((position) => (
                        <SelectItem 
                          key={position.value} 
                          value={position.value}
                          className="cursor-pointer hover:bg-muted"
                        >
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.position && (
                  <p className="text-destructive text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Professional Experience *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    placeholder="Briefly describe your relevant experience, qualifications, and skills..."
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    className={`pl-12 min-h-[120px] resize-none ${errors.experience ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.experience && (
                  <p className="text-destructive text-sm mt-1">{errors.experience}</p>
                )}
              </div>

              {/* Cover Letter (Optional) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cover Letter <span className="text-muted-foreground">(Optional)</span>
                </label>
                <Textarea
                  placeholder="Tell us why you'd be a great fit for this position..."
                  value={formData.coverLetter}
                  onChange={(e) => handleChange("coverLetter", e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Application
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By submitting, you agree to our privacy policy and consent to being contacted regarding your application.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobApplicationForm;
