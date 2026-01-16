import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent } from "@/hooks/useSiteContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Briefcase, Building2, Stethoscope, Link2, MessageSquare } from "lucide-react";
import { AdminHeader, StatsCards, ContentEditor, AdminsManager } from "@/components/admin";
import PositionsManager from "@/components/admin/PositionsManager";
import PartnersManager from "@/components/admin/PartnersManager";
import TherapeuticAreasManager from "@/components/admin/TherapeuticAreasManager";
import LinksManager from "@/components/admin/LinksManager";
import SubmissionsManager from "@/components/admin/SubmissionsManager";

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut, session } = useAuth();
  const { content, pages, isLoading: contentLoading, updateContent } = useAllSiteContent();
  const [activeMainTab, setActiveMainTab] = useState("content");
  const [adminsCount, setAdminsCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-brand">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crc-light-bg">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h2>
          <p className="text-muted-foreground">Manage your website content and administrators from here.</p>
        </div>

        <StatsCards 
          contentCount={content.length} 
          pagesCount={pages.length} 
          adminsCount={adminsCount} 
        />

        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
          <TabsList className="mb-6 bg-white p-1 shadow-sm flex-wrap h-auto gap-1">
            <TabsTrigger value="submissions" className="flex items-center gap-2 px-4">
              <MessageSquare className="h-4 w-4" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 px-4">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2 px-4">
              <Building2 className="h-4 w-4" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="therapeutic" className="flex items-center gap-2 px-4">
              <Stethoscope className="h-4 w-4" />
              Therapeutic Areas
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2 px-4">
              <Link2 className="h-4 w-4" />
              Links
            </TabsTrigger>
            <TabsTrigger value="positions" className="flex items-center gap-2 px-4">
              <Briefcase className="h-4 w-4" />
              Job Positions
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2 px-4">
              <Users className="h-4 w-4" />
              Admins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <SubmissionsManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentEditor 
              content={content} 
              pages={pages} 
              updateContent={updateContent}
              session={session}
            />
          </TabsContent>

          <TabsContent value="partners">
            <PartnersManager />
          </TabsContent>

          <TabsContent value="therapeutic">
            <TherapeuticAreasManager />
          </TabsContent>

          <TabsContent value="links">
            <LinksManager />
          </TabsContent>

          <TabsContent value="positions">
            <PositionsManager />
          </TabsContent>

          <TabsContent value="admins">
            <AdminsManager session={session} user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
