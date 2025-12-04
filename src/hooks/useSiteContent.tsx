import { useState, useEffect, useCallback } from "react";
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

  const fetchContent = useCallback(async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("page", page)
      .order("section", { ascending: true });

    if (!error && data) {
      setContent(data);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

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

export const useAllSiteContent = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<string[]>([]);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("page", { ascending: true })
      .order("section", { ascending: true });

    if (!error && data) {
      setContent(data);
      const uniquePages = [...new Set(data.map(item => item.page))];
      setPages(uniquePages);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

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

  const getContentByPage = (page: string) => {
    return content.filter(item => item.page === page);
  };

  return { content, pages, isLoading, updateContent, refetch: fetchContent, getContentByPage };
};
