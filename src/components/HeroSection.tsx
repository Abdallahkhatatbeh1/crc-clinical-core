import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-brand overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-crc-white blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-crc-white blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-primary-foreground mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Advancing Medical Science Through Clinical Research
          </h1>
          <p
            className="text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            CRC is a leading clinical research organization dedicated to conducting high-quality trials that shape the future of healthcare.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Button variant="hero" size="xl">
              Explore Our Studies
              <ArrowRight size={20} />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
