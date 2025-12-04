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
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* CRO Partners */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <BrandTag className="mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
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
              CRC collaborates with major CRO partners, demonstrating our capacity to align with <span className="text-primary font-semibold">top-tier contract research organizations</span> and deliver <span className="text-accent font-semibold">high-quality data</span>.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {croPartners.map((partner, index) => (
              <div
                key={partner}
                className="px-6 py-3 bg-secondary rounded-full border border-primary/20 text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Pharmaceutical Partners */}
        <div>
          <div className="text-center mb-14">
            <BrandTag variant="green" className="mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
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
              CRC supports research programs for global pharmaceutical leaders, reflecting <span className="text-accent font-semibold">strong scientific reliability</span> and alignment with rigorous clinical trial site expectations.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {pharmaPartners.map((partner, index) => (
              <div
                key={partner}
                className="px-8 py-4 bg-secondary rounded-xl border border-accent/30 text-foreground font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 animate-fade-in-up opacity-0"
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
