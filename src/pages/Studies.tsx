import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudiesHero from "@/components/studies/StudiesHero";
import TherapeuticAreas from "@/components/studies/TherapeuticAreas";
import StudiesCTA from "@/components/studies/StudiesCTA";

const Studies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StudiesHero />
        <TherapeuticAreas />
        <StudiesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Studies;
