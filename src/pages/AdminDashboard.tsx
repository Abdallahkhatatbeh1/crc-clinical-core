import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Save, Home, LayoutDashboard, FileText, Users, Globe, Plus, Trash2, Info, Briefcase, FlaskConical, Phone, HelpCircle, Image, Upload, X } from "lucide-react";
import crcLogo from "@/assets/crc-logo-full.png";

const pageNames: { [key: string]: { name: string; icon: React.ElementType } } = {
  home: { name: "Homepage", icon: Home },
  about: { name: "About", icon: Info },
  services: { name: "Services", icon: Briefcase },
  studies: { name: "Studies", icon: FlaskConical },
  contact: { name: "Contact", icon: Phone },
  whyus: { name: "Why Us", icon: HelpCircle },
  global: { name: "Global (Footer)", icon: Globe },
};

const sectionNames: { [key: string]: string } = {
  hero: "Hero Section",
  who_we_are: "Who We Are",
  features: "Features",
  cta: "Call to Action",
  vision: "Vision",
  mission: "Mission",
  service1: "Service 1",
  service2: "Service 2",
  service3: "Service 3",
  info: "Contact Info",
  footer: "Footer",
  team: "Team",
  values: "Values",
  list: "Services List",
  areas: "Therapeutic Areas",
};

const keyNames: { [key: string]: string } = {
  title: "Title",
  title_highlight: "Title Highlight",
  title_suffix: "Title Suffix",
  subtitle: "Subtitle",
  description: "Description",
  badge: "Badge Text",
  cta_text: "CTA Button",
  cta_primary: "Primary Button",
  cta_secondary: "Secondary Button",
  button_text: "Button Text",
  tag: "Tag Label",
  location: "Location",
  trust_label: "Trust Label",
  stat1_value: "Stat 1 Value",
  stat1_label: "Stat 1 Label",
  stat2_value: "Stat 2 Value",
  stat2_label: "Stat 2 Label",
  stat3_value: "Stat 3 Value",
  stat3_label: "Stat 3 Label",
  card1_title: "Card 1 Title",
  card1_description: "Card 1 Description",
  card2_title: "Card 2 Title",
  card2_description: "Card 2 Description",
  card3_title: "Card 3 Title",
  card3_description: "Card 3 Description",
  feature1_title: "Feature 1 Title",
  feature1_description: "Feature 1 Description",
  feature2_title: "Feature 2 Title",
  feature2_description: "Feature 2 Description",
  feature3_title: "Feature 3 Title",
  feature3_description: "Feature 3 Description",
  email: "Email",
  phone: "Phone",
  address: "Address",
  hours: "Working Hours",
  company_description: "Company Description",
  section_title: "Section Title",
  section_subtitle: "Section Subtitle",
  value1_title: "Value 1 Title",
  value1_description: "Value 1 Description",
  value2_title: "Value 2 Title",
  value2_description: "Value 2 Description",
  value3_title: "Value 3 Title",
  value3_description: "Value 3 Description",
  vision_tag: "Vision Tag",
  vision_text: "Vision Text",
  mission_tag: "Mission Tag",
  mission_text: "Mission Text",
};

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut, session } = useAuth();
  const { content, pages, isLoading: contentLoading, updateContent } = useAllSiteContent();
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activeMainTab, setActiveMainTab] = useState("content");
  const [activePageTab, setActivePageTab] = useState("home");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [siteImages, setSiteImages] = useState<{ name: string; url: string }[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
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
    if (activeMainTab === "admins" && session) {
      fetchAdmins();
    }
    if (activeMainTab === "images" && session) {
      fetchImages();
    }
  }, [activeMainTab, session]);

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const { data, error } = await supabase.storage.from('site-images').list('', { limit: 100 });
      if (error) throw error;
      
      const images = await Promise.all(
        (data || []).filter(item => !item.id.endsWith('/')).map(async (item) => {
          const { data: { publicUrl } } = supabase.storage.from('site-images').getPublicUrl(item.name);
          return { name: item.name, url: publicUrl };
        })
      );
      setSiteImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoadingImages(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', 'site');

      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      fetchImages();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setUploadingImage(false);
  };

  const handleDeleteImage = async (imageName: string) => {
    try {
      const { error } = await supabase.storage.from('site-images').remove([imageName]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      fetchImages();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

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

  const getPageContent = (page: string) => {
    return content.filter(item => item.page === page);
  };

  const groupContentBySections = (pageContent: typeof content) => {
    return pageContent.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {} as { [key: string]: typeof content });
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
                <p className="text-3xl font-bold text-foreground">{pages.length}</p>
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
                <p className="text-3xl font-bold text-foreground">{pages.length}</p>
                <p className="text-sm text-muted-foreground">Active Pages</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
          <TabsList className="mb-6 bg-white p-1 shadow-sm">
            <TabsTrigger value="content" className="flex items-center gap-2 px-6">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2 px-6">
              <Image className="h-4 w-4" />
              Images
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
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Website Content</CardTitle>
                    <CardDescription>Edit content for all pages</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Page Tabs */}
                <Tabs value={activePageTab} onValueChange={setActivePageTab}>
                  <TabsList className="w-full flex-wrap h-auto gap-2 mb-6 bg-muted/50 p-2">
                    {pages.map((page) => {
                      const pageInfo = pageNames[page] || { name: page, icon: FileText };
                      const PageIcon = pageInfo.icon;
                      return (
                        <TabsTrigger 
                          key={page} 
                          value={page} 
                          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <PageIcon className="h-4 w-4" />
                          {pageInfo.name}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {pages.map((page) => {
                    const pageContent = getPageContent(page);
                    const groupedContent = groupContentBySections(pageContent);

                    return (
                      <TabsContent key={page} value={page}>
                        <Tabs defaultValue={Object.keys(groupedContent)[0]} className="w-full">
                          <TabsList className="w-full flex-wrap h-auto gap-2 mb-6 bg-white p-2 border">
                            {Object.keys(groupedContent).map((section) => (
                              <TabsTrigger 
                                key={section} 
                                value={section} 
                                className="flex-1 min-w-fit"
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
                                  {item.content_key.includes("description") || item.content_key.includes("subtitle") || item.content_key.includes("address") ? (
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
                      </TabsContent>
                    );
                  })}
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

          <TabsContent value="images">
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Image className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Image Management</CardTitle>
                      <CardDescription>Upload and manage site images</CardDescription>
                    </div>
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    <Button asChild disabled={uploadingImage}>
                      <span>
                        {uploadingImage ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loadingImages ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : siteImages.length === 0 ? (
                  <div className="text-center py-12">
                    <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No images uploaded yet</p>
                    <p className="text-sm text-muted-foreground mt-2">Upload your first image using the button above</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {siteImages.map((image) => (
                      <div key={image.name} className="relative group rounded-xl overflow-hidden border border-border bg-muted/30">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => navigator.clipboard.writeText(image.url).then(() => toast({ title: "Copied", description: "Image URL copied to clipboard" }))}
                          >
                            Copy URL
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-muted-foreground truncate">{image.name}</p>
                        </div>
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
