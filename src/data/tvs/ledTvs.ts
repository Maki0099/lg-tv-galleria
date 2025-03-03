
import { TvModel } from "../models/TvModel";

export const ledTvs: TvModel[] = [
  {
    id: 9,
    title: "LG UR8 70\"",
    subtitle: "Moderní základní model",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    price: 22990,
    series: "LED",
    tier: "Entry",
    features: ["4K", "HDR", "WebOS 23"],
    highlights: [
      "Velká úhlopříčka",
      "Dobrá cena",
      "Smart TV funkce"
    ],
    recommendation: "Pro nenáročné uživatele",
    sizes: ["43\"", "50\"", "55\"", "65\"", "70\"", "75\"", "86\""],
    modelNumber: "UR8"
  },
  {
    id: 10,
    title: "LG UQ7 65\"",
    subtitle: "Ekonomická volba",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    price: 15990,
    series: "LED",
    tier: "Entry",
    features: ["4K", "HDR", "WebOS 22"],
    highlights: [
      "Nízká cena",
      "4K rozlišení",
      "Smart funkce"
    ],
    recommendation: "Nejlepší poměr cena/velikost",
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""],
    modelNumber: "UQ7"
  }
];
