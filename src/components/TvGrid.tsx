
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { tvs } from "@/data/tvData";
import { groupTvsByCategories, fetchTvsFromSupabase } from "@/utils/tvUtils";
import { TvSeriesSection } from "./TvSeriesSection";
import { TvModel } from "@/data/tvData";
import { useToast } from "@/components/ui/use-toast";

export const TvGrid = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tvData, setTvData] = useState<TvModel[]>([]);
  
  useEffect(() => {
    async function loadTvData() {
      try {
        setLoading(true);
        const data = await fetchTvsFromSupabase();
        
        if (data.length === 0) {
          // If no data from Supabase, fall back to hardcoded data
          console.log("No data found in Supabase, using fallback data");
          setTvData(tvs);
          toast({
            title: "Informace",
            description: "Používám výchozí data - nebyla nalezena žádná data v databázi.",
            variant: "default",
          });
        } else {
          setTvData(data);
          toast({
            title: "Úspěch",
            description: `Načteno ${data.length} TV modelů z databáze.`,
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Failed to load TV data:", error);
        setTvData(tvs); // Fallback to hardcoded data
        toast({
          title: "Chyba",
          description: "Nepodařilo se načíst data z databáze. Používám výchozí data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadTvData();
  }, [toast]);
  
  const groupedTvs = groupTvsByCategories(tvData);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-16">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB612]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {Object.entries(groupedTvs).length > 0 ? (
        Object.entries(groupedTvs).map(([series, seriesTvs]) => (
          <TvSeriesSection 
            key={series}
            series={series}
            tvs={seriesTvs}
            description={t(`tvSeries.${series}.description`, { defaultValue: "" })}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Nebyly nalezeny žádné televizory
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Zkontrolujte prosím připojení k databázi nebo přidejte data do tabulky.
          </p>
        </div>
      )}
    </div>
  );
};
