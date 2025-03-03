
import { TvModel } from "@/data/tvData";
import { supabase } from "@/integrations/supabase/client";

// Funkce pro získání dat z Supabase a jejich převod na formát TvModel
export async function fetchTvsFromSupabase(): Promise<TvModel[]> {
  try {
    const { data, error } = await supabase
      .from('LGTV 2')
      .select('*');

    if (error) {
      console.error("Supabase connection error:", error);
      throw new Error("Failed to fetch data from Supabase");
    }

    if (!data || data.length === 0) {
      console.warn("No TV data found in the database.");
      return [];
    }

    // Mapování dat z Supabase na TvModel
    const tvs: TvModel[] = data.map((item, index) => {
      // Určení série podle kategorie
      let series = "LED"; // Výchozí hodnota
      if (item.Kategorie?.includes("OLED")) {
        series = "OLED";
      } else if (item.Kategorie?.includes("QNED")) {
        series = "QNED";
      } else if (item.Kategorie?.includes("NanoCell")) {
        series = "NanoCell";
      }

      // Určení tier podle ceny
      let tier = "Entry";
      if (item.cena > 50000) {
        tier = "Premium";
      } else if (item.cena > 30000) {
        tier = "High-end";
      } else if (item.cena > 20000) {
        tier = "Mid-range";
      }

      return {
        id: item.id || index + 1,
        title: item.Název || `TV Model ${index}`,
        subtitle: item.Kategorie || "TV",
        image: item.Obrázek || "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
        price: item.cena || 0,
        series: series,
        tier: tier,
        modelNumber: item.kód || "",
        features: ["4K", "Smart TV", "WebOS"],
        highlights: [
          "Vysoký jas",
          "Živé barvy",
          "Skvělý zvuk"
        ],
        recommendation: "Pro běžné sledování TV",
        sizes: ["55\"", "65\""]
      };
    });

    console.log("Loaded TVs from Supabase:", tvs.length);
    return tvs;
  } catch (error) {
    console.error("Error fetching TV data:", error);
    throw error;
  }
}

// Funkce pro seskupení televizí podle kategorií
export function groupTvsByCategories(tvs: TvModel[]): Record<string, TvModel[]> {
  const grouped: Record<string, TvModel[]> = {};
  
  tvs.forEach(tv => {
    if (!grouped[tv.series]) {
      grouped[tv.series] = [];
    }
    grouped[tv.series].push(tv);
  });
  
  return grouped;
}
