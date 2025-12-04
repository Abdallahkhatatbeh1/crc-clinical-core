import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllPageContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Save, Home, LayoutDashboard, FileText, Settings, Eye } from "lucide-react";
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

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { content, isLoading: contentLoading, updateContent, refetch } = useAllPageContent("home");
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
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
        </div>

        {/* Content Management */}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
