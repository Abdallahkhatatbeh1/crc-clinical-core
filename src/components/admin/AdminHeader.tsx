import { Button } from "@/components/ui/button";
import { LogOut, Globe } from "lucide-react";
import crcLogo from "@/assets/crc-logo-full.png";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={crcLogo} alt="CRC Logo" className="h-10 object-contain" />
          <div className="hidden sm:block border-l border-border pl-4">
            <h1 className="font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Content Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")} className="hidden sm:flex">
            <Globe className="h-4 w-4 mr-2" />
            View Website
          </Button>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
