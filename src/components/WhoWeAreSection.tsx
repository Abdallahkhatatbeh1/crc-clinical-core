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
            A Trusted Partner in Clinical Research
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            The Clinical Research Center (CRC) has been at the forefront of medical innovation for over two decades. Our multidisciplinary team of researchers, physicians, and clinical specialists work together to conduct rigorous studies that meet the highest standards of scientific integrity.
          </p>
          <p
            className="text-lg text-muted-foreground leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            We partner with leading pharmaceutical companies, academic institutions, and healthcare organizations to bring breakthrough treatments from the lab to patients who need them most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
