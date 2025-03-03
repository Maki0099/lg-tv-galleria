
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

    console.log("Raw Supabase data:", data);

    // Mapování dat z Supabase na TvModel
    const tvs: TvModel[] = data.map((item: any, index) => {
      // Určení série podle kategorie
      let series = "LED"; // Výchozí hodnota
      if (item.Kategorie?.includes("OLED")) {
        series = "OLED";
      } else if (item.Kategorie?.includes("QNED")) {
        series = "QNED";
      } else if (item.Kategorie?.includes("NanoCell")) {
        series = "NanoCell";
      }

      // Určení modelové řady z kódu
      let modelNumber = "";
      if (item.kód) {
        // Extrahujeme část kódu, která označuje modelovou řadu
        const matches = item.kód.match(/[A-Z]+\d+/);
        if (matches && matches.length > 0) {
          modelNumber = matches[0];
        }
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

      // Generování velikosti z názvu
      let sizes: string[] = ["55\""];
      if (item.Název) {
        const sizeMatch = item.Název.match(/(\d{2})"/);
        if (sizeMatch && sizeMatch.length > 1) {
          sizes = [`${sizeMatch[1]}"`];
        }
      }

      // Generování jedinečného ID
      const itemId = index + 1;

      return {
        id: itemId,
        title: item.Název || `TV Model ${index}`,
        subtitle: item.Kategorie || "TV",
        image: item.Obrázek || "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
        price: item.cena || 0,
        series: series,
        tier: tier,
        modelNumber: item.kód?.substring(0, 2) || "",
        features: ["4K", "Smart TV", "WebOS"],
        highlights: [
          "Vysoký jas",
          "Živé barvy",
          "Skvělý zvuk"
        ],
        recommendation: "Pro běžné sledování TV",
        sizes: sizes
      };
    });

    console.log("Mapped TVs from Supabase:", tvs.length);
    return tvs;
  } catch (error) {
    console.error("Error fetching TV data:", error);
    throw error;
  }
}
