import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import FacilitiesSection from "@/components/services/FacilitiesSection";
import ServicesCTA from "@/components/services/ServicesCTA";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
        <FacilitiesSection />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
