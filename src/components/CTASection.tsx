import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-32 gradient-brand relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-crc-white blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-crc-white blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-crc-white blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-primary-foreground mb-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Work With Us
          </h2>
          <p
            className="text-xl text-primary-foreground/90 mb-12 leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Partner with CRC to conduct your next clinical study in Jordan with <span className="font-semibold">confidence</span>, <span className="font-semibold">efficiency</span>, and <span className="font-semibold">internationally aligned quality</span>.
          </p>
          <div
            className="animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl">
              Partner With Us for Your Next Clinical Trial
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
