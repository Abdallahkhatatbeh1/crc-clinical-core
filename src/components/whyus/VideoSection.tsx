import { Play, PlayCircle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const VideoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
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

          {/* Video Placeholder */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-border shadow-xl group cursor-pointer">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Video Coming Soon</span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent" />
              <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Schedule Meeting Button */}
          <div className={`text-center mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/contact">
              <Button size="lg" className="group">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Meeting
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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