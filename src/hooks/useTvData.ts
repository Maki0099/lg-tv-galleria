
import { useState, useEffect } from "react";
import { TvModel } from "@/data/tvData";
import { tvs as fallbackTvs } from "@/data/tvData";
import { fetchTvsFromSupabase } from "@/utils/tvUtils";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useTvData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TvModel[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const tvData = await fetchTvsFromSupabase();
        
        if (isMounted) {
          if (tvData.length === 0) {
            // Fallback to hardcoded data if no Supabase data
            setData(fallbackTvs);
            toast({
              title: "Informace",
              description: "Používám výchozí data - nebyla nalezena žádná data v databázi.",
              duration: 5000,
            });
          } else {
            setData(tvData);
          }
        }
      } catch (err) {
        console.error("Error loading TV data:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load TV data"));
          setData(fallbackTvs); // Fallback to hardcoded data
          toast({
            title: "Chyba",
            description: "Nepodařilo se načíst data z databáze. Používám výchozí data.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  // Function to get a TV by ID
  const getTvById = (id: number): TvModel | undefined => {
    return data.find(tv => tv.id === id);
  };

  return {
    loading,
    error,
    data,
    getTvById
  };
};
