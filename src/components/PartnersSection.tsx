import BrandTag from "./BrandTag";

const croPartners = [
  "IQVIA",
  "Parexel",
  "Syneos Health",
  "ICON",
  "PPD",
  "Labcorp",
  "Medpace",
  "PSI",
  "MCT"
];

const pharmaPartners = [
  "Johnson & Johnson",
  "Janssen",
  "New Amsterdam Pharma",
  "Sparta Biomedical"
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* CRO Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <BrandTag className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
              Our Network
            </BrandTag>
            <h2
              className="text-foreground max-w-2xl mx-auto mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              CRO Partners
            </h2>
            <p
              className="text-muted-foreground max-w-3xl mx-auto animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              CRC collaborates with major CRO partners, demonstrating our capacity to align with top-tier contract research organizations and deliver high-quality data.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {croPartners.map((partner, index) => (
              <div
                key={partner}
                className="px-6 py-3 bg-secondary rounded-full border border-border text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Pharmaceutical Partners */}
        <div>
          <div className="text-center mb-12">
            <BrandTag variant="green" className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
              Trusted By
            </BrandTag>
            <h2
              className="text-foreground max-w-2xl mx-auto mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              Pharmaceutical Sponsor Partnerships
            </h2>
            <p
              className="text-muted-foreground max-w-3xl mx-auto animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              CRC supports research programs for global pharmaceutical leaders, reflecting strong scientific reliability and alignment with rigorous clinical trial site expectations.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {pharmaPartners.map((partner, index) => (
              <div
                key={partner}
                className="px-8 py-4 bg-accent/10 rounded-xl border border-accent/20 text-foreground font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
