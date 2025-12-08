import { useEffect, useState } from "react";
import { FlaskConical, CheckCircle2, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const phases = [
  { phase: "Phase I", desc: "Safety & Dosage" },
  { phase: "Phase II", desc: "Efficacy Testing" },
  { phase: "Phase III", desc: "Large-Scale Trials" },
  { phase: "Phase IV", desc: "Post-Market Studies" }
];

const StudiesHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { content } = useSiteContent("studies", "hero");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-brand overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* DNA Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">{content.badge || "Clinical Research Excellence"}</span>
          </div>

          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Our"} <span className="text-accent">{content.title_highlight || "Studies"}</span> {content.title_suffix || "& Research"}
          </h1>

          <div className={`space-y-4 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
              {content.subtitle || "CRC conducts a wide spectrum of scientifically rigorous clinical trials, including Phase I clinical trials, Phase II clinical trials, Phase III, and Phase IV programs."}
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Our treatment-naïve populations support studies across numerous therapeutic areas, including depression clinical trials, metabolic disorders, and infectious diseases such as the latest clinical trials on COVID-19.
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              We maintain strong alignment with ICH-GCP and clinicaltrials.gov transparency standards.
            </p>
          </div>

          {/* Phase Cards */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {phases.map((item, index) => (
              <div 
                key={item.phase}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.phase}</div>
                <div className="text-xs text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mt-10 transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm text-white/90">ICH-GCP Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <Globe className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">ClinicalTrials.gov Registered</span>
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

export default StudiesHero;