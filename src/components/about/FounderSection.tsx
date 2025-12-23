import { Award, Briefcase, Shield, Target } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";

const highlightIcons = [Briefcase, Award, Shield, Target];

const FounderSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { content } = useSiteContent("about", "founder");

  const highlights = [
    { icon: highlightIcons[0], text: content.highlight1 || "15+ years collaborating with CROs and sponsors" },
    { icon: highlightIcons[1], text: content.highlight2 || "40+ Phase I–IV studies overseen" },
    { icon: highlightIcons[2], text: content.highlight3 || "Protocol governance & patient safety expertise" },
    { icon: highlightIcons[3], text: content.highlight4 || "Advanced clinical trial management oversight" }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag className="mb-6">{content.tag || "Leadership"}</BrandTag>
            </div>
            <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {content.title || "Founder & CEO –"} <span className="text-primary">{content.title_highlight || "Dr. Sabiha Malkawi"}</span>
            </h2>
          </div>

          {/* Content Card */}
          <div 
            className={`bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {content.paragraph1 || "Dr. Malkawi has over 15 years of experience collaborating with contract research organizations, global CROs, and major industry sponsors."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {content.paragraph2 || "She has overseen more than 40 Phase I–IV studies, including early development and drug development-supporting trials."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {content.paragraph3 || "Her expertise spans protocol governance, patient safety, endpoint measurement, and advanced clinical trial management oversight."}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
              {highlights.map((item, index) => (
                <div 
                  key={item.text}
                  className={`flex flex-col items-center text-center p-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
