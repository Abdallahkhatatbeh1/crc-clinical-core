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
    description: "CRC provides full regulatory and ethics management, ensuring that all clinical studies meet national and international compliance standards.",
    services: [
      "Preparation and submission of IRB/EC applications",
      "Managing regulatory submissions to health authorities such as the Jordan Food and Drug Administration (JFDA)",
      "Maintaining and updating essential documents (TMF/ISF)",
      "Comprehensive safety reporting, including AEs, SAEs, SUSARs, and expedited notifications",
      "Ensuring alignment with clinicaltrials.gov and ICH-GCP requirements"
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: Rocket,
    title: "Clinical Trial Start-Up Services",
    description: "CRC supports sponsors and CROs through efficient, structured start-up processes optimized for rapid study activation.",
    services: [
      "Detailed feasibility assessments based on population availability, standard-of-care practices, and site capabilities",
      "Budget development and contract negotiation",
      "Site Qualification Visit (SQV) preparation and Site Initiation Visit (SIV) readiness",
      "Protocol training, staff competency verification, and SOP-aligned onboarding",
      "Activation support to achieve fast FPI (First Patient In)"
    ],
    color: "accent"
  },
  {
    id: 3,
    icon: Users,
    title: "Patient Recruitment & Enrollment Solutions",
    description: "CRC maintains highly reliable patient recruitment frameworks supported by validated screening methods and regional population access advantages.",
    services: [
      "Identification of eligible participants using targeted, protocol-specific criteria",
      "(Where permitted) advertising, community outreach, and digital engagement strategies",
      "Pre-screening and full clinical screening procedures",
      "Informed consent management using IRB-approved documentation",
      "Inclusion of patients across therapeutic areas including depression clinical trials, metabolic disorders, cardiology, GI, neurology, and latest clinical trials on COVID-19"
    ],
    color: "primary"
  },
  {
    id: 4,
    icon: Stethoscope,
    title: "Clinical Trial Conduct & Patient Management",
    description: "CRC conducts all clinical visits and procedural requirements with scientific accuracy and strict protocol adherence.",
    services: [
      "Conducting full study visits in accordance with protocol, visit windows, and SOPs",
      "Collecting safety and efficacy data, including vital signs, AE assessments, and endpoint measurements",
      "Dispensing Investigational Product (IP) and performing full IP accountability",
      "Managing IP storage under controlled conditions",
      "Monitoring patient compliance and reporting deviations",
      "Providing continuous patient support, retention management, and follow-up care"
    ],
    color: "accent"
  },
  {
    id: 5,
    icon: FlaskConical,
    title: "Medical & Laboratory Support Services",
    description: "CRC provides medically supervised clinical procedures, laboratory processing, and sample handling that meet international research standards.",
    services: [
      "Comprehensive physical examinations and physician-led medical evaluations",
      "ECGs, vital signs, imaging (where applicable), and pulmonary function testing",
      "On-site laboratory sample collection",
      "Sample processing, centrifugation, aliquoting, labeling, and temperature-controlled storage (including −80°C freezer)",
      "Packaging and shipment of biological samples to central laboratories following IATA/ICH guidelines",
      "Support for medical device CRO partners requiring device training and device-related procedures"
    ],
    color: "primary"
  },
  {
    id: 6,
    icon: Database,
    title: "Clinical Data Management & Documentation",
    description: "CRC ensures accurate, compliant, audit-ready data supporting dependable clinical evidence.",
    services: [
      "Completion of eCRFs in sponsor-provided EDC systems",
      "Query resolution and timely data cleaning",
      "Comprehensive source documentation and verification",
      "Maintaining secure, compliant electronic and paper patient records",
      "Adherence to GCP standards for data integrity and archival",
      "Integration with clinical trial management systems (CTMS)"
    ],
    color: "accent"
  },
  {
    id: 7,
    icon: Search,
    title: "Monitoring, Auditing & CRO Collaboration",
    description: "CRC supports on-site and remote monitoring activities with full transparency and operational readiness.",
    services: [
      "Dedicated monitoring rooms for CRA visits",
      "Remote monitoring support, including secure document sharing",
      "Preparing and hosting sponsor audits",
      "Regulatory inspection readiness, including JFDA compliance",
      "Ongoing communication with global CRO teams for aligned trial oversight"
    ],
    color: "primary"
  },
  {
    id: 8,
    icon: Pill,
    title: "Investigational Product (IP) Management & Pharmacy Services",
    description: "IP handling is performed by qualified pharmacists trained in blinded and unblinded drug management.",
    services: [
      "Temperature-controlled storage (refrigerated, frozen, and ambient)",
      "Daily temperature logs, alarm systems, and deviation management",
      "IP dispensing, returns, reconciliation, and documentation",
      "Destruction or return according to sponsor SOPs",
      "Controlled access and double-verification for blinded studies"
    ],
    color: "accent"
  },
  {
    id: 9,
    icon: Package,
    title: "Study Close-Out Services",
    description: "CRC completes all final regulatory and operational requirements for study closure.",
    services: [
      "Final IP accountability, destruction, or return",
      "Complete data reconciliation and query closure",
      "Archiving essential documents per sponsor and regulatory guidelines",
      "Site close-out with sponsor representatives and ethics committees",
      "Transfer of archived data into secure long-term storage"
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
