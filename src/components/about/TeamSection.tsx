import { 
  Stethoscope, 
  ClipboardList, 
  HeartPulse, 
  Pill, 
  Scale, 
  Database,
  Users
} from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const teamMembers = [
  { icon: Stethoscope, title: "Principal & Sub-Investigators", color: "primary" },
  { icon: ClipboardList, title: "Clinical Research Coordinators", color: "accent" },
  { icon: HeartPulse, title: "Research Nurses", color: "primary" },
  { icon: Pill, title: "Pharmacists & IP Specialists", color: "accent" },
  { icon: Scale, title: "Regulatory & Ethics Experts", color: "primary" },
  { icon: Database, title: "Data & Quality Managers", color: "accent" }
];

const TeamSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 bg-crc-light-bg-alt relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">Our People</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our <span className="text-primary">Multidisciplinary</span> Team
          </h2>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Supporting protocol compliance, data validity, and the scientific rigor required for worldwide clinical trials
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.title}
              className={`group bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:border-${member.color}/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                member.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <member.icon className={`w-6 h-6 ${member.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h4 className="font-semibold text-foreground text-sm md:text-base leading-tight">{member.title}</h4>
            </div>
          ))}
        </div>

        {/* Team Summary */}
        <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-border">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">
              This team supports <span className="text-primary font-semibold">protocol compliance</span>, <span className="text-accent font-semibold">data validity</span>, and investigator site excellence.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
