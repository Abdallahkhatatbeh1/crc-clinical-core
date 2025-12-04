import { 
  Stethoscope, 
  TestTube2, 
  Pill, 
  Monitor, 
  Users2 
} from "lucide-react";
import BrandTag from "./BrandTag";

const facilities = [
  {
    icon: Stethoscope,
    name: "Patient procedure & examination rooms"
  },
  {
    icon: TestTube2,
    name: "Laboratory sample-processing areas"
  },
  {
    icon: Pill,
    name: "IP & pharmacy storage"
  },
  {
    icon: Monitor,
    name: "Workspace for CRO monitoring teams"
  },
  {
    icon: Users2,
    name: "Meeting and coordination areas supporting sponsor-site communication"
  }
];

const ResearchEnvironmentSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BrandTag variant="green" className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Our Facilities
          </BrandTag>
          <h2
            className="text-foreground max-w-2xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Our Research Environment
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={facility.name}
                className="flex items-center gap-4 bg-card border border-accent/20 rounded-xl p-6 hover:shadow-elegant hover:border-accent/40 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <facility.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-foreground font-medium">
                  {facility.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchEnvironmentSection;
