import { FlaskConical, Shield, Users } from "lucide-react";
import BrandTag from "./BrandTag";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: FlaskConical,
    title: "Advanced Research Facilities",
    description:
      "State-of-the-art laboratories and clinical spaces equipped with cutting-edge technology to support complex research protocols.",
    variant: "primary" as const,
  },
  {
    icon: Shield,
    title: "Quality & Compliance",
    description:
      "Strict adherence to FDA regulations, ICH-GCP guidelines, and institutional review board requirements ensuring the highest standards.",
    variant: "accent" as const,
  },
  {
    icon: Users,
    title: "Expert Clinical Teams",
    description:
      "Dedicated professionals including principal investigators, study coordinators, and data managers with decades of combined experience.",
    variant: "primary" as const,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BrandTag className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Our Strengths
          </BrandTag>
          <h2
            className="text-foreground max-w-2xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Why Leading Organizations Partner With CRC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant={feature.variant}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
