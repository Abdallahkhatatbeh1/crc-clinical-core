import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ImageItem {
  id: string;
  content_key: string;
  content_value: string | null;
  image_url: string | null;
}

interface ImageMap {
  [key: string]: {
    id: string;
    name: string;
    url: string | null;
  };
}

export const useSectionImages = (page: string, section: string) => {
  const [images, setImages] = useState<ImageMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("id, content_key, content_value, image_url")
      .eq("page", page)
      .eq("section", section)
      .eq("content_type", "image");

    if (!error && data) {
      const imageMap: ImageMap = {};
      (data as ImageItem[]).forEach((item) => {
        imageMap[item.content_key] = {
          id: item.id,
          name: item.content_value || "",
          url: item.image_url,
        };
      });
      setImages(imageMap);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page, section]);

  const updateImageUrl = async (id: string, imageUrl: string) => {
    const { error } = await supabase
      .from("site_content")
      .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      await fetchImages();
    }
    return { error };
  };

  const getImageUrl = (key: string, fallback: string): string => {
    return images[key]?.url || fallback;
  };

  return { images, isLoading, updateImageUrl, getImageUrl, refetch: fetchImages };
};
