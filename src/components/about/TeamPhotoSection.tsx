import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import teamPhoto from "@/assets/facilities/team-photo.jpg";
import directorOffice from "@/assets/facilities/director-office.jpg";

const TeamPhotoSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-4 md:mb-6">Meet Our Team</BrandTag>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The <span className="text-primary">Dedicated Professionals</span> Behind CRC
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our multidisciplinary team brings together expertise in clinical research, patient care, and regulatory compliance
          </p>
        </div>

        {/* Team Photo Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Main Team Photo - Larger */}
          <div 
            className={`md:col-span-2 relative group overflow-hidden rounded-3xl transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[16/10] relative">
              <img
                src={teamPhoto}
                alt="CRC Research Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Our Research Team</h3>
                <p className="text-white/80 text-sm md:text-base max-w-lg">
                  A diverse team of clinical research professionals committed to advancing medical science
                </p>
              </div>
            </div>
          </div>

          {/* Director Photo */}
          <div 
            className={`relative group overflow-hidden rounded-3xl transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
              <img
                src={directorOffice}
                alt="Dr. Sabeha Malkawi - Director"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-white/80 bg-primary/80 px-3 py-1 rounded-full mb-3 inline-block">
                  Leadership
                </span>
                <h4 className="text-white text-xl font-bold mb-1">Dr. Sabeha Malkawi</h4>
                <p className="text-white/80 text-sm">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats or Quick Info */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mt-8 md:mt-12 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {[
            { number: "20+", label: "Team Members" },
            { number: "15+", label: "Years Experience" },
            { number: "100+", label: "Studies Completed" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-4 md:p-6 bg-crc-light-bg rounded-xl md:rounded-2xl border border-border">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">{stat.number}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPhotoSection;
