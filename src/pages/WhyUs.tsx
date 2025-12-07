import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyUsHero from "@/components/whyus/WhyUsHero";
import OfferSection from "@/components/whyus/OfferSection";
import VideoSection from "@/components/whyus/VideoSection";
import PartnersShowcase from "@/components/whyus/PartnersShowcase";
import TeamBriefSection from "@/components/whyus/TeamBriefSection";
import FacilitiesShowcase from "@/components/whyus/FacilitiesShowcase";
import WhyUsCTA from "@/components/whyus/WhyUsCTA";

const WhyUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <WhyUsHero />
        <OfferSection />
        <VideoSection />
        <PartnersShowcase />
        <TeamBriefSection />
        <FacilitiesShowcase />
        <WhyUsCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WhyUs;