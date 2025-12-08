import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center gradient-brand overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      {/* Content */}
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">GCP-Compliant Research Center</span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Clinical Research Excellence
            <span className="block mt-2">
              <span className="text-white/90">|</span> <span className="text-accent">Trusted Phase I–IV Trial Site</span>
            </span>
          </h1>

          {/* Sub-Headline */}
          <p 
            className={`text-base md:text-lg text-white/85 mb-10 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            CRC is a GCP-compliant clinical research center delivering reliable, high-quality Phase I, Phase II, Phase III, and Phase IV studies in Jordan and the Middle East. We collaborate with global CROs, pharmaceutical CROs, and scientific sponsors to ensure precise clinical trial management, optimized clinical operations, and accelerated patient recruitment supported by experienced investigators and research professionals.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/why-us">
              <Button variant="hero" size="xl" className="group">
                Work With Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-12 pt-6 border-t border-white/10 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/50 text-sm mb-3">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm font-medium">
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
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
