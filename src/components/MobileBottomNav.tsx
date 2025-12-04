import { Link, useLocation } from "react-router-dom";
import { Home, Users, FlaskConical, Briefcase, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import crcLogoSymbol from "@/assets/crc-logo-symbol.png";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Users },
  { name: "home-logo", href: "/", isLogo: true },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          if (item.isLogo) {
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center justify-center -mt-6"
              >
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-125" />
                  {/* Main logo container */}
                  <div className="relative w-14 h-14 bg-background rounded-full border-4 border-primary shadow-xl flex items-center justify-center">
                    <img
                      src={crcLogoSymbol}
                      alt="CRC Home"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
              </Link>
            );
          }

          const Icon = item.icon!;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-lg transition-all duration-200",
                  isActive && "bg-primary/10"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  );
};

export default MobileBottomNav;
