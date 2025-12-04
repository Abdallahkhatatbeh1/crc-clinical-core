import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { content } = useSiteContent("home", "hero");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center gradient-brand overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/3 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/15 rounded-full animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/25 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">{content.badge || "GCP-Compliant Research Center"}</span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Clinical Research"}
            <span className="block mt-2">
              <span className="text-accent">{content.title_highlight || "Excellence"}</span> {content.title_suffix || "& Trust"}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl lg:text-2xl text-white/85 mb-6 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.subtitle || "Delivering reliable, high-quality Phase I–IV clinical trials in Jordan and the Middle East — supported by experienced investigators and research professionals, and trusted by global CROs and scientific sponsors."}
          </p>

          <p
            className={`text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.description || "We collaborate with global CROs and pharmaceutical sponsors for precise trial management, optimized operations, and accelerated patient recruitment."}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group">
                {content.cta_primary || "Work With Us"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/why-us">
              <Button 
                variant="ghost" 
                size="xl" 
                className="text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Play size={18} className="mr-2" />
                {content.cta_secondary || "Watch Overview"}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-16 pt-8 border-t border-white/10 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/50 text-sm mb-4">{content.trust_label || "Trusted by leading organizations"}</p>
            <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm font-medium">
              <span className="hover:text-white transition-colors">IQVIA</span>
              <span className="hover:text-white transition-colors">Parexel</span>
              <span className="hover:text-white transition-colors">ICON</span>
              <span className="hover:text-white transition-colors">PPD</span>
              <span className="hover:text-white transition-colors">Medpace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;