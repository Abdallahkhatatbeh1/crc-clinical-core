import { ArrowRight, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const StudiesCTA = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

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
            Partner with <span className="text-accent">CRC</span>
          </h2>
          <p 
            className={`text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A trusted clinical trial site for global CROs and sponsors.
          </p>

          {/* Trust Points */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {["GCP Compliant", "Treatment-Naïve Populations", "Fast Recruitment"].map((item) => (
              <div key={item} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/90">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/why-us">
              <Button variant="hero" size="xl" className="group min-w-[220px]">
                Start a Study
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Contact */}
          <div 
            className={`flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20 transition-all duration-700 delay-500 ${
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

export default StudiesCTA;
