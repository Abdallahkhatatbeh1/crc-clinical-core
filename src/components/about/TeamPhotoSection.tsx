import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import teamPhoto from "@/assets/facilities/team-photo.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSectionImages } from "@/hooks/useSectionImages";

const TeamPhotoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("about", "team_photo");
  const { getImageUrl } = useSectionImages("about", "team_photo");

  const stats = [
    { value: content.stat1_value || "15+", label: content.stat1_label || "Team Members" },
    { value: content.stat2_value || "50+", label: content.stat2_label || "Active Studies" },
    { value: content.stat3_value || "10+", label: content.stat3_label || "Years Experience" },
    { value: content.stat4_value || "100%", label: content.stat4_label || "Dedication" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl" />
              <img
                src={getImageUrl("main_team_image", teamPhoto) || getImageUrl("team_image", teamPhoto)}
                alt="CRC Team"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div>
              <BrandTag className="mb-4">{content.tag || "Our Team"}</BrandTag>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {content.photo_title || "Together We Excel"}
              </h2>
              <p className="text-muted-foreground text-lg">
                {content.photo_description || "Our dedicated team brings together diverse expertise in clinical research, regulatory affairs, and patient care to deliver exceptional results."}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPhotoSection;
