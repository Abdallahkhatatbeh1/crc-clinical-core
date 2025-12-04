import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
