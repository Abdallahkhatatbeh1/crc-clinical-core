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
  home: { name: "Home Page", icon: Home },
  about: { name: "About", icon: Info },
  services: { name: "Services", icon: Briefcase },
  studies: { name: "Studies", icon: FlaskConical },
  contact: { name: "Contact", icon: Phone },
  whyus: { name: "Why Us", icon: HelpCircle },
  global: { name: "Footer", icon: Globe },
};

const sectionNames: { [key: string]: string } = {
  hero: "Hero Section",
  who_we_are: "Who We Are",
  facilities: "Facilities Gallery",
  why_trust: "Why Trust Us",
  partners: "Partners",
  cta: "Call to Action",
  features: "Features",
  vision: "Vision",
  mission: "Mission",
  service1: "Service 1",
  service2: "Service 2",
  service3: "Service 3",
  info: "Contact Info",
  footer: "Footer",
  team: "Team",
  team_photo: "Team Photo",
  values: "Core Values",
  founder: "Founder",
  commitment: "Commitment",
  list: "Services List",
  areas: "Therapeutic Areas",
  services_list: "Services List",
  facilities_section: "Facilities Overview",
  gallery: "Facilities Gallery",
  therapeutic_areas: "Therapeutic Areas",
};

const keyNames: { [key: string]: string } = {
  // Hero Section
  title: "Title",
  title_highlight: "Title Highlight",
  title_suffix: "Title Suffix",
  subtitle: "Subtitle",
  description: "Description",
  badge: "Badge",
  button_text: "Button Text",
  trust_label: "Trust Label",
  trust_indicators: "Trust Indicators (comma separated)",
  
  // Who We Are
  tag: "Tag",
  highlight1: "Highlight 1",
  highlight2: "Highlight 2",
  highlight3: "Highlight 3",
  card1_text: "Card 1 Text",
  card2_text: "Card 2 Text",
  card3_text: "Card 3 Text",
  
  // Facilities
  facility1_title: "Facility 1 - Title",
  facility1_description: "Facility 1 - Description",
  facility2_title: "Facility 2 - Title",
  facility2_description: "Facility 2 - Description",
  facility3_title: "Facility 3 - Title",
  facility3_description: "Facility 3 - Description",
  facility4_title: "Facility 4 - Title",
  facility4_description: "Facility 4 - Description",
  facility5_title: "Facility 5 - Title",
  facility5_description: "Facility 5 - Description",
  facility6_title: "Facility 6 - Title",
  facility6_description: "Facility 6 - Description",
  
  // Why Trust
  card1_title: "Card 1 - Title",
  card1_subtitle: "Card 1 - Subtitle",
  card1_points: "Card 1 - Points (use | separator)",
  card2_title: "Card 2 - Title",
  card2_subtitle: "Card 2 - Subtitle",
  card2_points: "Card 2 - Points (use | separator)",
  card3_title: "Card 3 - Title",
  card3_subtitle: "Card 3 - Subtitle",
  card3_points: "Card 3 - Points (use | separator)",
  card4_title: "Card 4 - Title",
  card4_subtitle: "Card 4 - Subtitle",
  card4_points: "Card 4 - Points (use | separator)",
  
  // Partners
  cro_title: "CRO Section - Title",
  cro_description: "CRO Section - Description",
  pharma_tag: "Pharma Section - Tag",
  pharma_title: "Pharma Section - Title",
  pharma_description: "Pharma Section - Description",
  
  // CTA
  cta_text: "CTA Text",
  cta_primary: "Primary CTA",
  cta_secondary: "Secondary CTA",
  
  // Contact
  email: "Email",
  phone: "Phone",
  address: "Address",
  hours: "Working Hours",
  company_description: "Company Description",
  location: "Location",
  
  // General
  section_title: "Section Title",
  section_subtitle: "Section Subtitle",
  
  // Values (About page)
  value1_title: "Value 1 - Title",
  value1_description: "Value 1 - Description",
  value2_title: "Value 2 - Title",
  value2_description: "Value 2 - Description",
  value3_title: "Value 3 - Title",
  value3_description: "Value 3 - Description",
  value4_title: "Value 4 - Title",
  value4_description: "Value 4 - Description",
  value5_title: "Value 5 - Title",
  value5_description: "Value 5 - Description",
  
  // Founder section
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2",
  paragraph3: "Paragraph 3",
  highlight4: "Highlight 4",
  
  // Team section
  role1: "Role 1",
  role2: "Role 2",
  role3: "Role 3",
  role4: "Role 4",
  role5: "Role 5",
  role6: "Role 6",
  
  // Team Photo section
  photo_title: "Photo Title",
  photo_description: "Photo Description",
  stat4_value: "Stat 4 - Value",
  stat4_label: "Stat 4 - Label",
  
  // Commitment section
  item1: "Item 1",
  item2: "Item 2",
  item3: "Item 3",
  item4: "Item 4",
  item5: "Item 5",
  item6: "Item 6",
  cta_button: "CTA Button",
  
  // Services page
  description2: "Description 2",
  badge1: "Badge 1",
  badge2: "Badge 2",
  badge3: "Badge 3",
  service1_title: "Service 1 - Title",
  service1_description: "Service 1 - Description",
  service2_title: "Service 2 - Title",
  service2_description: "Service 2 - Description",
  service3_title: "Service 3 - Title",
  service3_description: "Service 3 - Description",
  service4_title: "Service 4 - Title",
  service4_description: "Service 4 - Description",
  service5_title: "Service 5 - Title",
  service5_description: "Service 5 - Description",
  service6_title: "Service 6 - Title",
  service6_description: "Service 6 - Description",
  service7_title: "Service 7 - Title",
  service7_description: "Service 7 - Description",
  service8_title: "Service 8 - Title",
  service8_description: "Service 8 - Description",
  service9_title: "Service 9 - Title",
  service9_description: "Service 9 - Description",
  facility1_name: "Facility 1 - Name",
  facility1_desc: "Facility 1 - Description",
  facility2_name: "Facility 2 - Name",
  facility2_desc: "Facility 2 - Description",
  facility3_name: "Facility 3 - Name",
  facility3_desc: "Facility 3 - Description",
  facility4_name: "Facility 4 - Name",
  facility4_desc: "Facility 4 - Description",
  facility5_name: "Facility 5 - Name",
  facility5_desc: "Facility 5 - Description",
  facility6_name: "Facility 6 - Name",
  facility6_desc: "Facility 6 - Description",
  feature1: "Feature 1",
  feature2: "Feature 2",
  feature3: "Feature 3",
  button_primary: "Primary Button",
  button_secondary: "Secondary Button",
  
  // Studies page
  description3: "Description 3",
  phase1_title: "Phase 1 - Title",
  phase1_desc: "Phase 1 - Description",
  phase2_title: "Phase 2 - Title",
  phase2_desc: "Phase 2 - Description",
  phase3_title: "Phase 3 - Title",
  phase3_desc: "Phase 3 - Description",
  phase4_title: "Phase 4 - Title",
  phase4_desc: "Phase 4 - Description",
  compliance1: "Compliance Badge 1",
  compliance2: "Compliance Badge 2",
  trust1: "Trust Point 1",
  trust2: "Trust Point 2",
  trust3: "Trust Point 3",
  // Vision & Mission
  vision_tag: "Vision Tag",
  vision_text: "Vision Text",
  mission_tag: "Mission Tag",
  mission_text: "Mission Text",
  
  // Features
  feature1_title: "Feature 1 - Title",
  feature1_description: "Feature 1 - Description",
  feature2_title: "Feature 2 - Title",
  feature2_description: "Feature 2 - Description",
  feature3_title: "Feature 3 - Title",
  feature3_description: "Feature 3 - Description",
  
  // Stats
  stat1_value: "Stat 1 - Value",
  stat1_label: "Stat 1 - Label",
  stat2_value: "Stat 2 - Value",
  stat2_label: "Stat 2 - Label",
  stat3_value: "Stat 3 - Value",
  stat3_label: "Stat 3 - Label",
  
  // Cards (deprecated)
  card1_description: "Card 1 - Description",
  card2_description: "Card 2 - Description",
  card3_description: "Card 3 - Description",
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

  const isLongField = (key: string) => {
    return key.includes("description") || 
           key.includes("subtitle") || 
           key.includes("address") || 
           key.includes("text") || 
           key.includes("points");
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Site Content</CardTitle>
            <CardDescription>Edit content for all pages</CardDescription>
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
                          {isLongField(item.content_key) ? (
                            <Textarea
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              rows={4}
                              className="bg-white border-border focus:border-primary resize-none"
                              placeholder={`Enter ${keyNames[item.content_key] || item.content_key}...`}
                            />
                          ) : (
                            <Input
                              value={editedContent[item.id] || ""}
                              onChange={(e) => setEditedContent({ ...editedContent, [item.id]: e.target.value })}
                              className="bg-white border-border focus:border-primary"
                              placeholder={`Enter ${keyNames[item.content_key] || item.content_key}...`}
                            />
                          )}
                          {item.content_key.includes("points") && (
                            <p className="text-xs text-muted-foreground">
                              Separate multiple points with the | character
                            </p>
                          )}
                          {item.content_key === "trust_indicators" && (
                            <p className="text-xs text-muted-foreground">
                              Separate company names with commas (e.g., IQVIA,Parexel,ICON)
                            </p>
                          )}
                          {item.content_key.includes("text") && item.content_key.includes("card") && (
                            <p className="text-xs text-muted-foreground">
                              Use {"<highlight>text</highlight>"} to highlight words
                            </p>
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
