import BrandTag from "./BrandTag";

const WhoWeAreSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BrandTag className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Who We Are
          </BrandTag>
          <h2
            className="text-foreground mb-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            A Specialized Clinical Study Site
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            CRC is a specialized clinical study site located in Irbid, Jordan, providing end-to-end support for clinical trials phases across diverse therapeutic areas.
          </p>
          <p
            className="text-lg text-muted-foreground leading-relaxed mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            Our investigators, sub-investigators, and clinical research coordinators work closely with Contract Research Organizations (CROs) and sponsors to ensure methodological rigor, accurate endpoint evaluation, and ethically sound execution.
          </p>
          <p
            className="text-lg text-muted-foreground leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            As a scientifically driven investigator site, CRC integrates validated workflows, controlled documentation environments, and calibrated medical systems including a modern clinical trial management system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
