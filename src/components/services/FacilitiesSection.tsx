import { 
  Building2, Activity, AlertTriangle, 
  Archive, Lock, Monitor
} from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";

const facilityIcons = [Building2, Activity, AlertTriangle, Archive, Lock, Monitor];

const FacilitiesSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { content } = useSiteContent("services", "facilities_section");

  const facilities = [
    { icon: facilityIcons[0], name: content.facility1_name || "Dedicated study rooms", desc: content.facility1_desc || "For screening, randomization, and follow-ups" },
    { icon: facilityIcons[1], name: content.facility2_name || "ECG, ultrasound, spirometry", desc: content.facility2_desc || "And vital-sign monitoring equipment" },
    { icon: facilityIcons[2], name: content.facility3_name || "Emergency equipment", desc: content.facility3_desc || "Including crash carts and oxygen" },
    { icon: facilityIcons[3], name: content.facility4_name || "Secure archival storage", desc: content.facility4_desc || "For long-term retention of essential documents" },
    { icon: facilityIcons[4], name: content.facility5_name || "Private, access-controlled rooms", desc: content.facility5_desc || "For CRA monitoring visits" },
    { icon: facilityIcons[5], name: content.facility6_name || "Robust data security systems", desc: content.facility6_desc || "For compliance with GCP and privacy standards" }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">{content.tag || "Infrastructure"}</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.title || "Clinical Trial"} <span className="text-primary">{content.title_highlight || "Facilities"}</span> {content.title_suffix || "& Equipment"}
          </h2>
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.description || "CRC provides clinical-grade infrastructure suitable for multi-phase and complex clinical studies."}
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
