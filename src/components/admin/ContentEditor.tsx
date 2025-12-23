import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save, Home, Info, Briefcase, FlaskConical, Phone, HelpCircle, Globe } from "lucide-react";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  image_url: string | null;
}

interface ContentEditorProps {
  content: ContentItem[];
  pages: string[];
  updateContent: (id: string, newValue: string) => Promise<{ error: unknown }>;
}

const pageNames: { [key: string]: { name: string; icon: React.ElementType } } = {
  home: { name: "الصفحة الرئيسية", icon: Home },
  about: { name: "من نحن", icon: Info },
  services: { name: "الخدمات", icon: Briefcase },
  studies: { name: "الدراسات", icon: FlaskConical },
  contact: { name: "تواصل معنا", icon: Phone },
  whyus: { name: "لماذا نحن", icon: HelpCircle },
  global: { name: "Footer", icon: Globe },
};

const sectionNames: { [key: string]: string } = {
  hero: "Hero Section",
  who_we_are: "من نحن",
  features: "الميزات",
  cta: "Call to Action",
  vision: "الرؤية",
  mission: "الرسالة",
  service1: "الخدمة 1",
  service2: "الخدمة 2",
  service3: "الخدمة 3",
  info: "معلومات التواصل",
  footer: "Footer",
  team: "الفريق",
  values: "القيم",
  list: "قائمة الخدمات",
  areas: "المجالات العلاجية",
};

const keyNames: { [key: string]: string } = {
  title: "العنوان",
  title_highlight: "العنوان المميز",
  title_suffix: "نهاية العنوان",
  subtitle: "العنوان الفرعي",
  description: "الوصف",
  badge: "Badge",
  cta_text: "نص الزر",
  cta_primary: "الزر الرئيسي",
  cta_secondary: "الزر الثانوي",
  button_text: "نص الزر",
  tag: "Tag",
  location: "الموقع",
  trust_label: "Trust Label",
  stat1_value: "الإحصائية 1 - القيمة",
  stat1_label: "الإحصائية 1 - العنوان",
  stat2_value: "الإحصائية 2 - القيمة",
  stat2_label: "الإحصائية 2 - العنوان",
  stat3_value: "الإحصائية 3 - القيمة",
  stat3_label: "الإحصائية 3 - العنوان",
  card1_title: "البطاقة 1 - العنوان",
  card1_description: "البطاقة 1 - الوصف",
  card2_title: "البطاقة 2 - العنوان",
  card2_description: "البطاقة 2 - الوصف",
  card3_title: "البطاقة 3 - العنوان",
  card3_description: "البطاقة 3 - الوصف",
  feature1_title: "الميزة 1 - العنوان",
  feature1_description: "الميزة 1 - الوصف",
  feature2_title: "الميزة 2 - العنوان",
  feature2_description: "الميزة 2 - الوصف",
  feature3_title: "الميزة 3 - العنوان",
  feature3_description: "الميزة 3 - الوصف",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  address: "العنوان",
  hours: "ساعات العمل",
  company_description: "وصف الشركة",
  section_title: "عنوان القسم",
  section_subtitle: "العنوان الفرعي للقسم",
  value1_title: "القيمة 1 - العنوان",
  value1_description: "القيمة 1 - الوصف",
  value2_title: "القيمة 2 - العنوان",
  value2_description: "القيمة 2 - الوصف",
  value3_title: "القيمة 3 - العنوان",
  value3_description: "القيمة 3 - الوصف",
  vision_tag: "Vision Tag",
  vision_text: "نص الرؤية",
  mission_tag: "Mission Tag",
  mission_text: "نص الرسالة",
};

const ContentEditor = ({ content, pages, updateContent }: ContentEditorProps) => {
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activePageTab, setActivePageTab] = useState("home");
  const { toast } = useToast();

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
        description: "فشل في حفظ التغييرات",
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

  const getPageContent = (page: string) => {
    return content.filter(item => item.page === page);
  };

  const groupContentBySections = (pageContent: ContentItem[]) => {
    return pageContent.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {} as { [key: string]: ContentItem[] });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>محتوى الموقع</CardTitle>
            <CardDescription>تعديل محتوى جميع الصفحات</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
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
                                  جاري الحفظ...
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4 mr-2" />
                                  حفظ
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
  );
};

export default ContentEditor;
