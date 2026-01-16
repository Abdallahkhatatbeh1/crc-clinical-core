import { TrendingUp, Users, Globe, Award, Calendar, LucideIcon } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import BrandTag from "@/components/BrandTag";
import { useSiteContent } from "@/hooks/useSiteContent";

const statIcons: LucideIcon[] = [Users, TrendingUp, Globe, Award];

const OfferVideoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("whyus", "video");

  const stats = [
    { icon: statIcons[0], value: content.stat1_value || "500+", label: content.stat1_label || "Patients Enrolled" },
    { icon: statIcons[1], value: content.stat2_value || "95%", label: content.stat2_label || "Retention Rate" },
    { icon: statIcons[2], value: content.stat3_value || "15+", label: content.stat3_label || "Countries Served" },
    { icon: statIcons[3], value: content.stat4_value || "100%", label: content.stat4_label || "On-Time Delivery" }
  ];

  const calendlyUrl = content.calendly_url || "https://calendly.com/sh-crc2021/30min";

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">{content.tag || "Top Recruiters Around The World"}</BrandTag>
            </div>
            
            <h2 className={`text-foreground mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {content.title || "Guaranteed"} <span className="text-accent">{content.title_highlight || "High Recruitment"}</span>
            </h2>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* YouTube Video Embed */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border">
              <iframe
                src={content.video_url || "https://www.youtube.com/embed/Yu9R_hJ9QZk?rel=0&modestbranding=1"}
                title="CRC Clinical Research Center"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className={`text-center mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              {content.button_text || "Book a Meeting"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferVideoSection;
