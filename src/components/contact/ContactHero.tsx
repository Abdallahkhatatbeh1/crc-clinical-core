import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ContactHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { content } = useSiteContent("contact", "hero");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 gradient-brand overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">{content.badge || "Let's Connect"}</span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.title || "Get in Touch With"} <span className="text-accent">{content.title_highlight || "CRC"}</span>
          </h1>

          <p className={`text-lg md:text-xl text-white/85 mb-10 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.subtitle || "Whether you represent a CRO, a pharmaceutical CRO, a biotech company, or a global sponsor seeking a scientifically robust clinical trial site in Jordan, our team is prepared to support compliant clinical trial management and evidence-driven research execution."}
          </p>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
              <Mail className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-xs text-white/60">Email Us</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
              <Phone className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-xs text-white/60">Call Us</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
              <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-xs text-white/60">Visit Us</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
              <Clock className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-xs text-white/60">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;