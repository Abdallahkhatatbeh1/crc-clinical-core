import { TrendingUp, Users, Globe, Award } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const OfferSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">Top Recruiters Around The World</BrandTag>
          </div>
          
          <h2 className={`text-foreground mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Guaranteed <span className="text-accent">High Recruitment</span>
          </h2>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Users, value: "500+", label: "Patients Enrolled" },
              { icon: TrendingUp, value: "95%", label: "Retention Rate" },
              { icon: Globe, value: "15+", label: "Countries Served" },
              { icon: Award, value: "100%", label: "On-Time Delivery" }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;