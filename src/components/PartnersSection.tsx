import { useEffect, useRef, useState } from "react";
import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Handshake, Building } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { usePartners } from "@/hooks/usePartners";

// Import fallback partner logos - CRO
import iqviaLogo from "@/assets/partners/iqvia.png";
import parexelLogo from "@/assets/partners/parexel.png";
import syneosLogo from "@/assets/partners/syneos-health.svg";
import ppdLogo from "@/assets/partners/ppd.png";
import medpaceLogo from "@/assets/partners/medpace.png";
import labcorpLogo from "@/assets/partners/labcorp.png";
import psiLogo from "@/assets/partners/psi.png";
import mctLogo from "@/assets/partners/mct.png";
import iconLogo from "@/assets/partners/icon.png";

// Import fallback partner logos - Pharma
import sareptaLogo from "@/assets/partners/sarepta.png";
import newAmsterdamLogo from "@/assets/partners/new-amsterdam-pharma.png";
import argenxLogo from "@/assets/partners/argenx.png";
import immunicLogo from "@/assets/partners/immunic.png";
import johnsonLogo from "@/assets/partners/johnson-johnson.png";

const fallbackCroLogos: Record<string, string> = {
  "IQVIA": iqviaLogo,
  "Parexel": parexelLogo,
  "Syneos Health": syneosLogo,
  "ICON": iconLogo,
  "PPD": ppdLogo,
  "Labcorp": labcorpLogo,
  "Medpace": medpaceLogo,
  "PSI": psiLogo,
  "MCT": mctLogo,
};

const fallbackPharmaLogos: Record<string, string> = {
  "Johnson & Johnson": johnsonLogo,
  "New Amsterdam Pharma": newAmsterdamLogo,
  "Sarepta Therapeutics": sareptaLogo,
  "Argenx": argenxLogo,
  "Immunic Therapeutics": immunicLogo,
};

const PartnersSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { content } = useSiteContent("home", "partners");
  const { partners: croPartnersData } = usePartners('cro');
  const { partners: pharmaPartnersData } = usePartners('pharma');
  const croScrollRef = useRef<HTMLDivElement>(null);
  const pharmaScrollRef = useRef<HTMLDivElement>(null);
  const [isCroPaused, setIsCroPaused] = useState(false);
  const [isPharmaPaused, setIsPharmaPaused] = useState(false);

  // Build partner arrays from database with fallback
  const croPartners = croPartnersData.map(p => ({
    name: p.name,
    logo: p.logo_url || fallbackCroLogos[p.name] || iqviaLogo
  }));

  const pharmaPartners = pharmaPartnersData.map(p => ({
    name: p.name,
    logo: p.logo_url || fallbackPharmaLogos[p.name] || johnsonLogo
  }));

  // Auto-scroll effect for CRO partners
  useEffect(() => {
    const scrollContainer = croScrollRef.current;
    if (!scrollContainer || isCroPaused || croPartners.length === 0) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft || 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isCroPaused, croPartners.length]);

  // Auto-scroll effect for Pharma partners (opposite direction)
  useEffect(() => {
    const scrollContainer = pharmaScrollRef.current;
    if (!scrollContainer || isPharmaPaused || pharmaPartners.length === 0) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft || scrollContainer.scrollWidth / 2;
    const scrollSpeed = 0.4;

    const scroll = () => {
      scrollPosition -= scrollSpeed;
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition <= 0) {
        scrollPosition = halfWidth;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPharmaPaused, pharmaPartners.length]);

  // Duplicate partners for seamless infinite scroll
  const duplicatedCroPartners = [...croPartners, ...croPartners];
  const duplicatedPharmaPartners = [...pharmaPartners, ...pharmaPartners];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* CRO Partners */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="text-center mb-14">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag className="mb-6">{content.tag || "Our Network"}</BrandTag>
            </div>
            <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Handshake className="w-8 h-8 text-primary" />
              <h2 className="text-foreground">{content.cro_title || "CRO Partners"}</h2>
            </div>
            <p className={`text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {content.cro_description || "CRC collaborates with major CRO partners, including IQVIA, Parexel, Syneos Health, ICON, PPD, Labcorp, Medpace, PSI, and MCT — demonstrating our capacity to align with top-tier contract research organizations and deliver high-quality data."}
            </p>
          </div>

          {/* Auto-scrolling Carousel - CRO */}
          <div 
            className={`relative overflow-hidden transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            onMouseEnter={() => setIsCroPaused(true)}
            onMouseLeave={() => setIsCroPaused(false)}
            onTouchStart={() => setIsCroPaused(true)}
            onTouchEnd={() => setIsCroPaused(false)}
          >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={croScrollRef}
              className="flex gap-4 overflow-x-hidden"
              style={{ scrollBehavior: 'auto' }}
            >
              {duplicatedCroPartners.map((partner, index) => (
                <div
                  key={`cro-${partner.name}-${index}`}
                  className="group relative bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center justify-center min-h-[80px] min-w-[140px] md:min-w-[180px] flex-shrink-0"
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
        </div>

        {/* Pharmaceutical Sponsor Partnerships */}
        <div>
          <div className="text-center mb-14">
            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BrandTag variant="green" className="mb-6">{content.pharma_tag || "Trusted By"}</BrandTag>
            </div>
            <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Building className="w-8 h-8 text-accent" />
              <h2 className="text-foreground">{content.pharma_title || "Pharmaceutical Sponsor Partnerships"}</h2>
            </div>
            <p className={`text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {content.pharma_description || "CRC supports research programs for global pharmaceutical leaders including Johnson & Johnson, New Amsterdam Pharma, Sarepta Therapeutics, Argenx, and Immunic Therapeutics, reflecting strong scientific reliability and alignment with rigorous clinical trial site expectations."}
            </p>
          </div>

          {/* Auto-scrolling Carousel - Pharma (opposite direction) */}
          <div 
            className={`relative overflow-hidden transition-all duration-700 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            onMouseEnter={() => setIsPharmaPaused(true)}
            onMouseLeave={() => setIsPharmaPaused(false)}
            onTouchStart={() => setIsPharmaPaused(true)}
            onTouchEnd={() => setIsPharmaPaused(false)}
          >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={pharmaScrollRef}
              className="flex gap-4 overflow-x-hidden"
              style={{ scrollBehavior: 'auto' }}
            >
              {duplicatedPharmaPartners.map((partner, index) => (
                <div
                  key={`pharma-${partner.name}-${index}`}
                  className="group relative bg-white rounded-2xl p-6 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[100px] min-w-[160px] md:min-w-[200px] flex-shrink-0"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-14 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
