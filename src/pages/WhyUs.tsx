import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyUsHero from "@/components/whyus/WhyUsHero";
import WhyUsFeatures from "@/components/whyus/WhyUsFeatures";
import OfferSection from "@/components/whyus/OfferSection";
import VideoSection from "@/components/whyus/VideoSection";
import PartnersShowcase from "@/components/whyus/PartnersShowcase";
import WhyUsCTA from "@/components/whyus/WhyUsCTA";

const WhyUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <WhyUsHero />
        <WhyUsFeatures />
        <OfferSection />
        <VideoSection />
        <PartnersShowcase />
        <WhyUsCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WhyUs;
