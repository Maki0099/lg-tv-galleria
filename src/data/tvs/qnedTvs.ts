
import { TvModel } from "../models/TvModel";

export const qnedTvs: TvModel[] = [
  {
    id: 4,
    title: "LG QNED99 75\"",
    subtitle: "8K Mini LED vlajková loď",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    price: 89990,
    series: "QNED",
    tier: "Premium",
    features: ["8K", "Mini LED", "α9 AI Gen6"],
    highlights: [
      "8K rozlišení",
      "Prémiové Mini LED podsvícení",
      "Quantum Dot + NanoCell"
    ],
    recommendation: "Pro ty, kdo chtějí nejvyšší rozlišení",
    sizes: ["65\"", "75\"", "86\""],
    modelNumber: "QNED99"
  },
  {
    id: 5,
    title: "LG QNED91 65\"",
    subtitle: "4K Mini LED premium model",
    image: "https://images.unsplash.com/photo-1593305841689-05c142f2c3b5?w=800&q=80",
    price: 45990,
    series: "QNED",
    tier: "High-end",
    features: ["4K", "Mini LED", "α7 AI Gen6"],
    highlights: [
      "Prémiové Mini LED podsvícení",
      "Quantum Dot + NanoCell",
      "Vysoký jas a kontrast"
    ],
    recommendation: "Pro milovníky jasného obrazu",
    sizes: ["65\"", "75\"", "86\""],
    modelNumber: "QNED91"
  },
  {
    id: 6,
    title: "LG QNED81 65\"",
    subtitle: "Základní QNED model",
    image: "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80",
    price: 29990,
    series: "QNED",
    tier: "Mid-range",
    features: ["4K", "Quantum Dot", "α7 AI Gen5"],
    highlights: [
      "QNED technologie",
      "Dobrý poměr cena/výkon",
      "Živé barvy"
    ],
    recommendation: "Pro ty, kdo chtějí kvalitní obraz za rozumnou cenu",
    sizes: ["50\"", "55\"", "65\"", "75\"", "86\""],
    modelNumber: "QNED81"
  }
];
