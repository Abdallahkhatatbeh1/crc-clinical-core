import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const VideoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="blue" className="mb-6">Watch Our Story</BrandTag>
            </div>
            <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Discover <span className="text-primary">CRC</span> in Action
            </h2>
            <p className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              See how we deliver excellence in clinical research
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border">
              <iframe
                src="https://www.youtube.com/embed/Yu9R_hJ9QZk?rel=0&modestbranding=1"
                title="CRC Clinical Research Center"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Schedule Meeting Button */}
          <div className={`text-center mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="https://calendly.com/sh-crc2021/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Meeting
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Capabilities Text */}
          <div className={`mt-16 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-crc-light-bg rounded-3xl p-8 lg:p-12 border border-border">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our capabilities enable us to support both <span className="text-primary font-semibold">early-phase development</span> and <span className="text-accent font-semibold">large-scale, late-phase clinical programs</span> requiring strict procedural compliance, comprehensive risk management, and high-fidelity data capture.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                CRC is strategically positioned to serve as a <span className="text-primary font-semibold">leading clinical research site</span> for organizations seeking reliable research partners in Jordan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;