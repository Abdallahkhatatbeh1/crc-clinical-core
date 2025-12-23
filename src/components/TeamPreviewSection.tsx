import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/facilities/team-photo.jpg";
import directorOffice from "@/assets/facilities/director-office.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSectionImages } from "@/hooks/useSectionImages";

const TeamPreviewSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("home", "team_preview");
  const { getImageUrl } = useSectionImages("home", "team_preview");

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <BrandTag className="mb-4">{content.tag || "Our Team"}</BrandTag>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content.title || "Meet Our"} <span className="text-primary">{content.title_highlight || "Expert Team"}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {content.description || "Our dedicated team of clinical research professionals brings together decades of combined experience in conducting high-quality clinical trials."}
            </p>
            <Button asChild size="lg" className="group">
              <Link to="/about">
                {content.button_text || "Meet Our Team"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Images */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <img
                src={getImageUrl("team_photo_image", teamPhoto)}
                alt="CRC Team"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 w-48 md:w-56 rounded-xl shadow-xl overflow-hidden border-4 border-background">
                <img
                  src={getImageUrl("director_office_image", directorOffice)}
                  alt="Director Office"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
