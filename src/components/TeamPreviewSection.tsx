import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/facilities/team-photo.jpg";
import directorOffice from "@/assets/facilities/director-office.jpg";

const TeamPreviewSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-4 md:mb-6">Our Team</BrandTag>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Meet the <span className="text-primary">Experts</span> Behind CRC
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A dedicated team of clinical research professionals committed to advancing medical science
          </p>
        </div>

        {/* Team Photos Grid */}
        <div className="grid gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Team Photo */}
          <Link 
            to="/about"
            className={`group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <img
                src={teamPhoto}
                alt="CRC Research Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">Our Research Team</h3>
                <p className="text-white/80 text-xs md:text-sm lg:text-base mb-2 md:mb-4">
                  20+ professionals dedicated to clinical excellence
                </p>
                <span className="inline-flex items-center gap-2 text-white text-xs md:text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more about us
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-8 md:mt-12 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button asChild size="lg" className="group">
            <Link to="/about">
              Discover Our Story
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
