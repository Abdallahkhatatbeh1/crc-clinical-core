import { 
  FlaskConical, 
  Users, 
  Building2, 
  Award, 
  Globe,
  CheckCircle2
} from "lucide-react";
import BrandTag from "./BrandTag";

const trustReasons = [
  {
    icon: FlaskConical,
    title: "Proven Expertise in Clinical Trials",
    points: [
      "Extensive experience supporting worldwide clinical trials and multi-regional protocols.",
      "Full alignment with ICH-GCP, clinicaltrials.gov requirements, and international regulatory standards."
    ],
    isExcellence: false
  },
  {
    icon: Users,
    title: "Fast & Reliable Patient Recruitment",
    points: [
      "Structured patient recruitment clinical trials algorithms.",
      "Large, diverse, treatment-naïve patient populations across Jordan.",
      "High show-up and retention rates aligned with best-practice trial management metrics."
    ],
    isExcellence: false
  },
  {
    icon: Building2,
    title: "Robust Operational Infrastructure",
    points: [
      "Dedicated facilities equipped for protocol-driven research.",
      "On-site laboratories, calibrated equipment, medical device CRO capability, and IP storage.",
      "CRO-dedicated monitoring rooms to support oversight and contract research and development activities."
    ],
    isExcellence: true
  },
  {
    icon: Award,
    title: "Experienced Leadership & Research Teams",
    points: [
      "Expert investigators with extensive experience in CRO drug development pathways.",
      "Strong operational oversight, scientific governance, and quality systems."
    ],
    isExcellence: true
  },
  {
    icon: Globe,
    title: "Strategic Middle East Location",
    points: [
      "Cost-efficient regional access point for global late phase CRO programs.",
      "Faster approval timelines compared to many regions.",
      "High feasibility for emerging indications, including the latest clinical trials on COVID-19."
    ],
    isExcellence: false
  }
];

const WhyTrustSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <BrandTag variant="green" className="mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Our Expertise
          </BrandTag>
          <h2
            className="text-foreground max-w-3xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Why Global CROs <span className="text-accent">Trust</span> CRC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustReasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group bg-card border rounded-2xl p-8 hover:shadow-elegant transition-all duration-300 animate-fade-in-up opacity-0 ${
                reason.isExcellence ? 'border-accent/30' : 'border-border'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                reason.isExcellence ? 'bg-accent/15' : 'bg-secondary'
              }`}>
                <reason.icon className={`w-7 h-7 ${reason.isExcellence ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {reason.title}
              </h3>
              <ul className="space-y-3">
                {reason.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
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
