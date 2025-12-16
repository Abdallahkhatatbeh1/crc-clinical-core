import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter } from "lucide-react";
import crcLogoWhite from "@/assets/crc-logo-white.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const footerLinks = {
  company: [
    { name: "About CRC", href: "/about" },
    { name: "Our Studies", href: "/studies" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Regulatory Support", href: "/services" },
    { name: "Patient Recruitment", href: "/services" },
    { name: "Data Management", href: "/services" },
    { name: "IP Management", href: "/services" },
  ],
  resources: [
    { name: "Therapeutic Areas", href: "/studies" },
    { name: "Why Choose CRC", href: "/why-us" },
    { name: "Careers", href: "/contact" },
    { name: "Partner With Us", href: "/contact" },
  ],
};

const Footer = () => {
  const { content } = useSiteContent("global", "footer");

  return (
    <footer className="bg-footer text-footer-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block group">
              <img
                src={crcLogoWhite}
                alt="Clinical Research Center"
                className="h-14 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-footer-foreground/60 text-sm leading-relaxed max-w-sm">
              {content.company_description || "Clinical Research Center — A GCP-compliant clinical research site in Jordan, conducting high-quality Phase I–IV clinical trials for global CROs and sponsors."}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.name}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/60 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <li key={link.name + index}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/60 hover:text-accent transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <MapPin size={14} className="text-primary" />
                </div>
                <span className="text-footer-foreground/60 text-sm">
                  {content.address || "Irbid, Jordan"}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone size={14} className="text-primary" />
                </div>
                <a href={`tel:${content.phone || "+962123456789"}`} className="text-footer-foreground/60 hover:text-primary text-sm transition-colors">
                  {content.phone || "+962 123 456 789"}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Mail size={14} className="text-primary" />
                </div>
                <a href="mailto:info@crcjo.com" className="text-footer-foreground/60 hover:text-primary text-sm transition-colors">
                  info@crcjo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footer-foreground/40 text-sm">
              © {new Date().getFullYear()} Clinical Research Center. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="text-footer-foreground/40 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-footer-foreground/40 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
