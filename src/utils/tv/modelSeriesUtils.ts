
import { TvModel } from "@/data/tvData";
import { modelSeriesInfo } from "./modelSeriesInfo";

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
  if (modelSeriesInfo[seriesId as keyof typeof modelSeriesInfo]) {
    return {
      id: seriesId,
      ...modelSeriesInfo[seriesId as keyof typeof modelSeriesInfo]
    };
  }
  return null;
}

// Funkce pro získání TV modelů patřících do dané modelové řady
export function getTvsByModelSeries(tvs: TvModel[], seriesId: string): TvModel[] {
  return tvs.filter(tv => tv.modelNumber === seriesId);
}
