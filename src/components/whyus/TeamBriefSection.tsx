import { Users, Stethoscope, ClipboardList, Award } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const teamHighlights = [
  { icon: Stethoscope, title: "Principal Investigators", description: "Experienced medical professionals" },
  { icon: ClipboardList, title: "Research Coordinators", description: "Protocol compliance experts" },
  { icon: Users, title: "Clinical Staff", description: "Dedicated patient care team" },
  { icon: Award, title: "Quality Managers", description: "Data integrity specialists" }
];

const TeamBriefSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">Our People</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Expert <span className="text-primary">Team</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A multidisciplinary team dedicated to clinical research excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {teamHighlights.map((item, index) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamBriefSection;