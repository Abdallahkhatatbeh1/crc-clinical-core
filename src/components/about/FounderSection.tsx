import { Award, FlaskConical, Shield, Users } from "lucide-react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const achievements = [
  { icon: FlaskConical, value: "40+", label: "Clinical Trials" },
  { icon: Users, value: "15+", label: "Years Experience" },
  { icon: Award, value: "I-IV", label: "All Phases" },
  { icon: Shield, value: "GCP", label: "Compliant" }
];

const FounderSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Visual Side */}
            <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative">
                {/* Main Visual */}
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-8 right-8 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                  <div className="absolute bottom-12 left-8 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center mb-6">
                      <span className="text-5xl font-bold text-white">SM</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Dr. Sabiha Malkawi</h3>
                    <p className="text-primary font-medium mb-4">Founder & CEO</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">Leadership</span>
                      <span className="px-3 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent">Research</span>
                    </div>
                  </div>
                </div>

                {/* Achievement badges floating */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-border">
                  <div className="text-2xl font-bold text-primary">40+</div>
                  <div className="text-xs text-muted-foreground">Studies Led</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-border">
                  <div className="text-2xl font-bold text-accent">15+</div>
                  <div className="text-xs text-muted-foreground">Years Exp.</div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <BrandTag className="mb-6">Leadership</BrandTag>
              <h2 className="text-foreground mb-6">
                Meet Our <span className="text-primary">Founder</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Malkawi has over <span className="text-primary font-semibold">15 years of experience</span> collaborating with contract research organizations, global CROs, and major industry sponsors.
                </p>
                <p>
                  She has overseen more than <span className="text-accent font-semibold">40 Phase I–IV studies</span>, including early development and CRO drug development-supporting trials.
                </p>
                <p>
                  Her expertise spans protocol governance, patient safety, endpoint measurement, and advanced clinical trial management oversight.
                </p>
              </div>

              {/* Expertise Areas */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["Protocol Governance", "Patient Safety", "Endpoint Measurement", "Trial Management"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
