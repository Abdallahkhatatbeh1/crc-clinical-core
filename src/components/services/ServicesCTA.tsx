import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const ServicesCTA = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const { content } = useSiteContent("services", "cta");

  const features = [
    content.feature1 || "End-to-End Support",
    content.feature2 || "Fast Start-Up",
    content.feature3 || "Audit-Ready"
  ];

  const buttonPrimaryUrl = content.button_primary_url || "/why-us";
  const buttonSecondaryUrl = content.button_secondary_url || "/studies";

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 gradient-brand relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Ready to Start Your"} <span className="text-accent">{content.title_highlight || "Clinical Trial"}</span>?
          </h2>
          <p 
            className={`text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.description || "Partner with CRC for comprehensive, GCP-compliant clinical trial services in Jordan and the Middle East."}
          </p>

          {/* Features */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {features.map((item) => (
              <div key={item} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/90">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to={buttonPrimaryUrl}>
              <Button variant="hero" size="xl" className="group min-w-[220px]">
                {content.button_primary || "Get Started"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={buttonSecondaryUrl}>
              <Button 
                variant="ghost" 
                size="xl" 
                className="text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                {content.button_secondary || "View Our Studies"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
