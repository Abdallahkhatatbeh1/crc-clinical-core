import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import crcLogoFull from "@/assets/crc-logo-full.png";
import crcLogoSymbol from "@/assets/crc-logo-symbol.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent("global", "header");

  // Build navigation links from database
  const navLinks = useMemo(() => {
    const links = [];
    for (let i = 1; i <= 6; i++) {
      const name = content[`nav_link${i}_text`];
      const href = content[`nav_link${i}_url`];
      if (name && href) {
        links.push({ name, href });
      }
    }
    // Fallback to default if no content loaded
    if (links.length === 0) {
      return [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Studies", href: "/studies" },
        { name: "Services", href: "/services" },
        { name: "Why Us", href: "/why-us" },
        { name: "Contact", href: "/contact" },
      ];
    }
    return links;
  }, [content]);

  const ctaButtonText = content.cta_button_text || "Get Started";
  const ctaButtonUrl = content.cta_button_url || "/why-us";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Full version for desktop/tablet, symbol for mobile */}
          <Link to="/" className="flex items-center p-3 -m-3">
            {/* Desktop/Tablet: Full logo */}
            <img
              src={crcLogoFull}
              alt="Clinical Research Center"
              className="hidden sm:block h-12 md:h-14 w-auto object-contain"
            />
            {/* Mobile: Symbol only */}
            <img
              src={crcLogoSymbol}
              alt="CRC"
              className="block sm:hidden h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  location.pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to={ctaButtonUrl}>
              <Button variant="default" size="default">
                {ctaButtonText}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200",
                    location.pathname === link.href
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link to={ctaButtonUrl} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" size="default" className="w-full">
                    {ctaButtonText}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
