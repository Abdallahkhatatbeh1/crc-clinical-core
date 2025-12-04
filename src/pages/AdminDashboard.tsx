import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllPageContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Save, Home, LayoutDashboard, FileText, Users, Eye, Plus, Trash2, Settings, Globe } from "lucide-react";
import crcLogo from "@/assets/crc-logo-full.png";

const sectionNames: { [key: string]: string } = {
  hero: "Hero Section",
  who_we_are: "Who We Are",
  features: "Features",
  cta: "Call to Action",
};

const keyNames: { [key: string]: string } = {
  title: "Title",
  subtitle: "Subtitle",
  description: "Description",
  cta_text: "CTA Button Text",
  button_text: "Button Text",
  tag: "Tag Label",
  card1_title: "Card 1 Title",
  card1_description: "Card 1 Description",
  card2_title: "Card 2 Title",
  card2_description: "Card 2 Description",
  card3_title: "Card 3 Title",
  card3_description: "Card 3 Description",
};

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut, session } = useAuth();
  const { content, isLoading: contentLoading, updateContent } = useAllPageContent("home");
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    const initial: { [key: string]: string } = {};
    content.forEach((item) => {
      initial[item.id] = item.content_value || "";
    });
    setEditedContent(initial);
  }, [content]);

  const fetchAdmins = async () => {
    if (!session?.access_token) return;
    
    setLoadingAdmins(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'list' },
      });

      if (error) throw error;
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
    setLoadingAdmins(false);
  };

  useEffect(() => {
    if (activeTab === "admins" && session) {
      fetchAdmins();
    }
  }, [activeTab, session]);

  const handleSave = async (id: string) => {
    setSavingId(id);
    const { error } = await updateContent(id, editedContent[id]);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: "Changes saved successfully",
      });
    }
    setSavingId(null);
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast({
        title: "Error",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setAddingAdmin(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'add', email: newAdminEmail, password: newAdminPassword },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin added successfully",
      });
      setNewAdminEmail("");
      setNewAdminPassword("");
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setAddingAdmin(false);
  };

  const handleRemoveAdmin = async (adminId: string) => {
    if (adminId === user?.id) {
      toast({
        title: "Error",
        description: "You cannot remove yourself",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'remove', user_id: adminId },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin removed successfully",
      });
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as { [key: string]: typeof content });

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-brand">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crc-light-bg">
      {/* Header */}
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
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your website content and administrators from here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{content.length}</p>
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
                <p className="text-3xl font-bold text-foreground">{Object.keys(groupedContent).length}</p>
                <p className="text-sm text-muted-foreground">Sections</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{admins.length || 1}</p>
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
                <p className="text-3xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Active Pages</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white p-1 shadow-sm">
            <TabsTrigger value="content" className="flex items-center gap-2 px-6">
              <Home className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2 px-6">
              <Users className="h-4 w-4" />
              Administrators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>Edit the content displayed on your homepage</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue={Object.keys(groupedContent)[0]} className="w-full">
                  <TabsList className="w-full flex-wrap h-auto gap-2 mb-6 bg-muted/50 p-2">
                    {Object.keys(groupedContent).map((section) => (
                      <TabsTrigger 
                        key={section} 
                        value={section} 
                        className="flex-1 min-w-fit data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        {sectionNames[section] || section}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(groupedContent).map(([section, items]) => (
                    <TabsContent key={section} value={section} className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="bg-muted/30 rounded-xl p-5 space-y-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <label className="font-semibold text-foreground">
                              {keyNames[item.content_key] || item.content_key}
                            </label>
                            <Button
                              size="sm"
                              onClick={() => handleSave(item.id)}
                              disabled={savingId === item.id || editedContent[item.id] === item.content_value}
                              className="min-w-[100px]"
                            >
                              {savingId === item.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save
                                </>
                              )}
                            </Button>
                          </div>
                          {item.content_key.includes("description") || item.content_key.includes("subtitle") ? (
                            <Textarea
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              rows={4}
                              className="bg-white border-border focus:border-primary resize-none"
                            />
                          ) : (
                            <Input
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              className="bg-white border-border focus:border-primary"
                            />
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Administrator Management</CardTitle>
                      <CardDescription>Add or remove administrators</CardDescription>
                    </div>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Administrator</DialogTitle>
                        <DialogDescription>
                          Enter the credentials for the new administrator
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Email Address</Label>
                          <Input
                            type="email"
                            placeholder="admin@example.com"
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Password</Label>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleAddAdmin}
                          disabled={addingAdmin}
                        >
                          {addingAdmin ? "Adding..." : "Add Administrator"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loadingAdmins ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {admins.map((admin) => (
                      <div key={admin.id} className="flex items-center justify-between p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {admin.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{admin.email}</p>
                            <p className="text-sm text-muted-foreground">
                              Added: {new Date(admin.created_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        {admin.id !== user?.id ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
