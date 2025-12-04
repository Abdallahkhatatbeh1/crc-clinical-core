import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  image_url: string | null;
}

interface ContentMap {
  [key: string]: string;
}

export const useSiteContent = (page: string, section: string) => {
  const [content, setContent] = useState<ContentMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page)
        .eq("section", section);

      if (!error && data) {
        const contentMap: ContentMap = {};
        data.forEach((item: ContentItem) => {
          contentMap[item.content_key] = item.content_value || "";
        });
        setContent(contentMap);
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [page, section]);

  return { content, isLoading };
};

export const useAllPageContent = (page: string) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("page", page)
      .order("section", { ascending: true });

    if (!error && data) {
      setContent(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [page]);

  const updateContent = async (id: string, newValue: string) => {
    const { error } = await supabase
      .from("site_content")
      .update({ content_value: newValue })
      .eq("id", id);

    if (!error) {
      setContent(prev => 
        prev.map(item => 
          item.id === id ? { ...item, content_value: newValue } : item
        )
      );
    }
    return { error };
  };

  return { content, isLoading, updateContent, refetch: fetchContent };
};
