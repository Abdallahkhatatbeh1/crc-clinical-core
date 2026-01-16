import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  category: 'cro' | 'pharma';
  display_order: number;
  is_active: boolean;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export const usePartners = (category?: 'cro' | 'pharma') => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartners = useCallback(async () => {
    let query = supabase
      .from("partners")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (!error && data) {
      setPartners(data as Partner[]);
    }
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  return { partners, isLoading, refetch: fetchPartners };
};

export const useAllPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });

    if (!error && data) {
      setPartners(data as Partner[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const addPartner = async (partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from("partners")
      .insert(partner)
      .select()
      .single();

    if (!error && data) {
      setPartners(prev => [...prev, data as Partner]);
    }
    return { data, error };
  };

  const updatePartner = async (id: string, updates: Partial<Partner>) => {
    const { error } = await supabase
      .from("partners")
      .update(updates)
      .eq("id", id);

    if (!error) {
      setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
    return { error };
  };

  const deletePartner = async (id: string) => {
    const { error } = await supabase
      .from("partners")
      .delete()
      .eq("id", id);

    if (!error) {
      setPartners(prev => prev.filter(p => p.id !== id));
    }
    return { error };
  };

  return { partners, isLoading, refetch: fetchPartners, addPartner, updatePartner, deletePartner };
};
