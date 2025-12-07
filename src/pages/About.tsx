import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import VisionMission from "@/components/about/VisionMission";
import OurValues from "@/components/about/OurValues";
import TeamSection from "@/components/about/TeamSection";
import TeamPhotoSection from "@/components/about/TeamPhotoSection";
import CommitmentSection from "@/components/about/CommitmentSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <VisionMission />
        <OurValues />
        <TeamPhotoSection />
        <TeamSection />
        <CommitmentSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
