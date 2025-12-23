import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent } from "@/hooks/useSiteContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Users } from "lucide-react";
import { AdminHeader, StatsCards, ContentEditor, AdminsManager, ImagesManager } from "@/components/admin";

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
          <h2 className="text-2xl font-bold text-foreground mb-2">مرحباً بك!</h2>
          <p className="text-muted-foreground">قم بإدارة محتوى موقعك والمسؤولين من هنا.</p>
        </div>

        <StatsCards 
          contentCount={content.length} 
          pagesCount={pages.length} 
          adminsCount={adminsCount} 
        />

        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
          <TabsList className="mb-6 bg-white p-1 shadow-sm">
            <TabsTrigger value="content" className="flex items-center gap-2 px-6">
              <FileText className="h-4 w-4" />
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2 px-6">
              <Image className="h-4 w-4" />
              الصور
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2 px-6">
              <Users className="h-4 w-4" />
              المسؤولين
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentEditor 
              content={content} 
              pages={pages} 
              updateContent={updateContent} 
            />
          </TabsContent>

          <TabsContent value="admins">
            <AdminsManager session={session} user={user} />
          </TabsContent>

          <TabsContent value="images">
            <ImagesManager session={session} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
