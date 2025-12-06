import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import FacilitiesGallerySection from "@/components/FacilitiesGallerySection";
import WhyTrustSection from "@/components/WhyTrustSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <FacilitiesGallerySection />
        <WhyTrustSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
