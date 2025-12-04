import { useState } from "react";
import { 
  Stethoscope, Heart, Brain, Activity, Syringe, Dna, 
  Scale, Bone, Pill, Eye, Ear, Baby, Users, HeartPulse,
  Sparkles, ChevronDown, ChevronUp
} from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const therapeuticAreas = [
  {
    id: 1,
    icon: Stethoscope,
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
    icon: Heart,
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
    icon: Brain,
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
    icon: Activity,
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
    icon: Bone,
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
    icon: Syringe,
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
    icon: Dna,
    title: "Genetic Diseases",
    color: "primary",
    conditions: ["Rare genetic conditions", "Hereditary disorders"]
  },
  {
    id: 8,
    icon: Scale,
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
    icon: Bone,
    title: "Musculoskeletal",
    color: "primary",
    conditions: [
      "Chronic and acute pain",
      "Bone and joint disorders"
    ]
  },
  {
    id: 10,
    icon: Pill,
    title: "Endocrinology",
    color: "accent",
    conditions: [
      "Thyroid disorders",
      "Hormonal imbalances and endocrine conditions"
    ]
  },
  {
    id: 11,
    icon: Eye,
    title: "Ophthalmology",
    color: "primary",
    conditions: ["Eye disorders", "Vision conditions"]
  },
  {
    id: 12,
    icon: Ear,
    title: "ENT",
    color: "accent",
    conditions: ["Ear, nose, and throat disorders"]
  },
  {
    id: 13,
    icon: Baby,
    title: "Pediatrics",
    color: "primary",
    conditions: ["Childhood diseases", "Pediatric conditions"]
  },
  {
    id: 14,
    icon: Users,
    title: "Geriatrics",
    color: "accent",
    conditions: ["Age-related conditions", "Elderly care"]
  },
  {
    id: 15,
    icon: HeartPulse,
    title: "Maternity & Women's Health",
    color: "primary",
    conditions: ["Maternal health", "Women's health conditions"]
  },
  {
    id: 16,
    icon: Sparkles,
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
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            CRC supports clinical operations across diverse therapeutic areas, enabling both early development and contract research initiatives.
          </p>
        </div>

        {/* Therapeutic Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {therapeuticAreas.map((area, index) => {
            const isExpanded = expandedCards.includes(area.id);
            return (
              <div
                key={area.id}
                className={`group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + (index % 8) * 50}ms` }}
              >
                {/* Header */}
                <div 
                  className={`p-5 cursor-pointer transition-colors ${
                    area.color === 'accent' ? 'hover:bg-accent/5' : 'hover:bg-primary/5'
                  }`}
                  onClick={() => toggleCard(area.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        area.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                      }`}>
                        <area.icon className={`w-5 h-5 ${area.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm leading-tight">{area.title}</h3>
                        <span className="text-xs text-muted-foreground">{area.conditions.length} conditions</span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isExpanded ? 'bg-primary/10 rotate-180' : 'bg-muted'
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 pt-2 border-t border-border/50">
                    <ul className="space-y-2">
                      {area.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            area.color === 'accent' ? 'bg-accent' : 'bg-primary'
                          }`} />
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-crc-light-bg rounded-2xl border border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">16+</div>
              <div className="text-xs text-muted-foreground">Therapeutic Areas</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-xs text-muted-foreground">Conditions Covered</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">I-IV</div>
              <div className="text-xs text-muted-foreground">All Trial Phases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapeuticAreas;
