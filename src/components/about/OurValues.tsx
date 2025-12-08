import { Shield, Award, Zap, Heart, Handshake } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Adherence to ICH-GCP, local regulatory structures, and internationally harmonized clinical trials frameworks.",
    color: "primary"
  },
  {
    icon: Award,
    title: "Quality",
    description: "Accurate data generation supported by audit-ready documentation, controlled workflows, and scientific discipline across all clinical trials phases.",
    color: "accent"
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Streamlined trial management, strong patient recruitment, and operational excellence across all study visits.",
    color: "primary"
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "A commitment to scientifically grounded monitoring of safety signals, adverse events, and clinical outcomes.",
    color: "accent"
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Collaborative engagement with CRO partners, investigators, and global scientific institutions.",
    color: "primary"
  }
];

const OurValues = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">Our Foundation</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our Core <span className="text-accent">Values</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The principles that guide everything we do
          </p>
        </div>

        {/* Values Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-500 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                value.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <value.icon className={`w-7 h-7 ${value.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
