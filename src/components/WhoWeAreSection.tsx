import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MapPin, Award, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhoWeAreSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const highlights = [
    { icon: MapPin, text: "Irbid, Jordan" },
    { icon: Award, text: "ICH-GCP Compliant" },
    { icon: FileCheck, text: "Full Trial Support" }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-crc-light-bg-alt relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag className="mb-6">Who We Are</BrandTag>
            </div>
            <h2 
              className={`text-foreground mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              A Specialized Clinical Study Site
            </h2>
          </div>

          {/* Highlight Badges */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {highlights.map((item, index) => (
              <div 
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border"
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              className={`bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                CRC is a specialized clinical study site located in <span className="text-primary font-semibold">Irbid, Jordan</span>, providing end-to-end support for clinical trials across all phases and diverse therapeutic areas.
              </p>
            </div>

            <div 
              className={`bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-all duration-500 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our principal investigators, sub-investigators, and clinical research coordinators work closely with CROs and sponsors to ensure <span className="text-accent font-semibold">methodological rigor</span>, accurate endpoint evaluation, and ethically sound execution.
              </p>
            </div>

            <div 
              className={`bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-all duration-500 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                As a scientifically driven investigator site, CRC integrates <span className="text-primary font-semibold">validated workflows</span>, controlled documentation environments, calibrated medical systems, and modern clinical trial management systems.
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <div 
            className={`text-center transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
