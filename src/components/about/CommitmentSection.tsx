import { 
  CheckCircle2, 
  ArrowRight,
  Shield,
  MessageSquare,
  FileCheck,
  GraduationCap,
  Clock,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const commitments = [
  { icon: Shield, text: "Strict adherence to ICH-GCP guidelines" },
  { icon: MessageSquare, text: "Transparent communication with sponsors" },
  { icon: FileCheck, text: "High-quality documentation and audit readiness" },
  { icon: GraduationCap, text: "Continuous staff training and competency development" },
  { icon: Clock, text: "Efficient operational processes for timely milestone delivery" },
  { icon: Users, text: "Robust patient recruitment driven by strong community networks" }
];

const CommitmentSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 gradient-brand relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">Excellence</BrandTag>
            </div>
            <h2 className={`text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Commitment to <span className="text-accent">Excellence</span>
            </h2>
            <p className={`text-white/80 text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              CRC integrates international scientific standards, rigorous feasibility assessment, calibrated equipment, and community-network-driven patient recruitment clinical trials to deliver ethical, high-quality research across the region.
            </p>
          </div>

          {/* Commitments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {commitments.map((item, index) => (
              <div
                key={item.text}
                className={`flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-white/90 text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/70 mb-6">
              CRC strives to be a trusted, dependable, and high-performing research partner for global organizations seeking clinical trial sites in Jordan and the Middle East.
            </p>
            <Link to="/why-us">
              <Button variant="hero" size="xl" className="group">
                Partner With Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
