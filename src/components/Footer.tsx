import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About CRC", href: "/about" },
    { name: "Our Studies", href: "/studies" },
    { name: "Services", href: "/services" },
    { name: "Partners", href: "/partners" },
  ],
  resources: [
    { name: "Why Choose CRC", href: "/why-choose-us" },
    { name: "Research Areas", href: "/studies" },
    { name: "Careers", href: "/contact" },
    { name: "Contact", href: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-brand rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">CRC</span>
            </Link>
            <p className="text-footer-foreground/70 text-sm leading-relaxed">
              Clinical Research Center - Advancing medical science through innovative clinical trials and life-science research.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-footer-foreground/70 text-sm">
                  123 Research Boulevard<br />
                  Medical District, MD 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-footer-foreground/70 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-footer-foreground/70 text-sm">
                  info@crc-research.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-footer-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footer-foreground/50 text-sm">
              © {new Date().getFullYear()} Clinical Research Center. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-footer-foreground/50 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-footer-foreground/50 hover:text-primary text-sm transition-colors">
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
