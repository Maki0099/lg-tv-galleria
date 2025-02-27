
import { TvModel } from "@/data/tvData";
import { supabase } from "@/integrations/supabase/client";

// Seskupí TV podle kategorií (OLED, QNED, apod.)
export const groupTvsByCategories = (tvs: TvModel[]): Record<string, TvModel[]> => {
  return tvs.reduce((acc, tv) => {
    if (!acc[tv.series]) {
      acc[tv.series] = [];
    }
    acc[tv.series].push(tv);
    return acc;
  }, {} as Record<string, TvModel[]>);
};

// Získá popis technologie podle série
export const getTechnologyDescription = (series: string): string => {
  switch (series) {
    case "OLED":
      return "Nejvyšší kvalita obrazu s dokonalou černou a nekonečným kontrastem. Každý pixel svítí samostatně.";
    case "QNED":
      return "Kombinace Quantum Dot a NanoCell s Mini LED podsvícením pro jasný a živý obraz s výborným kontrastem.";
    case "NanoCell":
      return "Technologie NanoCell zajišťuje čisté a přesné barvy díky filtraci nežádoucích odstínů.";
    case "LED":
      return "Klasická LED technologie nabízí spolehlivý obraz za příznivou cenu.";
    default:
      return "";
  }
};

// Filtruje TV podle velikosti displeje
export const filterTvBySize = (tvs: TvModel[], size: string | null): TvModel[] => {
  if (!size) return tvs;
  return tvs.filter(tv => tv.sizes?.includes(size));
};

// Filtruje TV podle cenového rozpětí
export const filterTvByPriceRange = (tvs: TvModel[], minPrice: number, maxPrice: number): TvModel[] => {
  return tvs.filter(tv => tv.price >= minPrice && tv.price <= maxPrice);
};

// Seřadí TV podle ceny (vzestupně nebo sestupně)
export const sortTvsByPrice = (tvs: TvModel[], ascending: boolean = true): TvModel[] => {
  return [...tvs].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
};

// Najde všechny velikostní varianty stejného modelu
export const findSizeVariants = (tv: TvModel, allTvs: TvModel[]): TvModel[] => {
  if (!tv.modelNumber) return [];
  
  return allTvs.filter(
    sizeTv => 
      sizeTv.modelNumber === tv.modelNumber && 
      sizeTv.id !== tv.id
  );
};

// Fetch TV data from Supabase
export const fetchTvsFromSupabase = async (): Promise<TvModel[]> => {
  try {
    const { data, error } = await supabase
      .from("LGTV 2")
      .select("*");

    if (error) {
      console.error("Error fetching TV data:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn("No TV data found in the database.");
      return [];
    }

    // Map the database columns to our TvModel format
    return data.map((item, index) => ({
      id: index + 1, // Generate sequential IDs
      title: item["Název"] || "Unnamed TV",
      subtitle: item["Kategorie"] || "",
      image: item["Obrázek"] || "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
      price: item["cena"] || 0,
      series: mapCategoryToSeries(item["Kategorie"] || ""),
      tier: mapCategoryToTier(item["Kategorie"] || ""),
      features: generateFeatures(item["Kategorie"] || ""),
      highlights: generateHighlights(item["Kategorie"] || ""),
      recommendation: generateRecommendation(item["Kategorie"] || ""),
      sizes: extractSizes(item["Název"] || ""),
      modelNumber: extractModelNumber(item["kód"] || "", item["Název"] || "")
    }));
  } catch (err) {
    console.error("Unexpected error fetching TV data:", err);
    return [];
  }
};

// Helper functions to map database data to our model

// Extract the model size from the name (e.g., "LG OLED 65C3" -> "65\"")
function extractSizes(name: string): string[] {
  const sizeMatch = name.match(/\d{2}/);
  if (sizeMatch) {
    return [sizeMatch[0] + "\""];
  }
  return ["55\"", "65\"", "77\""]; // Default sizes if not found
}

// Extract model number (e.g., "LG OLED C3 65\"" -> "C3")
function extractModelNumber(code: string, name: string): string {
  if (code) {
    const codeMatch = code.match(/[A-Z]\d/i);
    if (codeMatch) {
      return codeMatch[0];
    }
  }
  
  const nameMatch = name.match(/[A-Z]\d/i);
  if (nameMatch) {
    return nameMatch[0];
  }
  
  return "";
}

// Map category to series (OLED, QNED, etc.)
function mapCategoryToSeries(category: string): string {
  if (category.toUpperCase().includes("OLED")) return "OLED";
  if (category.toUpperCase().includes("QNED")) return "QNED";
  if (category.toUpperCase().includes("NANO")) return "NanoCell";
  return "LED";
}

// Map category to tier (Premium, High-end, etc.)
function mapCategoryToTier(category: string): string {
  if (category.toUpperCase().includes("OLED")) {
    if (category.toUpperCase().includes("G")) return "Premium";
    if (category.toUpperCase().includes("C")) return "High-end";
    return "Mid-range";
  }
  if (category.toUpperCase().includes("QNED")) return "High-end";
  if (category.toUpperCase().includes("NANO")) return "Mid-range";
  return "Entry";
}

// Generate features based on the category
function generateFeatures(category: string): string[] {
  const features = ["4K"];
  
  if (category.toUpperCase().includes("OLED")) {
    features.push("120Hz", "HDMI 2.1");
    if (category.toUpperCase().includes("G")) {
      features.push("MLA technologie", "144Hz");
    }
  } else if (category.toUpperCase().includes("QNED")) {
    features.push("Quantum Dot", "Mini LED");
  } else if (category.toUpperCase().includes("NANO")) {
    features.push("NanoCell", "Local Dimming");
  } else {
    features.push("HDR", "WebOS 23");
  }
  
  return features;
}

// Generate highlights based on the category
function generateHighlights(category: string): string[] {
  if (category.toUpperCase().includes("OLED")) {
    if (category.toUpperCase().includes("G")) {
      return ["Nejvyšší jas díky MLA technologii", "Nekonečný kontrast", "Dokonalá černá", "Gallery Design"];
    }
    return ["Vysoký jas OLED Evo", "Perfektní pro filmy a hry", "4× HDMI 2.1"];
  }
  if (category.toUpperCase().includes("QNED")) {
    return ["Prémiové Mini LED podsvícení", "Quantum Dot + NanoCell", "Vysoký jas a kontrast"];
  }
  if (category.toUpperCase().includes("NANO")) {
    return ["Lokální stmívání", "NanoCell technologie", "Přesné barvy"];
  }
  return ["Velká úhlopříčka", "Dobrá cena", "Smart TV funkce"];
}

// Generate recommendation based on the category
function generateRecommendation(category: string): string {
  if (category.toUpperCase().includes("OLED")) {
    if (category.toUpperCase().includes("G")) {
      return "Pro náročné uživatele hledající to nejlepší";
    }
    return "Pro filmové nadšence a hráče";
  }
  if (category.toUpperCase().includes("QNED")) {
    return "Pro milovníky jasného obrazu";
  }
  if (category.toUpperCase().includes("NANO")) {
    return "Pro ty, kdo chtějí kvalitní barvy";
  }
  return "Pro nenáročné uživatele";
}
