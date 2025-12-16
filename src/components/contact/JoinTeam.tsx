import { Users, Stethoscope, FlaskConical, Database, ClipboardList, Pill, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const positions = [
  { icon: Stethoscope, title: "Investigators", desc: "Principal & Sub-Investigators" },
  { icon: FlaskConical, title: "Scientists", desc: "Research Scientists" },
  { icon: Pill, title: "Pharmacists", desc: "Clinical Pharmacists" },
  { icon: ClipboardList, title: "Coordinators", desc: "Clinical Research Coordinators" },
  { icon: Database, title: "Data Specialists", desc: "Data Management Experts" },
  { icon: Users, title: "Clinical Staff", desc: "Research Nurses & Specialists" }
];

const JoinTeam = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 gradient-brand relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">Careers</BrandTag>
            </div>
            <h2 className={`text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Join Our <span className="text-accent">Team</span>
            </h2>
            <p className={`text-white/80 text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              We welcome skilled professionals interested in becoming part of a scientifically advanced clinical operations team, including investigators, scientists, pharmacists, clinical research coordinators, and specialists in data management and clinical trials methodology.
            </p>
          </div>

          {/* Positions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {positions.map((position, index) => (
              <div
                key={position.title}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                  <position.icon className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold text-white mb-1">{position.title}</h4>
                <p className="text-sm text-white/60">{position.desc}</p>
              </div>
            ))}
          </div>

          {/* Our Rules Button */}
          <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="/files/crc-rules.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              Our Rules
            </a>
            <p className="text-white/50 text-sm mt-4">Download our guidelines and policies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
