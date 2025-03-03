
import { TvModel } from "@/data/tvData";
import { supabase } from "@/integrations/supabase/client";

// Struktura pro modelovou řadu
export interface TvSeries {
  id: string;
  name: string;
  technology: string;
  description: string;
  sizes: string[];
  highlights: string[];
  models: TvModel[];
}

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

// Funkce pro seskupení televizí podle technologií
export function groupTvsByTechnology(tvs: TvModel[]): Record<string, TvModel[]> {
  const grouped: Record<string, TvModel[]> = {
    "OLED": [],
    "QNED": [],
    "NanoCell": [],
    "LED": []
  };
  
  tvs.forEach(tv => {
    if (grouped[tv.series]) {
      grouped[tv.series].push(tv);
    } else {
      grouped["LED"].push(tv); // Fallback pro neznámé série
    }
  });
  
  return grouped;
}

// Funkce pro seskupení televizí podle modelových řad
export function groupTvsByModelNumber(tvs: TvModel[]): Record<string, TvModel[]> {
  const grouped: Record<string, TvModel[]> = {};
  
  tvs.forEach(tv => {
    if (tv.modelNumber) {
      if (!grouped[tv.modelNumber]) {
        grouped[tv.modelNumber] = [];
      }
      grouped[tv.modelNumber].push(tv);
    }
  });
  
  return grouped;
}

// Funkce pro seřazení TV podle velikosti úhlopříčky (od největší k nejmenší)
export function sortTvsBySizeDescending(tvs: TvModel[]): TvModel[] {
  return [...tvs].sort((a, b) => {
    // Extrahujeme číslo z velikosti (např. z "55\"" získáme 55)
    const sizeA = parseInt(a.sizes?.[0]?.replace(/"/g, '') || '0');
    const sizeB = parseInt(b.sizes?.[0]?.replace(/"/g, '') || '0');
    return sizeB - sizeA; // Sestupné řazení
  });
}

// Funkce pro seřazení TV podle velikosti úhlopříčky
export function sortTvsBySize(tvs: TvModel[]): TvModel[] {
  return [...tvs].sort((a, b) => {
    // Extrahujeme číslo z velikosti (např. z "55\"" získáme 55)
    const sizeA = parseInt(a.sizes?.[0]?.replace(/"/g, '') || '0');
    const sizeB = parseInt(b.sizes?.[0]?.replace(/"/g, '') || '0');
    return sizeA - sizeB;
  });
}

// Funkce pro nalezení velikostních variant stejného modelu
export function findSizeVariants(tv: TvModel, allTvs: TvModel[]): TvModel[] {
  if (!tv.modelNumber) return [];
  
  return allTvs.filter(
    (otherTv) => 
      otherTv.id !== tv.id && 
      otherTv.modelNumber === tv.modelNumber &&
      otherTv.series === tv.series
  );
}

// Funkce pro získání dostupných velikostí pro danou modelovou řadu
export function getAvailableSizes(tvs: TvModel[]): string[] {
  const uniqueSizes = new Set<string>();
  
  tvs.forEach(tv => {
    if (tv.sizes) {
      tv.sizes.forEach(size => uniqueSizes.add(size));
    }
  });
  
  // Seřazení velikostí
  return Array.from(uniqueSizes).sort((a, b) => {
    const sizeA = parseInt(a.replace(/"/g, ''));
    const sizeB = parseInt(b.replace(/"/g, ''));
    return sizeA - sizeB;
  });
}

// Popisy a vlastnosti technologií
export const technologyInfo = {
  "OLED": {
    description: "OLED televizory nabízejí dokonalou černou, nekonečný kontrast a věrné barvy díky samozářícím pixelům, které nepotřebují podsvícení.",
    highlights: [
      "Dokonalá černá - pixely se úplně vypínají",
      "Nekonečný kontrast s ostrými detaily",
      "Široké pozorovací úhly",
      "Tenký a elegantní design"
    ]
  },
  "QNED": {
    description: "QNED kombinuje technologii Quantum Dot a NanoCell s Mini LED podsvícením pro jasnější obraz s lepším kontrastem a živějšími barvami.",
    highlights: [
      "Mini LED podsvícení pro vyšší jas a kontrast",
      "Quantum Dot + NanoCell pro čistší a přesnější barvy",
      "Vysoký jas vhodný i do světlých místností",
      "Lepší poměr kontrastu než běžné LED TV"
    ]
  },
  "NanoCell": {
    description: "NanoCell televize využívají nanočástice pro filtraci nečistých barev, čímž poskytují jasnější a přesnější barvy pro realističtější zážitek ze sledování.",
    highlights: [
      "Přesnější a čistší barvy díky NanoCell technologii",
      "Lepší podání barev než standardní LED",
      "Široké pozorovací úhly",
      "Dobrý poměr cena/výkon"
    ]
  },
  "LED": {
    description: "Spolehlivé LED televizory nabízejí dobrý obraz za přijatelnou cenu, ideální pro běžné sledování TV a filmů.",
    highlights: [
      "Dobrý poměr cena/výkon",
      "Spolehlivá a osvědčená technologie",
      "Nižší spotřeba energie",
      "Vhodné pro běžné sledování TV"
    ]
  }
};

// Informace o modelových řadách
export const modelSeriesInfo = {
  "G3": {
    name: "LG OLED G3 (Gallery Series)",
    technology: "OLED",
    description: "Špičkový 4K OLED s technologií MLA pro vyšší jas a designem určeným k zavěšení na zeď.",
    highlights: [
      "Technologie MLA pro vyšší jas",
      "Dokonalá černá a nekonečný kontrast",
      "Gallery design pro montáž na zeď",
      "α9 AI procesor 4. generace"
    ],
    sizes: ["55\"", "65\"", "77\"", "83\""]
  },
  "C3": {
    name: "LG OLED C3",
    technology: "OLED",
    description: "Nejlepší poměr cena/výkon u OLED TV. Ideální volba pro filmy a hraní her.",
    highlights: [
      "Vynikající obraz s hlubokými černými",
      "4× HDMI 2.1 pro gaming",
      "α9 AI procesor 4. generace",
      "Všestranné použití pro filmy i hry"
    ],
    sizes: ["42\"", "48\"", "55\"", "65\"", "77\"", "83\""]
  },
  "B3": {
    name: "LG OLED B3",
    technology: "OLED",
    description: "Cenově dostupnější OLED, ale stále velmi kvalitní obraz s dokonalou černou.",
    highlights: [
      "Dostupnější OLED technologie",
      "Skvělý filmový zážitek",
      "α7 AI procesor",
      "Dobrá volba pro první OLED TV"
    ],
    sizes: ["55\"", "65\"", "77\""]
  },
  "QNED99": {
    name: "LG QNED99",
    technology: "QNED",
    description: "8K model s Mini LED podsvícením pro maximální detaily a jas.",
    highlights: [
      "8K rozlišení s AI upscalingem",
      "Prémiové Mini LED podsvícení",
      "Quantum Dot + NanoCell",
      "α9 AI procesor 4. generace"
    ],
    sizes: ["65\"", "75\"", "86\""]
  },
  "QNED91": {
    name: "LG QNED91",
    technology: "QNED",
    description: "Špičkový 4K QNED model s Mini LED technologií pro vynikající jas a kontrast.",
    highlights: [
      "Mini LED podsvícení s lokálním stmíváním",
      "Quantum Dot + NanoCell",
      "4K rozlišení s HDR10 Pro",
      "α7 AI procesor 4. generace"
    ],
    sizes: ["65\"", "75\"", "86\""]
  },
  "QNED86": {
    name: "LG QNED86",
    technology: "QNED",
    description: "Dobrý poměr cena/výkon, vynikající barvy díky Quantum Dot a NanoCell technologii.",
    highlights: [
      "Quantum Dot + NanoCell",
      "LED podsvícení s lokálním stmíváním",
      "4K rozlišení s HDR",
      "α7 AI procesor"
    ],
    sizes: ["65\"", "75\"", "86\""]
  },
  "QNED81": {
    name: "LG QNED81",
    technology: "QNED",
    description: "Cenově dostupný QNED model, slabší podsvícení než u vyšších modelů, ale stále velmi dobré barvy.",
    highlights: [
      "Quantum Dot + NanoCell",
      "Standardní LED podsvícení",
      "4K rozlišení s HDR",
      "α5 AI procesor"
    ],
    sizes: ["50\"", "55\"", "65\"", "75\""]
  },
  "NANO91": {
    name: "LG NANO91",
    technology: "NanoCell",
    description: "Nejlepší NanoCell model s lokálním stmíváním pro lepší kontrast a přesnější barvy.",
    highlights: [
      "NanoCell technologie pro čisté barvy",
      "LED podsvícení s lokálním stmíváním",
      "4K rozlišení s HDR",
      "α7 AI procesor"
    ],
    sizes: ["55\"", "65\"", "75\"", "86\""]
  },
  "NANO86": {
    name: "LG NANO86",
    technology: "NanoCell",
    description: "Střední třída NanoCell TV, vhodná pro běžné sledování s lepšími barvami než standardní LED.",
    highlights: [
      "NanoCell technologie",
      "4K rozlišení s HDR",
      "α5 AI procesor",
      "120Hz panel pro plynulý pohyb"
    ],
    sizes: ["50\"", "55\"", "65\"", "75\""]
  },
  "NANO75": {
    name: "LG NANO75",
    technology: "NanoCell",
    description: "Základní NanoCell model, cenově dostupná alternativa s lepšími barvami než běžné LED TV.",
    highlights: [
      "NanoCell technologie",
      "4K rozlišení s HDR",
      "α5 AI procesor",
      "Dobrý poměr cena/výkon"
    ],
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""]
  },
  "UR8": {
    name: "LG UR8",
    technology: "LED",
    description: "Základní model pro rok 2023 s webOS a 4K rozlišením, ideální pro běžné sledování TV.",
    highlights: [
      "4K rozlišení s HDR",
      "WebOS 23",
      "Režim AI pro optimalizaci obrazu",
      "Dobrá cena za 4K rozlišení"
    ],
    sizes: ["43\"", "50\"", "55\"", "65\"", "70\"", "75\"", "86\""]
  },
  "UQ7": {
    name: "LG UQ7",
    technology: "LED",
    description: "Předchozí generace 4K LED TV, slušný výkon za nízkou cenu.",
    highlights: [
      "4K rozlišení s HDR",
      "WebOS 22",
      "Game Optimizer",
      "Výborný poměr cena/velikost"
    ],
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""]
  }
};

// Funkce pro získání unikátních modelových řad podle technologie
export function getModelSeriesByTechnology(technology: string): any[] {
  return Object.entries(modelSeriesInfo)
    .filter(([_, info]) => info.technology === technology)
    .map(([key, info]) => ({
      id: key,
      ...info
    }));
}

// Funkce pro získání konkrétní modelové řady podle ID
export function getModelSeriesById(seriesId: string): any {
  if (modelSeriesInfo[seriesId]) {
    return {
      id: seriesId,
      ...modelSeriesInfo[seriesId]
    };
  }
  return null;
}

// Funkce pro získání TV modelů patřících do dané modelové řady
export function getTvsByModelSeries(tvs: TvModel[], seriesId: string): TvModel[] {
  return tvs.filter(tv => tv.modelNumber === seriesId);
}
