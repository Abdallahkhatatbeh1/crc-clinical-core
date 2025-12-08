import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Import images
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

const therapeuticAreas = [
  {
    id: 1,
    image: gastroenterologyImg,
    title: "Gastroenterology (GI)",
    color: "primary",
    conditions: [
      "Inflammatory Bowel Disease (IBD): Crohn's disease, Ulcerative colitis",
      "NASH / MASH",
      "Acute pancreatitis",
      "GERD",
      "IBS and functional GI disorders"
    ]
  },
  {
    id: 2,
    image: cardiovascularImg,
    title: "Cardiovascular",
    color: "accent",
    conditions: [
      "ASCVD",
      "Hypertriglyceridemia",
      "Hypercholesterolemia",
      "Hypertension",
      "Heart failure"
    ]
  },
  {
    id: 3,
    image: neurologyImg,
    title: "Neurology",
    color: "primary",
    conditions: [
      "Multiple Sclerosis (MS)",
      "Epilepsy",
      "Neuropathic pain",
      "Movement disorders"
    ]
  },
  {
    id: 4,
    image: urologyImg,
    title: "Urology",
    color: "accent",
    conditions: [
      "Overactive bladder (OAB)",
      "Benign Prostatic Hyperplasia (BPH)",
      "Prostatitis"
    ]
  },
  {
    id: 5,
    image: rheumatologyImg,
    title: "Rheumatology",
    color: "primary",
    conditions: [
      "Rheumatoid arthritis",
      "Osteoarthritis",
      "Spondyloarthritis"
    ]
  },
  {
    id: 6,
    image: vaccinesImg,
    title: "Vaccines",
    color: "accent",
    conditions: [
      "MERS-CoV",
      "COVID-19",
      "Additional emerging and routine vaccines"
    ]
  },
  {
    id: 7,
    image: geneticDiseasesImg,
    title: "Genetic Diseases",
    color: "primary",
    conditions: ["Rare genetic conditions", "Hereditary disorders"]
  },
  {
    id: 8,
    image: metabolicDisordersImg,
    title: "Metabolic Disorders",
    color: "accent",
    conditions: [
      "Diabetes",
      "Obesity",
      "Insulin resistance",
      "Lipid disorders"
    ]
  },
  {
    id: 9,
    image: musculoskeletalImg,
    title: "Musculoskeletal",
    color: "primary",
    conditions: [
      "Chronic and acute pain",
      "Bone and joint disorders"
    ]
  },
  {
    id: 10,
    image: endocrinologyImg,
    title: "Endocrinology",
    color: "accent",
    conditions: [
      "Thyroid disorders",
      "Hormonal imbalances and endocrine conditions"
    ]
  },
  {
    id: 11,
    image: ophthalmologyImg,
    title: "Ophthalmology",
    color: "primary",
    conditions: ["Eye disorders", "Vision conditions"]
  },
  {
    id: 12,
    image: entImg,
    title: "ENT",
    color: "accent",
    conditions: ["Ear, nose, and throat disorders"]
  },
  {
    id: 13,
    image: pediatricsImg,
    title: "Pediatrics",
    color: "primary",
    conditions: ["Childhood diseases", "Pediatric conditions"]
  },
  {
    id: 14,
    image: geriatricsImg,
    title: "Geriatrics",
    color: "accent",
    conditions: ["Age-related conditions", "Elderly care"]
  },
  {
    id: 15,
    image: maternityImg,
    title: "Maternity & Women's Health",
    color: "primary",
    conditions: ["Maternal health", "Women's health conditions"]
  },
  {
    id: 16,
    image: psychiatryImg,
    title: "Psychiatry",
    color: "accent",
    conditions: [
      "Depression",
      "Anxiety",
      "Sleep disorders"
    ]
  }
];

const TherapeuticAreas = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-6">Research Areas</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Therapeutic Areas <span className="text-accent">Covered</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            CRC supports clinical operations across GI, cardiovascular, neurology, urology, rheumatology, vaccines, genetic diseases, metabolic disorders, musculoskeletal health, endocrinology, ophthalmology, ENT, pediatrics, geriatrics, maternity health, and psychiatry, enabling both early development and contract research and development initiatives.
          </p>
        </div>

        {/* Therapeutic Areas Grid - New Design with Large Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {therapeuticAreas.map((area, index) => {
            const isExpanded = expandedCards.includes(area.id);
            return (
              <div
                key={area.id}
                className={`group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + (index % 8) * 50}ms` }}
              >
                {/* Card */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Large Image Container */}
                  <div className={`aspect-square p-6 flex items-center justify-center transition-colors ${
                    area.color === 'accent' ? 'bg-accent/5 group-hover:bg-accent/10' : 'bg-primary/5 group-hover:bg-primary/10'
                  }`}>
                    <img 
                      src={area.image} 
                      alt={area.title} 
                      className="w-full h-full max-w-[120px] max-h-[120px] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Title and Expand Button */}
                  <div 
                    className="p-4 cursor-pointer border-t border-border/50 hover:bg-muted/50 transition-colors"
                    onClick={() => toggleCard(area.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                        {area.title}
                      </h3>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isExpanded 
                          ? area.color === 'accent' ? 'bg-accent text-white rotate-180' : 'bg-primary text-white rotate-180'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content - Conditions List */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 pb-4 pt-2 border-t border-border/30 bg-muted/30">
                      <ul className="space-y-2">
                        {area.conditions.map((condition, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              area.color === 'accent' ? 'bg-accent' : 'bg-primary'
                            }`} />
                            <span>{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 py-4 bg-crc-light-bg rounded-2xl border border-border">
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">16+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Therapeutic Areas</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-accent">50+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Conditions Covered</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">I-IV</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">All Trial Phases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapeuticAreas;
