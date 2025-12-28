import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import JoinTeam from "@/components/contact/JoinTeam";
import JobApplicationForm from "@/components/contact/JobApplicationForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <JoinTeam />
        <JobApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
