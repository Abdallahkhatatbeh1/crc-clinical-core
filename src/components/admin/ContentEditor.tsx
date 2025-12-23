import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save, Home, Info, Briefcase, FlaskConical, Phone, HelpCircle, Globe, Image, Upload, X, Copy, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

// Import facility images for preview
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

// Import partner logos
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

// Section images mapping
const sectionImages: { [page: string]: { [section: string]: { name: string; src: string; description: string }[] } } = {
  home: {
    facilities: [
      { name: "Patient Rooms", src: patientRooms, description: "Dedicated patient care rooms" },
      { name: "Lab Equipment", src: labEquipment, description: "Laboratory instruments" },
      { name: "IP Pharmacy Storage", src: ipPharmacyStorage, description: "Secure storage" },
      { name: "Examination Room", src: examinationRoom, description: "Patient assessment" },
      { name: "Vital Signs Monitor", src: vitalSigns, description: "Monitoring systems" },
      { name: "Coordinators Offices", src: coordinatorsOffices, description: "Research workspace" },
    ],
    partners: [
      { name: "IQVIA", src: iqviaLogo, description: "CRO Partner" },
      { name: "Parexel", src: parexelLogo, description: "CRO Partner" },
      { name: "Syneos Health", src: syneosLogo, description: "CRO Partner" },
      { name: "ICON", src: iconLogo, description: "CRO Partner" },
      { name: "PPD", src: ppdLogo, description: "CRO Partner" },
      { name: "Labcorp", src: labcorpLogo, description: "CRO Partner" },
      { name: "Medpace", src: medpaceLogo, description: "CRO Partner" },
      { name: "PSI", src: psiLogo, description: "CRO Partner" },
      { name: "MCT", src: mctLogo, description: "CRO Partner" },
      { name: "Johnson & Johnson", src: johnsonLogo, description: "Pharma Partner" },
      { name: "New Amsterdam Pharma", src: newAmsterdamLogo, description: "Pharma Partner" },
      { name: "Sarepta", src: sareptaLogo, description: "Pharma Partner" },
      { name: "Argenx", src: argenxLogo, description: "Pharma Partner" },
      { name: "Immunic", src: immunicLogo, description: "Pharma Partner" },
    ],
  },
  services: {
    gallery: [
      { name: "Patient Rooms", src: patientRooms, description: "Clinical Care" },
      { name: "Patient Examination", src: patientExamination, description: "Clinical Care" },
      { name: "Examination Room", src: examinationRoom, description: "Patient Rooms" },
      { name: "Procedure Room", src: procedureRoom, description: "Patient Rooms" },
      { name: "Lab Centrifuge", src: labEquipment, description: "Laboratory" },
      { name: "Lab Equipment MPW", src: labEquipment2, description: "Laboratory" },
      { name: "Lab Centrifuge LC-04L", src: labEquipment3, description: "Laboratory" },
      { name: "Vital Signs Monitor", src: vitalSigns, description: "Monitoring" },
      { name: "ECG Equipment", src: ecgEquipment, description: "Medical Equipment" },
      { name: "Examination Equipment", src: examinationEquipment, description: "Medical Equipment" },
      { name: "IP Pharmacy Storage", src: ipPharmacyStorage, description: "Storage" },
      { name: "-70°C Freezer", src: freezer70, description: "Storage" },
      { name: "Lab Kits Storage", src: labKitsStorage, description: "Storage" },
      { name: "Emergency Trolley", src: emergencyTrolley, description: "Equipment" },
      { name: "Coordinators Offices", src: coordinatorsOffices, description: "Administration" },
      { name: "Our Team", src: teamPhotoNew, description: "Team" },
    ],
  },
  about: {
    team_photo: [
      { name: "Team Photo", src: teamPhotoNew, description: "CRC Team" },
    ],
  },
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
  trust_indicators: "Trust Indicators (comma separated)",
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
  cro_description: "CRO Section - Description",
  pharma_tag: "Pharma Section - Tag",
  pharma_description: "Pharma Section - Description",
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
  role1: "Role 1",
  role2: "Role 2",
  role3: "Role 3",
  role4: "Role 4",
  role5: "Role 5",
  role6: "Role 6",
  photo_title: "Photo Title",
  photo_description: "Photo Description",
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
  vision_tag: "Vision Tag",
  vision_text: "Vision Text",
  mission_tag: "Mission Tag",
  mission_text: "Mission Text",
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
  stat1_value: "Stat 1 - Value",
  stat1_label: "Stat 1 - Label",
  stat2_value: "Stat 2 - Value",
  stat2_label: "Stat 2 - Label",
  stat3_value: "Stat 3 - Value",
  stat3_label: "Stat 3 - Label",
  trust_badge1: "Trust Badge 1",
  trust_badge2: "Trust Badge 2",
  trust_badge3: "Trust Badge 3",
  location_badge: "Location Badge",
  video_url: "Video URL",
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
  card1_description: "Card 1 - Description",
  card2_description: "Card 2 - Description",
  card3_description: "Card 3 - Description",
};

const ContentEditor = ({ content, pages, updateContent, session }: ContentEditorProps) => {
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activePageTab, setActivePageTab] = useState("home");
  const [uploadedImages, setUploadedImages] = useState<SiteImage[]>([]);
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

  // Fetch uploaded images from storage
  const fetchUploadedImages = async () => {
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
      setUploadedImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoadingImages(false);
  };

  useEffect(() => {
    if (session) {
      fetchUploadedImages();
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
      fetchUploadedImages();
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

  const handleDeleteUploadedImage = async (imageName: string) => {
    try {
      const { error } = await supabase.storage.from('site-images').remove([imageName]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      fetchUploadedImages();
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

  // Get section images for current page/section
  const getSectionImages = (page: string, section: string) => {
    return sectionImages[page]?.[section] || [];
  };

  // Section Images Preview Component
  const SectionImagesPreview = ({ page, section }: { page: string; section: string }) => {
    const images = getSectionImages(page, section);
    
    if (images.length === 0) return null;

    return (
      <div className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Section Images</h4>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {images.length} images
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          These images are currently displayed in this section. To replace them, update the source files in the project.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative rounded-lg overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square">
                <img 
                  src={image.src} 
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-xs font-medium truncate">{image.name}</p>
                  <p className="text-white/70 text-[10px] truncate">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Uploaded Images Manager Component
  const UploadedImagesManager = () => (
    <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Uploaded Images</h4>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Storage
          </span>
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

      <p className="text-sm text-muted-foreground mb-4">
        Upload custom images here. You can use the URL in content fields or reference them in the code.
      </p>

      {loadingImages ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : uploadedImages.length === 0 ? (
        <div className="text-center py-8 bg-white/50 rounded-lg border border-dashed border-border">
          <Image className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground text-sm">No images uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {uploadedImages.map((image) => (
            <div key={image.name} className="group relative rounded-lg overflow-hidden border border-border bg-white shadow-sm">
              <div className="aspect-square">
                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
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
                  onClick={() => handleDeleteUploadedImage(image.name)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="p-1.5 bg-white">
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
            <CardDescription>Edit content and view section images for all pages</CardDescription>
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
                        className="flex-1 min-w-fit flex items-center gap-1.5"
                      >
                        {getSectionImages(page, section).length > 0 && (
                          <ImageIcon className="h-3 w-3 text-primary" />
                        )}
                        {sectionNames[section] || section}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(groupedContent).map(([section, items]) => (
                    <TabsContent key={section} value={section} className="space-y-4">
                      {/* Section Images Preview */}
                      <SectionImagesPreview page={page} section={section} />

                      {/* Uploaded Images Manager (show only in relevant sections) */}
                      {(section === "facilities" || section === "gallery" || section === "partners") && (
                        <UploadedImagesManager />
                      )}

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
                                Separate company names with commas (e.g., IQVIA,Parexel,ICON)
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
