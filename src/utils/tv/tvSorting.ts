
import { TvModel } from "@/data/tvData";

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
