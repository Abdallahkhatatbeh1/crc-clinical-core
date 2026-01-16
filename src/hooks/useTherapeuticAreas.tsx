import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TherapeuticArea {
  id: string;
  title: string;
  short_title: string;
  conditions: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTherapeuticAreas = () => {
  const [areas, setAreas] = useState<TherapeuticArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAreas = useCallback(async () => {
    const { data, error } = await supabase
      .from("therapeutic_areas")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data) {
      setAreas(data as TherapeuticArea[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  return { areas, isLoading, refetch: fetchAreas };
};

export const useAllTherapeuticAreas = () => {
  const [areas, setAreas] = useState<TherapeuticArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAreas = useCallback(async () => {
    const { data, error } = await supabase
      .from("therapeutic_areas")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setAreas(data as TherapeuticArea[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  const addArea = async (area: Omit<TherapeuticArea, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from("therapeutic_areas")
      .insert(area)
      .select()
      .single();

    if (!error && data) {
      setAreas(prev => [...prev, data as TherapeuticArea]);
    }
    return { data, error };
  };

  const updateArea = async (id: string, updates: Partial<TherapeuticArea>) => {
    const { error } = await supabase
      .from("therapeutic_areas")
      .update(updates)
      .eq("id", id);

    if (!error) {
      setAreas(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }
    return { error };
  };

  const deleteArea = async (id: string) => {
    const { error } = await supabase
      .from("therapeutic_areas")
      .delete()
      .eq("id", id);

    if (!error) {
      setAreas(prev => prev.filter(a => a.id !== id));
    }
    return { error };
  };

  return { areas, isLoading, refetch: fetchAreas, addArea, updateArea, deleteArea };
};
