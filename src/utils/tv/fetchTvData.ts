
import { TvModel } from "@/data/models/TvModel";
import { supabase } from "@/integrations/supabase/client";

// Funkce pro získání dat z Supabase a jejich převod na formát TvModel
export async function fetchTvsFromSupabase(): Promise<TvModel[]> {
  try {
    const { data, error } = await supabase
      .from('LGTV3')
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
      // Určení série podle technologie z popisu
      let series = "LED"; // Výchozí hodnota
      if (item.Description?.includes("OLED")) {
        series = "OLED";
      } else if (item.Description?.includes("QNED")) {
        series = "QNED";
      } else if (item.Description?.includes("NanoCell")) {
        series = "NanoCell";
      }

      // Určení modelové řady z názvu
      let modelNumber = "";
      if (item.Name) {
        // Extrahujeme část názvu, která označuje modelovou řadu
        const matches = item.Name.match(/[A-Z]+\d+/);
        if (matches && matches.length > 0) {
          modelNumber = matches[0];
        }
      }

      // Určení tier podle ceny
      let tier = "Entry";
      const price = parseFloat(item.Price || "0");
      if (price > 50000) {
        tier = "Premium";
      } else if (price > 30000) {
        tier = "High-end";
      } else if (price > 20000) {
        tier = "Mid-range";
      }

      // Generování velikosti z názvu
      let sizes: string[] = ["55\""];
      if (item.Name) {
        const sizeMatch = item.Name.match(/(\d{2})"/);
        if (sizeMatch && sizeMatch.length > 1) {
          sizes = [`${sizeMatch[1]}"`];
        }
      }

      // Generování seznamu funkcí z Key features
      let features = ["4K", "Smart TV", "WebOS"];
      if (item["Key features"]) {
        try {
          const keyFeaturesArr = item["Key features"]
            .split(',')
            .map((feature: string) => feature.trim())
            .filter((feature: string) => feature.length > 0);
          
          if (keyFeaturesArr.length > 0) {
            features = keyFeaturesArr;
          }
        } catch (e) {
          console.warn("Could not parse key features:", e);
        }
      }

      // Zachytíme plné znění Key features pro detail produktu
      const keyFeaturesFull = item["Key features"] || "";

      // Generování highlightů z Description
      let highlights = ["Vysoký jas", "Živé barvy", "Skvělý zvuk"];
      if (item.Description) {
        try {
          const descriptionPoints = item.Description
            .split('.')
            .map((point: string) => point.trim())
            .filter((point: string) => point.length > 3 && point.length < 50)
            .slice(0, 3);
          
          if (descriptionPoints.length > 0) {
            highlights = descriptionPoints;
          }
        } catch (e) {
          console.warn("Could not parse description for highlights:", e);
        }
      }

      // Určení rozlišení
      let resolution = "4K Ultra HD";
      if (item["Key features"]?.includes("8K")) {
        resolution = "8K Ultra HD";
      } else if (item["Key features"]?.includes("Full HD") || item["Key features"]?.includes("1080p")) {
        resolution = "Full HD";
      }

      // Generování jedinečného ID
      const itemId = index + 1;

      return {
        id: itemId,
        title: item.Name || `TV Model ${index}`,
        subtitle: item.Description?.substring(0, 50) || "TV",
        image: item.Picture || "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
        price: parseFloat(item.Price || "0"),
        series: series,
        tier: tier,
        modelNumber: modelNumber,
        features: features,
        highlights: highlights,
        recommendation: "Pro běžné sledování TV",
        sizes: sizes,
        keyFeaturesFull: keyFeaturesFull,
        resolution: resolution
      };
    });

    console.log("Mapped TVs from Supabase:", tvs.length);
    return tvs;
  } catch (error) {
    console.error("Error fetching TV data:", error);
    throw error;
  }
}
