import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Position {
  id: string;
  title: string;
}

export const useJobPositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      const { data, error } = await supabase
        .from("job_positions")
        .select("id, title")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setPositions(data);
      }
      setIsLoading(false);
    };

    fetchPositions();
  }, []);

  return { positions, isLoading };
};
