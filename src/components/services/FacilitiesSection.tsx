import { 
  Building2, Activity, AlertTriangle, 
  Archive, Lock, Monitor
} from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const facilities = [
  { icon: Building2, name: "Dedicated study rooms", desc: "For screening, randomization, and follow-ups" },
  { icon: Activity, name: "ECG, ultrasound, spirometry", desc: "And vital-sign monitoring equipment" },
  { icon: AlertTriangle, name: "Emergency equipment", desc: "Including crash carts and oxygen" },
  { icon: Archive, name: "Secure archival storage", desc: "For long-term retention of essential documents" },
  { icon: Lock, name: "Private, access-controlled rooms", desc: "For CRA monitoring visits" },
  { icon: Monitor, name: "Robust data security systems", desc: "For compliance with GCP and privacy standards" }
];

const FacilitiesSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">Infrastructure</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Clinical Trial <span className="text-primary">Facilities</span> & Equipment
          </h2>
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            CRC provides clinical-grade infrastructure suitable for multi-phase and complex clinical studies.
          </p>
        </div>

        {/* Facilities Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {facilities.map((facility, index) => (
            <div
              key={facility.name}
              className={`group bg-white rounded-2xl p-5 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-500 w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${300 + index * 75}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <facility.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{facility.name}</h4>
              <p className="text-xs text-muted-foreground">{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
