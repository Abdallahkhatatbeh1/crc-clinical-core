import { useState } from "react";
import { 
  FileCheck, Rocket, Users, Stethoscope, FlaskConical, 
  Database, Search, Pill, ChevronDown, CheckCircle2, Package
} from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  services: string[];
  color: "primary" | "accent";
}

const services: Service[] = [
  {
    id: 1,
    icon: FileCheck,
    title: "Regulatory & Clinical Trial Ethics Support",
    description: "Full regulatory and ethics management ensuring national and international compliance.",
    services: [
      "Preparation and submission of IRB/EC applications",
      "Managing regulatory submissions to JFDA",
      "Maintaining and updating essential documents (TMF/ISF)",
      "Comprehensive safety reporting (AEs, SAEs, SUSARs)",
      "Alignment with clinicaltrials.gov and ICH-GCP requirements"
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: Rocket,
    title: "Clinical Trial Start-Up Services",
    description: "Efficient, structured start-up processes optimized for rapid study activation and Site Initiation Visit (SIV) readiness.",
    services: [
      "Detailed feasibility assessments",
      "Budget development and contract negotiation",
      "Site Qualification Visit (SQV) preparation and Site Initiation Visit (SIV) readiness",
      "Protocol training and staff competency verification",
      "Fast FPI (First Patient In) activation support"
    ],
    color: "accent"
  },
  {
    id: 3,
    icon: Users,
    title: "Patient Recruitment & Enrollment",
    description: "Highly reliable recruitment frameworks with validated screening methods.",
    services: [
      "Protocol-specific participant identification",
      "Community outreach and digital engagement",
      "Pre-screening and full clinical screening",
      "Informed consent management",
      "Multi-therapeutic area recruitment capabilities"
    ],
    color: "primary"
  },
  {
    id: 4,
    icon: Stethoscope,
    title: "Clinical Trial Conduct & Patient Management",
    description: "All clinical visits with scientific accuracy and strict protocol adherence.",
    services: [
      "Full study visits per protocol and SOPs",
      "Safety and efficacy data collection",
      "IP dispensing and accountability",
      "Patient compliance monitoring",
      "Continuous retention management and follow-up"
    ],
    color: "accent"
  },
  {
    id: 5,
    icon: FlaskConical,
    title: "Medical & Laboratory Support",
    description: "Medically supervised procedures and sample handling meeting international standards.",
    services: [
      "Comprehensive physical examinations",
      "ECGs, vital signs, imaging, pulmonary function testing",
      "On-site sample collection and processing",
      "Temperature-controlled storage (including −80°C)",
      "IATA/ICH compliant sample shipment"
    ],
    color: "primary"
  },
  {
    id: 6,
    icon: Database,
    title: "Clinical Data Management & Documentation",
    description: "Accurate, compliant, audit-ready data supporting dependable clinical evidence.",
    services: [
      "eCRF completion in sponsor EDC systems",
      "Query resolution and data cleaning",
      "Comprehensive source documentation",
      "GCP-compliant data integrity and archival",
      "CTMS integration"
    ],
    color: "accent"
  },
  {
    id: 7,
    icon: Search,
    title: "Monitoring, Auditing & CRO Collaboration",
    description: "Full transparency and operational readiness for on-site and remote monitoring.",
    services: [
      "Dedicated monitoring rooms for CRA visits",
      "Remote monitoring and secure document sharing",
      "Sponsor audit preparation and hosting",
      "JFDA regulatory inspection readiness",
      "Ongoing communication with global CRO teams"
    ],
    color: "primary"
  },
  {
    id: 8,
    icon: Pill,
    title: "Investigational Product (IP) Management",
    description: "Qualified pharmacists trained in blinded and unblinded drug management.",
    services: [
      "Temperature-controlled storage (refrigerated, frozen, ambient)",
      "Daily temperature logs and alarm systems",
      "IP dispensing, returns, and reconciliation",
      "Controlled access and double-verification",
      "Destruction or return per sponsor SOPs"
    ],
    color: "accent"
  },
  {
    id: 9,
    icon: Package,
    title: "Study Close-Out Services",
    description: "Complete final regulatory and operational requirements for study closure.",
    services: [
      "Final IP accountability and destruction/return",
      "Complete data reconciliation and query closure",
      "Essential document archiving",
      "Site close-out with sponsors and ethics committees",
      "Secure long-term storage transfer"
    ],
    color: "primary"
  }
];

const ServicesList = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const [expandedCards, setExpandedCards] = useState<number[]>([1]);

  const toggleCard = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="green" className="mb-4 md:mb-6">Our Services</BrandTag>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Comprehensive <span className="text-accent">Clinical Trial</span> Solutions
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            End-to-end support for high-quality, audit-ready research execution
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto items-start">
          {services.map((service, index) => {
            const isExpanded = expandedCards.includes(service.id);
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group bg-white rounded-xl md:rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + (index % 6) * 50}ms` }}
              >
                {/* Header */}
                <div 
                  className={`p-4 md:p-6 cursor-pointer transition-colors ${
                    service.color === 'accent' ? 'hover:bg-accent/5' : 'hover:bg-primary/5'
                  }`}
                  onClick={() => toggleCard(service.id)}
                >
                  <div className="flex items-start justify-between gap-3 md:gap-4">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        service.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                      }`}>
                        <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${service.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-sm md:text-base leading-tight mb-1">{service.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isExpanded ? 'bg-primary/10 rotate-180' : 'bg-muted'
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-border/50">
                    <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 md:mb-3">Services Include:</p>
                    <ul className="space-y-1.5 md:space-y-2">
                      {service.services.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0 ${
                            service.color === 'accent' ? 'text-accent' : 'text-primary'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
