import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, FileText, Users, Home } from "lucide-react";

interface StatsCardsProps {
  contentCount: number;
  pagesCount: number;
  adminsCount: number;
}

const StatsCards = ({ contentCount, pagesCount, adminsCount }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{contentCount}</p>
            <p className="text-sm text-muted-foreground">Content Items</p>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-xl">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{pagesCount}</p>
            <p className="text-sm text-muted-foreground">Pages</p>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{adminsCount || 1}</p>
            <p className="text-sm text-muted-foreground">Administrators</p>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-xl">
            <Home className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{pagesCount}</p>
            <p className="text-sm text-muted-foreground">Active Pages</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
