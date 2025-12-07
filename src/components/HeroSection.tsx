import { ArrowRight, Microscope, Heart, Pill, Activity, Stethoscope, Dna } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Floating medical icons configuration
  const floatingIcons = [
    { Icon: Microscope, top: "15%", left: "8%", delay: "0s", size: 24 },
    { Icon: Heart, top: "25%", right: "12%", delay: "0.5s", size: 20 },
    { Icon: Pill, bottom: "30%", left: "15%", delay: "1s", size: 18 },
    { Icon: Activity, top: "60%", right: "8%", delay: "1.5s", size: 22 },
    { Icon: Stethoscope, top: "40%", left: "5%", delay: "2s", size: 20 },
    { Icon: Dna, bottom: "25%", right: "15%", delay: "2.5s", size: 24 },
  ];

  return (
    <section className="relative min-h-[75vh] flex items-center gradient-brand overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating medical icons */}
        {floatingIcons.map(({ Icon, delay, size, ...position }, index) => (
          <div
            key={index}
            className="absolute text-white/10 animate-float hidden md:block"
            style={{
              ...position,
              animationDelay: delay,
              animationDuration: "6s"
            }}
          >
            <Icon size={size} />
          </div>
        ))}
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
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-10 leading-tight transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Clinical Research Excellence
            <span className="block mt-2">
              <span className="text-white/90">|</span> <span className="text-accent">Trusted Phase I–IV Trial Site</span>
            </span>
          </h1>

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
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {["IQVIA", "Parexel", "ICON", "PPD", "Medpace"].map((name, i) => (
                <span 
                  key={name}
                  className="text-white/60 text-sm font-medium hover:text-white transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-white/5"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {name}
                </span>
              ))}
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
