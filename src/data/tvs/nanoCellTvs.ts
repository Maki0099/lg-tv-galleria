
import { TvModel } from "../models/TvModel";

export const nanoCellTvs: TvModel[] = [
  {
    id: 7,
    title: "LG NANO91 65\"",
    subtitle: "Prémiový NanoCell",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80",
    price: 25990,
    series: "NanoCell",
    tier: "High-end",
    features: ["4K", "Local Dimming", "α7 AI Gen5"],
    highlights: [
      "Lokální stmívání",
      "NanoCell technologie",
      "Přesné barvy"
    ],
    recommendation: "Pro ty, kdo chtějí kvalitní barvy",
    sizes: ["55\"", "65\"", "75\"", "86\""],
    modelNumber: "NANO91"
  },
  {
    id: 8,
    title: "LG NANO75 65\"",
    subtitle: "Dostupný NanoCell",
    image: "https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=800&q=80",
    price: 19990,
    series: "NanoCell",
    tier: "Mid-range",
    features: ["4K", "NanoCell", "α5 AI Gen5"],
    highlights: [
      "Cenově dostupná",
      "Lepší barvy než LED",
      "4K rozlišení"
    ],
    recommendation: "Pro běžné sledování TV",
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""],
    modelNumber: "NANO75"
  }
];
