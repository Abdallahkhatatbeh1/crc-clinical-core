import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Handshake, Building } from "lucide-react";

const croPartners = [
  "IQVIA", "Parexel", "Syneos Health", "ICON", "PPD", "Labcorp", "Medpace", "PSI", "MCT"
];

const pharmaPartners = [
  "Johnson & Johnson", "Janssen", "New Amsterdam Pharma", "Sparta Biomedical"
];

const PartnersSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* CRO Partners */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag className="mb-6">Our Network</BrandTag>
            </div>
            <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Handshake className="w-8 h-8 text-primary" />
              <h2 className="text-foreground">CRO Partners</h2>
            </div>
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Collaborating with <span className="text-primary font-semibold">top-tier contract research organizations</span> to deliver <span className="text-accent font-semibold">high-quality data</span>
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-3 max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {croPartners.map((partner, index) => (
              <div
                key={partner}
                className="px-6 py-3 bg-white rounded-full border border-border text-foreground font-medium hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Pharmaceutical Partners */}
        <div>
          <div className="text-center mb-14">
            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">Trusted By</BrandTag>
            </div>
            <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Building className="w-8 h-8 text-accent" />
              <h2 className="text-foreground">Pharmaceutical Partners</h2>
            </div>
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Supporting research programs for global leaders with <span className="text-accent font-semibold">scientific reliability</span>
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {pharmaPartners.map((partner, index) => (
              <div
                key={partner}
                className="group relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 border border-accent/20 hover:border-accent hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 block text-center font-semibold text-foreground group-hover:text-white transition-colors">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
