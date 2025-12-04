import { 
  FlaskConical, 
  Users, 
  Building2, 
  Award, 
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const trustReasons = [
  {
    icon: FlaskConical,
    title: "Proven Expertise",
    subtitle: "Clinical Trials",
    points: [
      "Worldwide clinical trials and multi-regional protocols",
      "ICH-GCP, clinicaltrials.gov alignment"
    ],
    color: "primary"
  },
  {
    icon: Users,
    title: "Fast & Reliable",
    subtitle: "Patient Recruitment",
    points: [
      "Structured recruitment algorithms",
      "Large, diverse patient populations",
      "High retention rates"
    ],
    color: "primary"
  },
  {
    icon: Building2,
    title: "Robust Infrastructure",
    subtitle: "Operational Excellence",
    points: [
      "Protocol-driven research facilities",
      "On-site laboratories & IP storage",
      "CRO-dedicated monitoring rooms"
    ],
    color: "accent"
  },
  {
    icon: Award,
    title: "Expert Leadership",
    subtitle: "Research Teams",
    points: [
      "Extensive CRO drug development experience",
      "Strong scientific governance"
    ],
    color: "accent"
  },
  {
    icon: Globe,
    title: "Strategic Location",
    subtitle: "Middle East Hub",
    points: [
      "Cost-efficient regional access",
      "Faster approval timelines",
      "High feasibility for emerging indications"
    ],
    color: "primary"
  }
];

const WhyTrustSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-32 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">Our Expertise</BrandTag>
          </div>
          <h2 
            className={`text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Why Global CROs <span className="text-accent">Trust</span> CRC
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Delivering excellence at every stage of clinical research
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustReasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group bg-white rounded-3xl p-8 border border-border hover:border-${reason.color}/30 hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  reason.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  <reason.icon className={`w-7 h-7 ${reason.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{reason.title}</h3>
                  <p className={`text-sm font-medium ${reason.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                    {reason.subtitle}
                  </p>
                </div>
              </div>

              {/* Points */}
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

              {/* Hover Arrow */}
              <div className="mt-6 pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
