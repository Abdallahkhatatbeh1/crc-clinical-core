import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyUsHero from "@/components/whyus/WhyUsHero";
import OfferVideoSection from "@/components/whyus/OfferVideoSection";
import PartnersShowcase from "@/components/whyus/PartnersShowcase";
import WhyUsCTA from "@/components/whyus/WhyUsCTA";

const WhyUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <OfferVideoSection />
        <WhyUsHero />
        <PartnersShowcase />
        <WhyUsCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WhyUs;