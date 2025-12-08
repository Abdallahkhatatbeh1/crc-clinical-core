import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                Welcome to Clinical Research Center (CRC). By accessing our website, you agree to these Terms of Service.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Use of Services</h2>
              <p className="mb-6">
                Our services are intended for informational purposes related to clinical research. You agree to use our website and services in accordance with all applicable laws and regulations.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Intellectual Property</h2>
              <p className="mb-6">
                All content on this website, including text, graphics, logos, and images, is the property of CRC and is protected by intellectual property laws.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about these Terms of Service, please contact us at info@crcjo.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
