import { 
  FlaskConical, 
  Users, 
  Building2, 
  Globe,
  CheckCircle2
} from "lucide-react";
import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";

const iconMap: { [key: number]: React.ElementType } = {
  0: FlaskConical,
  1: Users,
  2: Building2,
  3: Globe
};

const WhyTrustSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("home", "why_trust");

  const trustReasons = [
    {
      icon: iconMap[0],
      title: content.card1_title || "Proven Expertise",
      subtitle: content.card1_subtitle || "in Clinical Trials",
      points: (content.card1_points || "Extensive experience supporting worldwide clinical trials and multi-regional protocols.|Full alignment with ICH-GCP, clinicaltrials.gov requirements, and international regulatory standards.").split('|'),
      color: "primary"
    },
    {
      icon: iconMap[1],
      title: content.card2_title || "Fast & Reliable",
      subtitle: content.card2_subtitle || "Patient Recruitment",
      points: (content.card2_points || "Structured patient recruitment clinical trials algorithms.|Large, diverse, treatment-naïve patient populations across Jordan.|High show-up and retention rates aligned with best-practice trial management metrics.").split('|'),
      color: "primary"
    },
    {
      icon: iconMap[2],
      title: content.card3_title || "Robust Operational",
      subtitle: content.card3_subtitle || "Infrastructure",
      points: (content.card3_points || "Dedicated facilities equipped for protocol-driven research.|On-site laboratories, calibrated equipment, medical device CRO capability, and IP storage.|CRO-dedicated monitoring rooms to support oversight and contract research and development activities.").split('|'),
      color: "accent"
    },
    {
      icon: iconMap[3],
      title: content.card4_title || "Strategic Middle East",
      subtitle: content.card4_subtitle || "Location",
      points: (content.card4_points || "Cost-efficient regional access point for global late phase CRO programs.|Faster approval timelines compared to many regions.|High feasibility for emerging indications, including the latest clinical trials on COVID-19.").split('|'),
      color: "primary"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">{content.tag || "Our Expertise"}</BrandTag>
          </div>
          <h2 
            className={`text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Why Global CROs"} <span className="text-accent">{content.title_highlight || "Trust"}</span> {content.title_suffix || "CRC"}
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.subtitle || "Delivering excellence at every stage of clinical research"}
          </p>
        </div>

        {/* Cards Grid - Centered layout for 5 items */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {trustReasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group bg-white rounded-3xl p-8 border border-border hover:border-${reason.color}/30 hover:shadow-xl transition-all duration-500 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-[380px] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon & Title - Centered */}
              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  reason.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  <reason.icon className={`w-7 h-7 ${reason.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{reason.title}</h3>
                <p className={`text-sm font-medium ${reason.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                  {reason.subtitle}
                </p>
              </div>

              {/* Points - Centered */}
              <ul className="space-y-3">
                {reason.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-muted-foreground text-sm leading-relaxed group-hover/item:text-foreground transition-colors">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
