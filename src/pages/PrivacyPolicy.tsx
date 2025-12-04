import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                This Privacy Policy describes how Clinical Research Center (CRC) collects, uses, and protects your personal information.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
              <p className="mb-6">
                We may collect personal information that you provide directly to us, including but not limited to your name, email address, phone number, and any other information you choose to provide.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How We Use Your Information</h2>
              <p className="mb-6">
                We use the information we collect to communicate with you, respond to your inquiries, and provide our clinical research services.
              </p>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us at support@crcjo.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
