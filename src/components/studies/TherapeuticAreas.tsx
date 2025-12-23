import { useState, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSectionImages } from "@/hooks/useSectionImages";

// Import fallback images
import gastroenterologyImg from "@/assets/studies/gastroenterology.png";
import cardiovascularImg from "@/assets/studies/cardiovascular.png";
import neurologyImg from "@/assets/studies/neurology.png";
import urologyImg from "@/assets/studies/urology.png";
import rheumatologyImg from "@/assets/studies/rheumatology.png";
import vaccinesImg from "@/assets/studies/vaccines.png";
import geneticDiseasesImg from "@/assets/studies/genetic-diseases.png";
import metabolicDisordersImg from "@/assets/studies/metabolic-disorders.png";
import musculoskeletalImg from "@/assets/studies/musculoskeletal.png";
import endocrinologyImg from "@/assets/studies/endocrinology.png";
import ophthalmologyImg from "@/assets/studies/ophthalmology.png";
import entImg from "@/assets/studies/ent.png";
import pediatricsImg from "@/assets/studies/pediatrics.png";
import geriatricsImg from "@/assets/studies/geriatrics.png";
import maternityImg from "@/assets/studies/maternity-womens-health.png";
import psychiatryImg from "@/assets/studies/psychiatry.png";
import dermatologyImg from "@/assets/studies/dermatology.png";

const fallbackImages = [
  gastroenterologyImg,
  cardiovascularImg,
  neurologyImg,
  urologyImg,
  rheumatologyImg,
  vaccinesImg,
  geneticDiseasesImg,
  metabolicDisordersImg,
  musculoskeletalImg,
  endocrinologyImg,
  ophthalmologyImg,
  entImg,
  pediatricsImg,
  geriatricsImg,
  maternityImg,
  psychiatryImg,
  dermatologyImg,
];

// Default data for fallback
const defaultAreas = [
  { title: "Gastroenterology (GI)", shortTitle: "GI", color: "primary", conditions: "Inflammatory Bowel Disease (IBD)|Crohn's Disease|Ulcerative Colitis|IBS|GERD" },
  { title: "Cardiovascular (Cardio)", shortTitle: "Cardio", color: "accent", conditions: "Hypertension|Coronary Artery Disease|Heart Failure|Arrhythmias" },
  { title: "Neurology (Neuro)", shortTitle: "Neuro", color: "primary", conditions: "Multiple Sclerosis|Epilepsy|Parkinson's Disease|Migraine" },
  { title: "Urology", shortTitle: "Urology", color: "accent", conditions: "Overactive Bladder|BPH|Prostatitis" },
  { title: "Rheumatology (Rheum)", shortTitle: "Rheum", color: "primary", conditions: "Rheumatoid Arthritis|Osteoarthritis|Lupus" },
  { title: "Vaccines", shortTitle: "Vaccines", color: "accent", conditions: "COVID-19|Influenza|Pneumococcal" },
  { title: "Genetic Diseases (Genetic)", shortTitle: "Genetic", color: "primary", conditions: "Cystic Fibrosis|Sickle Cell|Muscular Dystrophy" },
  { title: "Metabolic Disorders (Metabolic)", shortTitle: "Metabolic", color: "accent", conditions: "Diabetes|Obesity|Metabolic Syndrome" },
  { title: "Musculoskeletal (MSK)", shortTitle: "MSK", color: "primary", conditions: "Osteoporosis|Chronic Pain|Sports Injuries" },
  { title: "Endocrinology (Endo)", shortTitle: "Endo", color: "accent", conditions: "Thyroid Disorders|Diabetes|Hormonal Imbalances" },
  { title: "Ophthalmology (Ophthal)", shortTitle: "Ophthal", color: "primary", conditions: "AMD|Glaucoma|Diabetic Retinopathy" },
  { title: "ENT", shortTitle: "ENT", color: "accent", conditions: "Chronic Sinusitis|Hearing Loss|Sleep Apnea" },
  { title: "Pediatrics (Peds)", shortTitle: "Peds", color: "primary", conditions: "Pediatric Asthma|ADHD|Childhood Obesity" },
  { title: "Geriatrics", shortTitle: "Geriatrics", color: "accent", conditions: "Dementia|Frailty|Polypharmacy" },
  { title: "Maternity & Women's Health (Women's)", shortTitle: "Women's", color: "primary", conditions: "Gestational Diabetes|Endometriosis|Menopause" },
  { title: "Psychiatry (Psych)", shortTitle: "Psych", color: "accent", conditions: "Depression|Anxiety|Bipolar Disorder" },
  { title: "Dermatology (Derm)", shortTitle: "Derm", color: "primary", conditions: "Psoriasis|Atopic Dermatitis|Acne|Vitiligo" },
];

const TherapeuticAreas = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionTopRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent("studies", "therapeutic_areas");
  const { getImageUrl } = useSectionImages("studies", "therapeutic_areas");

  // Build therapeutic areas from database content or fallback
  const therapeuticAreas = useMemo(() => {
    return defaultAreas.map((defaultArea, index) => {
      const areaNum = index + 1;
      const title = content[`area${areaNum}_title`] || defaultArea.title;
      const shortTitle = content[`area${areaNum}_short_title`] || defaultArea.shortTitle;
      const conditionsStr = content[`area${areaNum}_conditions`] || defaultArea.conditions;
      const conditions = conditionsStr.split('|').filter(c => c.trim());
      
      return {
        id: areaNum,
        image: getImageUrl(`area_image${areaNum}`, fallbackImages[index]),
        title,
        shortTitle,
        color: index % 2 === 0 ? "primary" : "accent",
        conditions
      };
    });
  }, [content, getImageUrl]);
  
  const selectedArea = therapeuticAreas[selectedIndex];

  const scrollToSectionTop = () => {
    if (sectionTopRef.current) {
      sectionTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
    scrollToSectionTop();
  };

  const goToPrev = () => {
    setSelectedIndex(prev => prev === 0 ? therapeuticAreas.length - 1 : prev - 1);
    scrollToSectionTop();
  };

  const goToNext = () => {
    setSelectedIndex(prev => prev === therapeuticAreas.length - 1 ? 0 : prev + 1);
    scrollToSectionTop();
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">{content.tag || "Research Areas"}</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.title || "Therapeutic Areas"} <span className="text-accent">{content.title_highlight || "Covered"}</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.description || "CRC supports clinical operations across GI, cardiovascular, neurology, urology, rheumatology, vaccines, genetic diseases, metabolic disorders, musculoskeletal health, endocrinology, ophthalmology, ENT, pediatrics, geriatrics, maternity health, psychiatry, and dermatology, enabling both early development and contract research and development initiatives."}
          </p>
        </div>

        {/* Scroll target ref */}
        <div ref={sectionTopRef} className="absolute -top-20" />

        {/* Slider with Arrows - Hidden on Mobile */}
        <div className={`mb-8 transition-all duration-700 delay-300 hidden md:block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center gap-2 max-w-5xl mx-auto">
            {/* Left Arrow */}
            <button 
              onClick={() => scrollSlider('left')}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Tabs */}
            <div 
              ref={sliderRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-2 py-2 px-1">
                {therapeuticAreas.map((area, index) => (
                  <button
                    key={area.id}
                    onClick={() => handleTabClick(index)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      selectedIndex === index
                        ? area.color === 'accent'
                          ? 'bg-accent text-white shadow-lg scale-105'
                          : 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white border border-border hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <img 
                      src={area.image} 
                      alt="" 
                      className={`w-6 h-6 object-contain ${selectedIndex === index ? 'brightness-0 invert' : ''}`}
                      loading="lazy"
                    />
                    <span className="text-sm font-medium">{area.shortTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => scrollSlider('right')}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile indicator - shown only on mobile */}
        <div className={`flex justify-center items-center gap-2 mb-6 md:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
            {selectedArea.shortTitle} ({selectedIndex + 1}/{therapeuticAreas.length})
          </span>
        </div>

        {/* Selected Area Display with Navigation */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className={`relative aspect-square md:aspect-auto md:min-h-[400px] overflow-hidden ${
                  selectedArea.color === 'accent' ? 'bg-accent/5' : 'bg-primary/5'
                }`}>
                  <img 
                    src={selectedArea.image} 
                    alt={selectedArea.title} 
                    className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
                    loading="eager"
                  />
                  
                  {/* Navigation Arrows on Image - Mobile */}
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:hidden">
                    <button 
                      onClick={goToPrev}
                      className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all"
                      aria-label="Previous area"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button 
                      onClick={goToNext}
                      className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all"
                      aria-label="Next area"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {selectedArea.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conditions & Focus Areas:
                  </p>
                  <ul className="space-y-2 md:space-y-3">
                    {selectedArea.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full mt-1.5 md:mt-2 flex-shrink-0 ${
                          selectedArea.color === 'accent' ? 'bg-accent' : 'bg-primary'
                        }`} />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Desktop Side Navigation */}
            <button 
              onClick={goToPrev}
              className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-border shadow-lg items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Previous area"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={goToNext}
              className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-border shadow-lg items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Next area"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 py-4 bg-crc-light-bg rounded-2xl border border-border">
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{content.stat1_value || "17+"}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{content.stat1_label || "Therapeutic Areas"}</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-accent">{content.stat2_value || "50+"}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{content.stat2_label || "Conditions Covered"}</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{content.stat3_value || "100%"}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{content.stat3_label || "Regulatory Expertise"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapeuticAreas;
