import { 
  Stethoscope, 
  TestTube2, 
  Pill, 
  Monitor, 
  Users2,
  CheckCircle2
} from "lucide-react";
import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const facilities = [
  {
    icon: Stethoscope,
    name: "Patient Procedure Rooms",
    description: "Fully equipped examination areas"
  },
  {
    icon: TestTube2,
    name: "Laboratory Processing",
    description: "On-site sample handling"
  },
  {
    icon: Pill,
    name: "IP & Pharmacy Storage",
    description: "Secure investigational products"
  },
  {
    icon: Monitor,
    name: "CRO Monitoring Workspace",
    description: "Dedicated oversight areas"
  },
  {
    icon: Users2,
    name: "Coordination Areas",
    description: "Sponsor-site communication hub"
  }
];

const ResearchEnvironmentSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-32 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">Quality Facilities</BrandTag>
          </div>
          <h2 
            className={`text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Research Environment
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            State-of-the-art facilities designed for clinical excellence
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={facility.name}
                className={`group bg-white rounded-2xl p-6 border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <facility.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1">{facility.name}</h4>
                    <p className="text-sm text-muted-foreground">{facility.description}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchEnvironmentSection;
