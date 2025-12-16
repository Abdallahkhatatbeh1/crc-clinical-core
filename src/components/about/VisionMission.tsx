import { Eye, Target } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";

const VisionMission = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { content } = useSiteContent("about", "mission");

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision */}
          <div 
            className={`group bg-crc-light-bg rounded-3xl p-8 md:p-10 border border-border hover:shadow-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <BrandTag className="mb-4">{content.vision_tag || "Our Vision"}</BrandTag>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {content.vision_text || "To be the most scientifically trusted and operationally reliable clinical study site in Jordan and the Middle East, serving as a preferred collaborator for Contract Research Organizations and global sponsors."}
            </p>
          </div>

          {/* Mission */}
          <div 
            className={`group bg-crc-light-bg-alt rounded-3xl p-8 md:p-10 border border-border hover:shadow-xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <BrandTag variant="green" className="mb-4">{content.mission_tag || "Our Mission"}</BrandTag>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {content.mission_text || "To conduct ethically governed, protocol-driven, and scientifically validated research that accelerates drug development, ensures patient safety, and supports both early-stage and global late phase CRO studies."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;