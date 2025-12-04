import { Shield, Award, Globe } from "lucide-react";
import BrandTag from "@/components/BrandTag";

const WhyUsHero = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-deep to-primary" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <BrandTag variant="blue" className="mb-6 bg-white/10 border-white/20 text-white">
              Our Excellence
            </BrandTag>
          </div>
          
          <h1 className="text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Why Choose <span className="text-accent">CRC</span>
          </h1>
          
          <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            The Clinical Research Center provides a scientifically rigorous environment for 
            high-quality clinical trials in Jordan and the Middle East. Our site is built upon 
            internationally recognized research standards, precise operational workflows, 
            controlled documentation systems, and an unwavering commitment to methodological accuracy.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-white text-sm font-medium">ICH-GCP Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-white text-sm font-medium">Scientific Excellence</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-white text-sm font-medium">Global Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default WhyUsHero;
