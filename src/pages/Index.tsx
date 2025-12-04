import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import WhyTrustSection from "@/components/WhyTrustSection";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import ResearchEnvironmentSection from "@/components/ResearchEnvironmentSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <WhyTrustSection />
        <TeamPreviewSection />
        <ResearchEnvironmentSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
