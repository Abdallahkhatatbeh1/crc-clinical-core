import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save, Home, Info, Briefcase, FlaskConical, Phone, HelpCircle, Globe, Image, Upload, X, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  image_url: string | null;
}

interface SiteImage {
  name: string;
  url: string;
}

interface ContentEditorProps {
  content: ContentItem[];
  pages: string[];
  updateContent: (id: string, newValue: string) => Promise<{ error: unknown }>;
  session: Session | null;
}

const pageNames: { [key: string]: { name: string; icon: React.ElementType } } = {
  home: { name: "Home", icon: Home },
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
  form: "Contact Form",
  join_team: "Join Team",
  video: "Video Section",
  images: "Section Images",
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
  cro_description: "CRO Section - Description",
  pharma_tag: "Pharma Section - Tag",
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
  
  // Contact page
  card1_label: "Card 1 - Label",
  card2_label: "Card 2 - Label",
  card3_label: "Card 3 - Label",
  card4_label: "Card 4 - Label",
  email_label: "Email Label",
  location_detail: "Location Detail",
  location_label: "Location Label",
  form_title: "Form Title",
  submit_button: "Submit Button",
  success_title: "Success Title",
  success_message: "Success Message",
  position1_title: "Position 1 - Title",
  position1_desc: "Position 1 - Description",
  position2_title: "Position 2 - Title",
  position2_desc: "Position 2 - Description",
  position3_title: "Position 3 - Title",
  position3_desc: "Position 3 - Description",
  position4_title: "Position 4 - Title",
  position4_desc: "Position 4 - Description",
  position5_title: "Position 5 - Title",
  position5_desc: "Position 5 - Description",
  position6_title: "Position 6 - Title",
  position6_desc: "Position 6 - Description",
  button_subtitle: "Button Subtitle",
  
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
  feature4_title: "Feature 4 - Title",
  feature4_description: "Feature 4 - Description",
  feature5_title: "Feature 5 - Title",
  feature5_description: "Feature 5 - Description",
  feature6_title: "Feature 6 - Title",
  feature6_description: "Feature 6 - Description",
  bottom_text: "Bottom Text",
  
  // Stats
  stat1_value: "Stat 1 - Value",
  stat1_label: "Stat 1 - Label",
  stat2_value: "Stat 2 - Value",
  stat2_label: "Stat 2 - Label",
  stat3_value: "Stat 3 - Value",
  stat3_label: "Stat 3 - Label",
  
  // Why Us Hero
  trust_badge1: "Trust Badge 1",
  trust_badge2: "Trust Badge 2",
  trust_badge3: "Trust Badge 3",
  location_badge: "Location Badge",
  
  // Why Us Video
  video_url: "Video URL",
  
  // Why Us Partners
  cro_title: "CRO Title",
  cro_subtitle: "CRO Subtitle",
  cro_partners: "CRO Partners (comma separated)",
  cro_capabilities_label: "CRO Capabilities Label",
  cro_capability1: "CRO Capability 1",
  cro_capability2: "CRO Capability 2",
  cro_capability3: "CRO Capability 3",
  cro_capability4: "CRO Capability 4",
  pharma_title: "Pharma Title",
  pharma_subtitle: "Pharma Subtitle",
  pharma_sponsors: "Pharma Sponsors (comma separated)",
  pharma_demo_label: "Pharma Demo Label",
  pharma_demo1: "Pharma Demo 1",
  pharma_demo2: "Pharma Demo 2",
  pharma_demo3: "Pharma Demo 3",
  pharma_demo4: "Pharma Demo 4",
  
  // Cards
  card1_description: "Card 1 - Description",
  card2_description: "Card 2 - Description",
  card3_description: "Card 3 - Description",
};

const ContentEditor = ({ content, pages, updateContent, session }: ContentEditorProps) => {
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activePageTab, setActivePageTab] = useState("home");
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initial: { [key: string]: string } = {};
    content.forEach((item) => {
      initial[item.id] = item.content_value || "";
    });
    setEditedContent(initial);
  }, [content]);

  // Fetch images
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

  useEffect(() => {
    if (session) {
      fetchImages();
    }
  }, [session]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', 'site');

      const { error } = await supabase.functions.invoke('upload-image', {
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

  // Image Gallery Component
  const ImageGallery = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Uploaded Images</h3>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploadingImage}
          />
          <Button asChild size="sm" disabled={uploadingImage}>
            <span>
              {uploadingImage ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </span>
          </Button>
        </label>
      </div>

      {loadingImages ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : siteImages.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-xl">
          <Image className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground text-sm">No images uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {siteImages.map((image) => (
            <div key={image.name} className="relative group rounded-lg overflow-hidden border border-border bg-muted/30">
              <img 
                src={image.url} 
                alt={image.name}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 px-2 text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText(image.url);
                    toast({ title: "Copied", description: "Image URL copied" });
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 px-2"
                  onClick={() => handleDeleteImage(image.name)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="p-1.5">
                <p className="text-xs text-muted-foreground truncate">{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Site Content</CardTitle>
            <CardDescription>Edit content and manage images for all pages</CardDescription>
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
            const sectionKeys = [...Object.keys(groupedContent), "images"];

            return (
              <TabsContent key={page} value={page}>
                <Tabs defaultValue={Object.keys(groupedContent)[0]} className="w-full">
                  <TabsList className="w-full flex-wrap h-auto gap-2 mb-6 bg-white p-2 border">
                    {sectionKeys.map((section) => (
                      <TabsTrigger 
                        key={section} 
                        value={section} 
                        className="flex-1 min-w-fit flex items-center gap-1.5"
                      >
                        {section === "images" && <Image className="h-3.5 w-3.5" />}
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

                  {/* Images Tab for each page */}
                  <TabsContent value="images" className="bg-muted/30 rounded-xl p-5">
                    <ImageGallery />
                  </TabsContent>
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
