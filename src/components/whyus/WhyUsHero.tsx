import { useEffect, useState } from "react";
import { Shield, Award, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const WhyUsHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { content } = useSiteContent("whyus", "hero");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-brand overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">{content.badge || "Our Excellence"}</span>
          </div>

          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Why Choose"} <span className="text-accent">{content.title_highlight || "CRC"}</span>
          </h1>

          <div className={`space-y-6 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
              {content.subtitle || "The Clinical Research Center (CRC) provides a scientifically rigorous environment for high-quality clinical trials in Jordan and the Middle East."}
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Our site is built upon internationally recognized research standards, precise operational workflows, controlled documentation systems, and an unwavering commitment to methodological accuracy.
            </p>
          </div>

          {/* Trust Badges */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-white/90">ICH-GCP Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm text-white/90">Scientific Excellence</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-white/90">Global Standards</span>
            </div>
          </div>

          {/* Center Location */}
          <div 
            className={`text-center transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Clinical Research Center – Amman, Jordan
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default WhyUsHero;