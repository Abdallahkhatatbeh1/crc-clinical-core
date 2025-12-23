import { 
  Shield, Settings, Target, Users, 
  ClipboardCheck, Database, LucideIcon 
} from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";
import { useSiteContent } from "@/hooks/useSiteContent";

const featureIcons: LucideIcon[] = [Shield, Settings, Target, Users, ClipboardCheck, Database];

const WhyUsFeatures = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("whyus", "features");

  const features = [
    {
      icon: featureIcons[0],
      title: content.feature1_title || "GCP-Compliant Scientific Governance",
      description: content.feature1_description || "Complete adherence to ICH-GCP guidelines ensuring ethical and scientific integrity in every study.",
      color: "primary"
    },
    {
      icon: featureIcons[1],
      title: content.feature2_title || "Robust Clinical Trial Management",
      description: content.feature2_description || "Advanced CTMS integration for seamless protocol execution and real-time study oversight.",
      color: "accent"
    },
    {
      icon: featureIcons[2],
      title: content.feature3_title || "Accurate Endpoint Assessment",
      description: content.feature3_description || "Precise measurement processes ensuring reliable efficacy and safety data collection.",
      color: "primary"
    },
    {
      icon: featureIcons[3],
      title: content.feature4_title || "Highly Trained Teams",
      description: content.feature4_description || "Expert investigators and clinical operations professionals with extensive trial experience.",
      color: "accent"
    },
    {
      icon: featureIcons[4],
      title: content.feature5_title || "Validated Recruitment Frameworks",
      description: content.feature5_description || "Proven patient recruitment strategies with access to treatment-naïve populations.",
      color: "primary"
    },
    {
      icon: featureIcons[5],
      title: content.feature6_title || "Data Integrity & IP Control",
      description: content.feature6_description || "Reliable infrastructure for monitoring, IP management, and audit-ready documentation.",
      color: "accent"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">{content.tag || "What Sets Us Apart"}</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.title || "CRC"} <span className="text-primary">{content.title_highlight || "Combines"}</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.description || "As an investigator site partnering with global CROs and pharmaceutical sponsors, CRC ensures scientific rigor, operational precision, and complete adherence to ICH-GCP and international regulatory expectations."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group bg-white rounded-2xl p-8 border border-border hover:shadow-xl hover:border-${feature.color}/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${
                  feature.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  <IconComponent className={`w-7 h-7 ${feature.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className={`mt-16 text-center max-w-4xl mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground leading-relaxed">
            {content.bottom_text || "Our capabilities enable us to support both early-phase development and large-scale, late-phase clinical programs requiring strict procedural compliance, comprehensive risk management, and high-fidelity data capture. CRC is strategically positioned to serve as a leading clinical research site for organizations seeking reliable research partners in Jordan."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUsFeatures;