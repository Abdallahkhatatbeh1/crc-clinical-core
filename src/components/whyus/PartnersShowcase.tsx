import { Building2, Handshake, CheckCircle2, Globe, Award, TrendingUp } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import BrandTag from "@/components/BrandTag";

const croPartners = [
  "IQVIA", "Parexel", "Syneos Health", "ICON", "PPD", "Labcorp", "Medpace", "PSI", "MCT"
];

const pharmaSponsors = [
  "Johnson & Johnson", "Janssen", "New Amsterdam Pharma", "Sparta Biomedical"
];

const croCapabilities = [
  "Multinational protocol execution",
  "High-complexity operational oversight",
  "Scientific, regulatory, and data-management alignment",
  "Both global late-phase CRO programs and early-phase feasibility assessments"
];

const sponsorDemonstrations = [
  "Strong scientific reliability",
  "Comprehensive clinical trial management",
  "Proven patient recruitment performance",
  "Consistent delivery of audit-ready, high-quality clinical data"
];

const PartnersShowcase = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag variant="blue" className="mb-6">Our Partners</BrandTag>
          </div>
          <h2 className={`text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            CROs & <span className="text-primary">Sponsors</span>
          </h2>
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            CRC collaborates with a broad network of Contract Research Organizations and pharmaceutical 
            sponsors, reinforcing our position as a high-performing scientific research site capable 
            of supporting global development programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* CRO Collaborations */}
          <div className={`bg-white rounded-3xl border border-border shadow-lg overflow-hidden transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">CRO Collaborations</h3>
                  <p className="text-sm text-muted-foreground">Our Global CRO Partners</p>
                </div>
              </div>

              {/* Partner Logos/Names */}
              <div className="flex flex-wrap gap-2 mb-8">
                {croPartners.map((partner, index) => (
                  <div
                    key={partner}
                    className="bg-crc-light-bg border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    {partner}
                  </div>
                ))}
              </div>

              {/* Capabilities */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  These partnerships reflect CRC's capacity to support:
                </p>
                {croCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-primary to-primary-deep" />
          </div>

          {/* Pharmaceutical Sponsors */}
          <div className={`bg-white rounded-3xl border border-border shadow-lg overflow-hidden transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Pharmaceutical Sponsors</h3>
                  <p className="text-sm text-muted-foreground">Leading Global Sponsors</p>
                </div>
              </div>

              {/* Sponsor Names */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pharmaSponsors.map((sponsor, index) => (
                  <div
                    key={sponsor}
                    className="bg-crc-light-bg border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:border-accent/30 hover:bg-accent/5 transition-colors"
                  >
                    {sponsor}
                  </div>
                ))}
                <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 text-sm font-medium text-accent">
                  + Additional Global Sponsors
                </div>
              </div>

              {/* Demonstrations */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Our continued work with leading sponsors demonstrates:
                </p>
                {sponsorDemonstrations.map((demo, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{demo}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-accent to-accent-soft" />
          </div>
        </div>

        {/* Bottom Statement */}
        <div className={`mt-10 md:mt-16 text-center max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl border border-border p-8 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <Award className="w-6 h-6 text-accent" />
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              CRC is fully equipped to support therapeutic innovation in Jordan, the Middle East, and beyond — 
              providing global research organizations with a <span className="text-primary font-semibold">scientifically robust</span>, 
              <span className="text-accent font-semibold"> ethically grounded</span>, and 
              <span className="text-primary font-semibold"> operationally dependable</span> clinical research partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersShowcase;
