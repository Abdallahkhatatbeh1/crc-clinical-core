import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Handshake, Building } from "lucide-react";

// Import partner logos - CRO
import iqviaLogo from "@/assets/partners/iqvia.png";
import parexelLogo from "@/assets/partners/parexel.png";
import syneosLogo from "@/assets/partners/syneos-health.svg";
import ppdLogo from "@/assets/partners/ppd.png";
import medpaceLogo from "@/assets/partners/medpace.png";
import labcorpLogo from "@/assets/partners/labcorp.png";
import psiLogo from "@/assets/partners/psi.png";
import mctLogo from "@/assets/partners/mct.png";
import iconLogo from "@/assets/partners/icon.png";

// Import partner logos - Pharma
import sareptaLogo from "@/assets/partners/sarepta.png";
import newAmsterdamLogo from "@/assets/partners/new-amsterdam-pharma.png";
import argenxLogo from "@/assets/partners/argenx.png";
import immunicLogo from "@/assets/partners/immunic.png";
import janssenLogo from "@/assets/partners/janssen.svg";
import johnsonLogo from "@/assets/partners/johnson-johnson.png";
import spartaLogo from "@/assets/partners/sparta-biomedical.png";

const croPartners = [
  { name: "IQVIA", logo: iqviaLogo },
  { name: "Parexel", logo: parexelLogo },
  { name: "Syneos Health", logo: syneosLogo },
  { name: "ICON", logo: iconLogo },
  { name: "PPD", logo: ppdLogo },
  { name: "Labcorp", logo: labcorpLogo },
  { name: "Medpace", logo: medpaceLogo },
  { name: "PSI", logo: psiLogo },
  { name: "MCT", logo: mctLogo }
];

const pharmaPartners = [
  { name: "Johnson & Johnson", logo: johnsonLogo },
  { name: "Janssen", logo: janssenLogo },
  { name: "New Amsterdam Pharma", logo: newAmsterdamLogo },
  { name: "Sarepta Therapeutics", logo: sareptaLogo },
  { name: "Argenx", logo: argenxLogo },
  { name: "Immunic Therapeutics", logo: immunicLogo },
  { name: "Sparta Biomedical", logo: spartaLogo }
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
            <p className={`text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              CRC collaborates with major CRO partners, including IQVIA, Parexel, Syneos Health, ICON, PPD, Labcorp, Medpace, PSI, and MCT — demonstrating our capacity to align with top-tier contract research organizations and deliver high-quality data.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 max-w-5xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {croPartners.map((partner, index) => (
              <div
                key={partner.name}
                className="group relative bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center justify-center min-h-[80px] w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-10 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pharmaceutical Sponsor Partnerships */}
        <div>
          <div className="text-center mb-14">
            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">Trusted By</BrandTag>
            </div>
            <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Building className="w-8 h-8 text-accent" />
              <h2 className="text-foreground">Pharmaceutical Sponsor Partnerships</h2>
            </div>
            <p className={`text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              CRC supports research programs for global pharmaceutical leaders including Johnson & Johnson, Janssen, New Amsterdam Pharma, and Sparta Biomedical, reflecting strong scientific reliability and alignment with rigorous clinical trial site expectations.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-6 max-w-5xl mx-auto transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {pharmaPartners.map((partner) => (
              <div
                key={partner.name}
                className="group relative bg-white rounded-2xl p-6 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[120px] w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-16 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
