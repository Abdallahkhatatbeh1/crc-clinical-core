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
import { LogOut, Save, Home, LayoutDashboard, FileText, Users, Eye, Plus, Trash2 } from "lucide-react";
import crcLogo from "@/assets/crc-logo-full.png";

const sectionNames: { [key: string]: string } = {
  hero: "القسم الرئيسي (Hero)",
  who_we_are: "من نحن",
  features: "المميزات",
  cta: "دعوة للتواصل (CTA)",
};

const keyNames: { [key: string]: string } = {
  title: "العنوان",
  subtitle: "العنوان الفرعي",
  description: "الوصف",
  cta_text: "نص الزر",
  button_text: "نص الزر",
  tag: "التصنيف",
  card1_title: "عنوان البطاقة 1",
  card1_description: "وصف البطاقة 1",
  card2_title: "عنوان البطاقة 2",
  card2_description: "وصف البطاقة 2",
  card3_title: "عنوان البطاقة 3",
  card3_description: "وصف البطاقة 3",
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
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم الحفظ",
        description: "تم حفظ التغييرات بنجاح",
      });
    }
    setSavingId(null);
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
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
        title: "تم الإضافة",
        description: "تم إضافة المسؤول بنجاح",
      });
      setNewAdminEmail("");
      setNewAdminPassword("");
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setAddingAdmin(false);
  };

  const handleRemoveAdmin = async (adminId: string) => {
    if (adminId === user?.id) {
      toast({
        title: "خطأ",
        description: "لا يمكنك حذف حسابك",
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
        title: "تم الحذف",
        description: "تم حذف صلاحيات المسؤول",
      });
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "خطأ",
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={crcLogo} alt="CRC Logo" className="h-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-semibold text-foreground">لوحة التحكم</h1>
              <p className="text-xs text-muted-foreground">إدارة محتوى الموقع</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
              <Eye className="h-4 w-4 mr-2" />
              معاينة الموقع
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{content.length}</p>
                <p className="text-xs text-muted-foreground">عنصر محتوى</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-crc-green/10 rounded-lg">
                <FileText className="h-5 w-5 text-crc-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Object.keys(groupedContent).length}</p>
                <p className="text-xs text-muted-foreground">أقسام</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{admins.length || 1}</p>
                <p className="text-xs text-muted-foreground">مسؤولين</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              المسؤولين
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <CardTitle>محتوى الصفحة الرئيسية</CardTitle>
                </div>
                <CardDescription>قم بتعديل محتوى الصفحة الرئيسية من هنا</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={Object.keys(groupedContent)[0]} className="w-full">
                  <TabsList className="w-full flex-wrap h-auto gap-1 mb-4">
                    {Object.keys(groupedContent).map((section) => (
                      <TabsTrigger key={section} value={section} className="flex-1 min-w-fit">
                        {sectionNames[section] || section}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(groupedContent).map(([section, items]) => (
                    <TabsContent key={section} value={section} className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="font-medium text-sm">
                              {keyNames[item.content_key] || item.content_key}
                            </label>
                            <Button
                              size="sm"
                              onClick={() => handleSave(item.id)}
                              disabled={savingId === item.id || editedContent[item.id] === item.content_value}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              {savingId === item.id ? "جاري الحفظ..." : "حفظ"}
                            </Button>
                          </div>
                          {item.content_key.includes("description") || item.content_key.includes("subtitle") ? (
                            <Textarea
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              rows={4}
                              dir="auto"
                            />
                          ) : (
                            <Input
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              dir="auto"
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>إدارة المسؤولين</CardTitle>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        إضافة مسؤول
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>إضافة مسؤول جديد</DialogTitle>
                        <DialogDescription>
                          أدخل بيانات المسؤول الجديد
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>البريد الإلكتروني</Label>
                          <Input
                            type="email"
                            placeholder="admin@example.com"
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                            dir="ltr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>كلمة المرور</Label>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            dir="ltr"
                          />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleAddAdmin}
                          disabled={addingAdmin}
                        >
                          {addingAdmin ? "جاري الإضافة..." : "إضافة المسؤول"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>قم بإدارة مسؤولي الموقع من هنا</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAdmins ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {admins.map((admin) => (
                      <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{admin.email}</p>
                          <p className="text-xs text-muted-foreground">
                            تاريخ الإضافة: {new Date(admin.created_at).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        {admin.id !== user?.id && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
