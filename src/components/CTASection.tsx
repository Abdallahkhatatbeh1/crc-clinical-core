import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={sectionRef} className="py-32 gradient-brand relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-white blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 
              className={`text-white text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Ready to Partner With <span className="text-accent">Us</span>?
            </h2>
            <p 
              className={`text-xl text-white/85 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Conduct your next clinical study in Jordan with confidence, efficiency, and internationally aligned quality.
            </p>
          </div>

          {/* Single CTA Button */}
          <div 
            className={`flex justify-center items-center mb-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/why-us">
              <Button variant="hero" size="xl" className="group min-w-[280px]">
                Partner With Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div 
            className={`flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href="mailto:info@crcjo.com" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              <span>info@crcjo.com</span>
            </a>
            <a href="tel:+962123456789" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
              <span>+962 123 456 789</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
