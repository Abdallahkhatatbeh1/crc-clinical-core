import { TrendingUp, Users, Globe, Award, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const OfferVideoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* YouTube Video Embed - First at top */}
          <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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

          {/* Header */}
          <div className="text-center mb-8">
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">Top Recruiters Around The World</BrandTag>
            </div>
            
            <h2 className={`text-foreground mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Guaranteed <span className="text-accent">High Recruitment</span>
            </h2>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Users, value: "500+", label: "Patients Enrolled" },
              { icon: TrendingUp, value: "95%", label: "Retention Rate" },
              { icon: Globe, value: "15+", label: "Countries Served" },
              { icon: Award, value: "100%", label: "On-Time Delivery" }
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Capabilities Text */}
          <div className={`mb-12 max-w-4xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-border">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our capabilities enable us to support both <span className="text-primary font-semibold">early-phase development</span> and <span className="text-accent font-semibold">large-scale, late-phase clinical programs</span> requiring strict procedural compliance, comprehensive risk management, and high-fidelity data capture.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                CRC is strategically positioned to serve as a <span className="text-primary font-semibold">leading clinical research site</span> for organizations seeking reliable research partners in Jordan.
              </p>
            </div>
          </div>

          {/* Schedule Meeting Button - Calendly */}
          <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="https://calendly.com/sh-crc2021/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Meeting
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferVideoSection;
