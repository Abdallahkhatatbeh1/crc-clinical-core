import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandTag from "@/components/BrandTag";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/about": "About CRC",
  "/studies": "Our Studies",
  "/services": "Services",
  "/why-choose-us": "Why Choose CRC",
  "/partners": "Partners",
  "/contact": "Contact",
};

const PlaceholderPage = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Page";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="gradient-brand py-24">
          <div className="container mx-auto px-4 text-center">
            <BrandTag className="mb-6">CRC</BrandTag>
            <h1 className="text-primary-foreground mb-4">{title}</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              This page is under construction. Content coming soon.
            </p>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-xl mx-auto">
              <div className="w-20 h-20 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="text-primary-foreground text-3xl font-bold">
                  {title.charAt(0)}
                </span>
              </div>
              <h2 className="text-foreground mb-6">Content Coming Soon</h2>
              <p className="text-muted-foreground mb-8">
                We're working on bringing you detailed information about our {title.toLowerCase()}. 
                Check back soon for updates.
              </p>
              <Link to="/">
                <Button variant="default" size="lg">
                  <ArrowLeft size={18} />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
