import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MapPin, Award, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const WhoWeAreSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { content } = useSiteContent("home", "who_we_are");

  const highlights = [
    { icon: MapPin, text: content.highlight1 || "Irbid, Jordan" },
    { icon: Award, text: content.highlight2 || "ICH-GCP Compliant" },
    { icon: FileCheck, text: content.highlight3 || "Full Trial Support" }
  ];

  // Helper function to parse text with <highlight> tags
  const parseHighlightedText = (text: string, highlightClass: string) => {
    if (!text) return null;
    const parts = text.split(/<highlight>|<\/highlight>/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className={highlightClass}>{part}</span>;
      }
      return part;
    });
  };

  const card1Text = content.card1_text || "CRC is a specialized clinical study site located in <highlight>Irbid, Jordan</highlight>, providing end-to-end support for clinical trials phases across diverse therapeutic areas.";
  const card2Text = content.card2_text || "Our investigators, sub-investigators, and clinical research coordinators work closely with Contract Research Organizations (CROs) and sponsors to ensure <highlight>methodological rigor</highlight>, accurate endpoint evaluation, and ethically sound execution.";
  const card3Text = content.card3_text || "As a scientifically driven investigator site, CRC integrates <highlight>validated workflows</highlight>, controlled documentation environments, and calibrated medical systems including a modern clinical trial management system.";

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-crc-light-bg-alt relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag className="mb-6">{content.tag || "Who We Are"}</BrandTag>
            </div>
            <h2 
              className={`text-foreground mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {content.title || "A Specialized Clinical Study Site"}
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
                {parseHighlightedText(card1Text, "text-primary font-semibold")}
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
                {parseHighlightedText(card2Text, "text-accent font-semibold")}
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
                {parseHighlightedText(card3Text, "text-primary font-semibold")}
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
                {content.button_text || "Learn More"}
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
