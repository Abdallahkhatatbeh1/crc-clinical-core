import { useEffect, useState } from "react";
import { MapPin, Award, FlaskConical } from "lucide-react";
import BrandTag from "@/components/BrandTag";

const AboutHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-32 pb-24 gradient-brand overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Irbid, Jordan</span>
          </div>

          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            About <span className="text-accent">CRC</span>
          </h1>

          <p 
            className={`text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            The Clinical Research Center (CRC) is a <span className="text-accent font-semibold">GCP-compliant</span>, academically oriented clinical research site based in Irbid, Jordan.
          </p>

          <p 
            className={`text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            We deliver scientifically rigorous Phase I, Phase II, Phase III, and Phase IV clinical trials, supported by validated screening processes, robust clinical operations, and precise clinical trial management.
          </p>

          {/* Stats */}
          <div 
            className={`grid grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">40+</div>
              <div className="text-sm text-white/60">Clinical Trials</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">I-IV</div>
              <div className="text-sm text-white/60">All Phases</div>
            </div>
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

export default AboutHero;
