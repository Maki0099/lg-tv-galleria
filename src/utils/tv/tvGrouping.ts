
import { TvModel } from "@/data/tvData";

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
