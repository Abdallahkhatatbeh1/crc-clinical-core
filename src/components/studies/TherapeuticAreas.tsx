import { useState } from "react";
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
    shortTitle: "GI",
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
    shortTitle: "Cardio",
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
    shortTitle: "Neuro",
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
    shortTitle: "Urology",
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
    shortTitle: "Rheum",
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
    shortTitle: "Vaccines",
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
    shortTitle: "Genetic",
    color: "primary",
    conditions: ["Rare genetic conditions", "Hereditary disorders"]
  },
  {
    id: 8,
    image: metabolicDisordersImg,
    title: "Metabolic Disorders",
    shortTitle: "Metabolic",
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
    shortTitle: "MSK",
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
    shortTitle: "Endo",
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
    shortTitle: "Ophthal",
    color: "primary",
    conditions: ["Eye disorders", "Vision conditions"]
  },
  {
    id: 12,
    image: entImg,
    title: "ENT",
    shortTitle: "ENT",
    color: "accent",
    conditions: ["Ear, nose, and throat disorders"]
  },
  {
    id: 13,
    image: pediatricsImg,
    title: "Pediatrics",
    shortTitle: "Peds",
    color: "primary",
    conditions: ["Childhood diseases", "Pediatric conditions"]
  },
  {
    id: 14,
    image: geriatricsImg,
    title: "Geriatrics",
    shortTitle: "Geriatrics",
    color: "accent",
    conditions: ["Age-related conditions", "Elderly care"]
  },
  {
    id: 15,
    image: maternityImg,
    title: "Maternity & Women's Health",
    shortTitle: "Women's",
    color: "primary",
    conditions: ["Maternal health", "Women's health conditions"]
  },
  {
    id: 16,
    image: psychiatryImg,
    title: "Psychiatry",
    shortTitle: "Psych",
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
  const [selectedArea, setSelectedArea] = useState(therapeuticAreas[0]);

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
        <div className="text-center mb-12">
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

        {/* Tabs - Horizontal Scrollable */}
        <div className={`mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max justify-center">
              {therapeuticAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                    selectedArea.id === area.id
                      ? area.color === 'accent'
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-primary text-white shadow-lg'
                      : 'bg-white border border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <img 
                    src={area.image} 
                    alt="" 
                    className={`w-5 h-5 object-contain ${selectedArea.id === area.id ? 'brightness-0 invert' : ''}`}
                  />
                  <span className="text-sm font-medium">{area.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Area Display */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className={`flex items-center justify-center p-6 md:p-8 min-h-[280px] md:min-h-[350px] ${
                selectedArea.color === 'accent' ? 'bg-accent/5' : 'bg-primary/5'
              }`}>
                <img 
                  src={selectedArea.image} 
                  alt={selectedArea.title} 
                  className="w-full h-full max-w-[250px] max-h-[250px] md:max-w-[300px] md:max-h-[300px] object-contain transition-all duration-500"
                />
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {selectedArea.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Conditions & Focus Areas:
                </p>
                <ul className="space-y-3">
                  {selectedArea.conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        selectedArea.color === 'accent' ? 'bg-accent' : 'bg-primary'
                      }`} />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
