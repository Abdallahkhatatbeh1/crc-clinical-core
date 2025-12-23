import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save, Home, Info, Briefcase, FlaskConical, Phone, HelpCircle, Globe, ImageIcon, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import ImageUploader from "./ImageUploader";

// Import fallback images
import patientRooms from "@/assets/facilities/patient-rooms.jpg";
import labEquipment from "@/assets/facilities/lab-equipment.jpg";
import ipPharmacyStorage from "@/assets/facilities/ip-pharmacy-storage.jpg";
import examinationRoom from "@/assets/facilities/examination-room.jpg";
import vitalSigns from "@/assets/facilities/vital-signs.jpg";
import coordinatorsOffices from "@/assets/facilities/coordinators-offices.jpg";
import labEquipment2 from "@/assets/facilities/lab-equipment-2.jpg";
import labEquipment3 from "@/assets/facilities/lab-equipment-3.jpg";
import labKitsStorage from "@/assets/facilities/lab-kits-storage.jpg";
import freezer70 from "@/assets/facilities/freezer-70.jpg";
import patientExamination from "@/assets/facilities/patient-examination.jpg";
import emergencyTrolley from "@/assets/facilities/emergency-trolley.jpg";
import procedureRoom from "@/assets/facilities/procedure-room.jpg";
import examinationEquipment from "@/assets/facilities/examination-equipment.jpg";
import ecgEquipment from "@/assets/facilities/ecg-equipment.jpg";
import teamPhotoNew from "@/assets/facilities/team-photo-new.jpg";
import iqviaLogo from "@/assets/partners/iqvia.png";
import parexelLogo from "@/assets/partners/parexel.png";
import syneosLogo from "@/assets/partners/syneos-health.svg";
import ppdLogo from "@/assets/partners/ppd.png";
import medpaceLogo from "@/assets/partners/medpace.png";
import labcorpLogo from "@/assets/partners/labcorp.png";
import psiLogo from "@/assets/partners/psi.png";
import mctLogo from "@/assets/partners/mct.png";
import iconLogo from "@/assets/partners/icon.png";
import sareptaLogo from "@/assets/partners/sarepta.png";
import newAmsterdamLogo from "@/assets/partners/new-amsterdam-pharma.png";
import argenxLogo from "@/assets/partners/argenx.png";
import immunicLogo from "@/assets/partners/immunic.png";
import johnsonLogo from "@/assets/partners/johnson-johnson.png";

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
  session: Session | null;
}

// Fallback images mapping
const fallbackImages: { [key: string]: string } = {
  // Home facilities
  facility1_image: patientRooms,
  facility2_image: labEquipment,
  facility3_image: ipPharmacyStorage,
  facility4_image: examinationRoom,
  facility5_image: vitalSigns,
  facility6_image: coordinatorsOffices,
  // Services gallery
  gallery_image1: patientRooms,
  gallery_image2: patientExamination,
  gallery_image3: examinationRoom,
  gallery_image4: procedureRoom,
  gallery_image5: labEquipment,
  gallery_image6: labEquipment2,
  gallery_image7: labEquipment3,
  gallery_image8: vitalSigns,
  gallery_image9: ecgEquipment,
  gallery_image10: examinationEquipment,
  gallery_image11: ipPharmacyStorage,
  gallery_image12: freezer70,
  gallery_image13: labKitsStorage,
  gallery_image14: emergencyTrolley,
  gallery_image15: coordinatorsOffices,
  gallery_image16: teamPhotoNew,
  // About team
  team_image: teamPhotoNew,
  // Partner logos
  cro_logo1: iqviaLogo,
  cro_logo2: parexelLogo,
  cro_logo3: syneosLogo,
  cro_logo4: iconLogo,
  cro_logo5: ppdLogo,
  cro_logo6: labcorpLogo,
  cro_logo7: medpaceLogo,
  cro_logo8: psiLogo,
  cro_logo9: mctLogo,
  pharma_logo1: johnsonLogo,
  pharma_logo2: newAmsterdamLogo,
  pharma_logo3: sareptaLogo,
  pharma_logo4: argenxLogo,
  pharma_logo5: immunicLogo,
};

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
  info: "Contact Info",
  footer: "Footer",
  team: "Team",
  team_photo: "Team Photo",
  values: "Core Values",
  founder: "Founder",
  commitment: "Commitment",
  services_list: "Services List",
  facilities_section: "Facilities Overview",
  gallery: "Facilities Gallery",
  therapeutic_areas: "Therapeutic Areas",
  form: "Contact Form",
  join_team: "Join Team",
  video: "Video Section",
};

const keyNames: { [key: string]: string } = {
  title: "Title",
  title_highlight: "Title Highlight",
  title_suffix: "Title Suffix",
  subtitle: "Subtitle",
  description: "Description",
  badge: "Badge",
  button_text: "Button Text",
  trust_label: "Trust Label",
  trust_indicators: "Trust Indicators",
  tag: "Tag",
  highlight1: "Highlight 1",
  highlight2: "Highlight 2",
  highlight3: "Highlight 3",
  card1_text: "Card 1 Text",
  card2_text: "Card 2 Text",
  card3_text: "Card 3 Text",
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
  card1_title: "Card 1 - Title",
  card1_subtitle: "Card 1 - Subtitle",
  card1_points: "Card 1 - Points",
  card2_title: "Card 2 - Title",
  card2_subtitle: "Card 2 - Subtitle",
  card2_points: "Card 2 - Points",
  card3_title: "Card 3 - Title",
  card3_subtitle: "Card 3 - Subtitle",
  card3_points: "Card 3 - Points",
  card4_title: "Card 4 - Title",
  card4_subtitle: "Card 4 - Subtitle",
  card4_points: "Card 4 - Points",
  cro_description: "CRO Description",
  pharma_tag: "Pharma Tag",
  pharma_description: "Pharma Description",
  cta_text: "CTA Text",
  cta_primary: "Primary CTA",
  cta_secondary: "Secondary CTA",
  email: "Email",
  phone: "Phone",
  address: "Address",
  hours: "Working Hours",
  company_description: "Company Description",
  location: "Location",
  section_title: "Section Title",
  section_subtitle: "Section Subtitle",
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
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2",
  paragraph3: "Paragraph 3",
  highlight4: "Highlight 4",
  photo_title: "Photo Title",
  photo_description: "Photo Description",
  stat1_value: "Stat 1 - Value",
  stat1_label: "Stat 1 - Label",
  stat2_value: "Stat 2 - Value",
  stat2_label: "Stat 2 - Label",
  stat3_value: "Stat 3 - Value",
  stat3_label: "Stat 3 - Label",
  stat4_value: "Stat 4 - Value",
  stat4_label: "Stat 4 - Label",
  item1: "Item 1",
  item2: "Item 2",
  item3: "Item 3",
  item4: "Item 4",
  item5: "Item 5",
  item6: "Item 6",
  cta_button: "CTA Button",
  description2: "Description 2",
  badge1: "Badge 1",
  badge2: "Badge 2",
  badge3: "Badge 3",
  feature1: "Feature 1",
  feature2: "Feature 2",
  feature3: "Feature 3",
  button_primary: "Primary Button",
  button_secondary: "Secondary Button",
  trust_badge1: "Trust Badge 1",
  trust_badge2: "Trust Badge 2",
  trust_badge3: "Trust Badge 3",
  location_badge: "Location Badge",
  video_url: "Video URL",
  cro_title: "CRO Title",
  cro_subtitle: "CRO Subtitle",
  cro_partners: "CRO Partners",
  pharma_title: "Pharma Title",
  pharma_subtitle: "Pharma Subtitle",
  pharma_sponsors: "Pharma Sponsors",
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
};

const ContentEditor = ({ content, pages, updateContent, session }: ContentEditorProps) => {
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activePageTab, setActivePageTab] = useState("home");
  const [imageItems, setImageItems] = useState<ContentItem[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const initial: { [key: string]: string } = {};
    content.forEach((item) => {
      initial[item.id] = item.content_value || "";
    });
    setEditedContent(initial);
  }, [content]);

  // Fetch image content items
  const fetchImageItems = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("content_type", "image");
    
    if (!error && data) {
      setImageItems(data as ContentItem[]);
    }
  };

  useEffect(() => {
    fetchImageItems();
  }, [refreshKey]);

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
    return content.filter(item => item.page === page && item.content_type !== "image");
  };

  const getPageImages = (page: string, section: string) => {
    return imageItems.filter(item => item.page === page && item.section === section);
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

  const handleImageUpdated = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Image Grid Component for sections with images
  const SectionImageGrid = ({ page, section }: { page: string; section: string }) => {
    const sectionImages = getPageImages(page, section);
    
    if (sectionImages.length === 0) return null;

    return (
      <div className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Section Images</h4>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {sectionImages.length} images
            </span>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleImageUpdated}
            className="text-muted-foreground"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Click on any image to replace it. Custom images will be saved and shown on the website.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sectionImages.map((image) => (
            <ImageUploader
              key={image.id}
              imageId={image.id}
              imageName={image.content_value || image.content_key}
              currentUrl={image.image_url}
              fallbackUrl={fallbackImages[image.content_key] || ""}
              onImageUpdated={handleImageUpdated}
            />
          ))}
        </div>
      </div>
    );
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
            <CardDescription>Edit text content and replace section images</CardDescription>
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
                    {Object.keys(groupedContent).map((section) => {
                      const hasImages = getPageImages(page, section).length > 0;
                      return (
                        <TabsTrigger 
                          key={section} 
                          value={section} 
                          className="flex-1 min-w-fit flex items-center gap-1.5"
                        >
                          {hasImages && <ImageIcon className="h-3 w-3 text-primary" />}
                          {sectionNames[section] || section}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {Object.entries(groupedContent).map(([section, items]) => (
                    <TabsContent key={section} value={section} className="space-y-4">
                      {/* Section Images Grid */}
                      <SectionImageGrid page={page} section={section} />

                      {/* Content Fields */}
                      <div className="space-y-4">
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
                                Separate company names with commas
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
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
