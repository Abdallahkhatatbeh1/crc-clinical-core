import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link2, Save, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

interface LinkItem {
  key: string;
  label: string;
  value: string;
  originalValue: string;
}

const LinksManager = () => {
  const { content: headerContent, isLoading: headerLoading } = useSiteContent('global', 'header');
  const { content: footerContent, isLoading: footerLoading } = useSiteContent('global', 'footer');
  const { content: ctaContent, isLoading: ctaLoading } = useSiteContent('home', 'cta');
  const { content: heroContent, isLoading: heroLoading } = useSiteContent('home', 'hero');
  const { content: videoContent, isLoading: videoLoading } = useSiteContent('whyus', 'video');
  
  const [headerLinks, setHeaderLinks] = useState<LinkItem[]>([]);
  const [footerLinks, setFooterLinks] = useState<LinkItem[]>([]);
  const [ctaLinks, setCTALinks] = useState<LinkItem[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!headerLoading && headerContent) {
      const links: LinkItem[] = [];
      for (let i = 1; i <= 6; i++) {
        const textKey = `nav_link${i}_text`;
        const urlKey = `nav_link${i}_url`;
        if (headerContent[textKey] || headerContent[urlKey]) {
          links.push({
            key: `nav_link${i}`,
            label: headerContent[textKey] || `Link ${i}`,
            value: headerContent[urlKey] || '',
            originalValue: headerContent[urlKey] || '',
          });
        }
      }
      links.push({
        key: 'cta_button',
        label: headerContent['cta_button_text'] || 'Get Started',
        value: headerContent['cta_button_url'] || '',
        originalValue: headerContent['cta_button_url'] || '',
      });
      setHeaderLinks(links);
    }
  }, [headerContent, headerLoading]);

  useEffect(() => {
    if (!footerLoading && footerContent) {
      const links: LinkItem[] = [];
      // Company links
      for (let i = 1; i <= 3; i++) {
        const textKey = `company_link${i}_text`;
        const urlKey = `company_link${i}_url`;
        if (footerContent[textKey]) {
          links.push({
            key: `company_link${i}`,
            label: `Company: ${footerContent[textKey]}`,
            value: footerContent[urlKey] || '',
            originalValue: footerContent[urlKey] || '',
          });
        }
      }
      // Services links
      for (let i = 1; i <= 3; i++) {
        const textKey = `services_link${i}_text`;
        const urlKey = `services_link${i}_url`;
        if (footerContent[textKey]) {
          links.push({
            key: `services_link${i}`,
            label: `Services: ${footerContent[textKey]}`,
            value: footerContent[urlKey] || '',
            originalValue: footerContent[urlKey] || '',
          });
        }
      }
      // Resources links
      for (let i = 1; i <= 2; i++) {
        const textKey = `resources_link${i}_text`;
        const urlKey = `resources_link${i}_url`;
        if (footerContent[textKey]) {
          links.push({
            key: `resources_link${i}`,
            label: `Resources: ${footerContent[textKey]}`,
            value: footerContent[urlKey] || '',
            originalValue: footerContent[urlKey] || '',
          });
        }
      }
      setFooterLinks(links);
    }
  }, [footerContent, footerLoading]);

  useEffect(() => {
    const links: LinkItem[] = [];
    
    if (!ctaLoading && ctaContent) {
      links.push({
        key: 'home_cta_button',
        label: 'Home CTA Button',
        value: ctaContent['button_url'] || '',
        originalValue: ctaContent['button_url'] || '',
      });
    }
    
    if (!heroLoading && heroContent) {
      links.push({
        key: 'home_hero_button',
        label: 'Home Hero Button',
        value: heroContent['button_url'] || '',
        originalValue: heroContent['button_url'] || '',
      });
    }
    
    if (!videoLoading && videoContent) {
      links.push({
        key: 'calendly_url',
        label: 'Calendly URL',
        value: videoContent['calendly_url'] || '',
        originalValue: videoContent['calendly_url'] || '',
      });
    }
    
    setCTALinks(links);
  }, [ctaContent, ctaLoading, heroContent, heroLoading, videoContent, videoLoading]);

  const handleSave = async (section: string, contentKey: string, value: string) => {
    setSaving(contentKey);
    
    let page = 'global';
    let sectionName = section;
    let key = contentKey;
    
    if (contentKey === 'home_cta_button') {
      page = 'home';
      sectionName = 'cta';
      key = 'button_url';
    } else if (contentKey === 'home_hero_button') {
      page = 'home';
      sectionName = 'hero';
      key = 'button_url';
    } else if (contentKey === 'calendly_url') {
      page = 'whyus';
      sectionName = 'video';
      key = 'calendly_url';
    } else if (contentKey.startsWith('nav_link') || contentKey === 'cta_button') {
      sectionName = 'header';
      key = contentKey + '_url';
    } else {
      sectionName = 'footer';
      key = contentKey + '_url';
    }
    
    const { error } = await supabase
      .from('site_content')
      .update({ content_value: value })
      .eq('page', page)
      .eq('section', sectionName)
      .eq('content_key', key);

    if (error) {
      toast({ title: "خطأ في حفظ الرابط", variant: "destructive" });
    } else {
      toast({ title: "تم حفظ الرابط بنجاح" });
    }
    setSaving(null);
  };

  const isLoading = headerLoading || footerLoading || ctaLoading || heroLoading || videoLoading;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  const renderLinksList = (links: LinkItem[], section: string, title: string, description: string) => (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {links.map((link) => (
        <div
          key={link.key}
          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border"
        >
          <div className="flex items-center gap-2 min-w-[180px]">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{link.label}</span>
          </div>
          
          <Input
            value={link.value}
            onChange={(e) => {
              const updateFn = section === 'header' ? setHeaderLinks : 
                               section === 'footer' ? setFooterLinks : setCTALinks;
              updateFn(prev => prev.map(l => l.key === link.key ? { ...l, value: e.target.value } : l));
            }}
            className="flex-1 bg-background"
            placeholder="أدخل الرابط..."
          />
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSave(section, link.key, link.value)}
            disabled={saving === link.key || link.value === link.originalValue}
          >
            {saving === link.key ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
          
          {link.value && (
            <a href={link.value} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          إدارة الروابط
        </CardTitle>
        <CardDescription>
          عدّل روابط الهيدر والفوتر وأزرار CTA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {renderLinksList(headerLinks, 'header', 'روابط الهيدر', 'روابط قائمة التنقل العلوية')}
        {renderLinksList(footerLinks, 'footer', 'روابط الفوتر', 'روابط قوائم الفوتر')}
        {renderLinksList(ctaLinks, 'cta', 'روابط CTA', 'روابط أزرار الدعوة للإجراء ورابط Calendly')}
      </CardContent>
    </Card>
  );
};

export default LinksManager;