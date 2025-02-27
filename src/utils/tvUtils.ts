
import { TvModel } from "@/data/tvData";

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
