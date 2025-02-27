
import { TvCard } from "./TvCard";
import { useTranslation } from "react-i18next";

const tvs = [
  // OLED řada
  {
    id: 1,
    title: "LG OLED G3 65\"",
    subtitle: "Gallery Series - Špičkový model s MLA",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80",
    price: 69990,
    series: "OLED",
    tier: "Premium",
    features: ["4K", "MLA technologie", "α9 AI Gen6", "144Hz"],
    highlights: [
      "Nejvyšší jas díky MLA technologii",
      "Nekonečný kontrast",
      "Dokonalá černá",
      "Gallery Design"
    ],
    recommendation: "Pro náročné uživatele hledající to nejlepší",
    sizes: ["55\"", "65\"", "77\"", "83\""]
  },
  {
    id: 2,
    title: "LG OLED C3 65\"",
    subtitle: "Nejlepší poměr cena/výkon",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    price: 49990,
    series: "OLED",
    tier: "High-end",
    features: ["4K", "120Hz", "α9 AI Gen6", "HDMI 2.1"],
    highlights: [
      "Vysoký jas OLED Evo",
      "Perfektní pro filmy a hry",
      "4× HDMI 2.1"
    ],
    recommendation: "Pro filmové nadšence a hráče",
    sizes: ["42\"", "48\"", "55\"", "65\"", "77\"", "83\""]
  },
  {
    id: 3,
    title: "LG OLED B3 65\"",
    subtitle: "Dostupnější OLED",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80",
    price: 39990,
    series: "OLED",
    tier: "Mid-range",
    features: ["4K", "120Hz", "α7 AI Gen6"],
    highlights: [
      "OLED kvalita obrazu",
      "Dobrý pro gaming",
      "Skvělá cena za OLED"
    ],
    recommendation: "Pro ty, kdo chtějí OLED za rozumnou cenu",
    sizes: ["55\"", "65\"", "77\""]
  },

  // QNED řada
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
    sizes: ["65\"", "75\"", "86\""]
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
    sizes: ["65\"", "75\"", "86\""]
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
    sizes: ["50\"", "55\"", "65\"", "75\"", "86\""]
  },

  // LED NanoCell řada
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
    sizes: ["55\"", "65\"", "75\"", "86\""]
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
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""]
  },

  // LED řada
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
    sizes: ["43\"", "50\"", "55\"", "65\"", "70\"", "75\"", "86\""]
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
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""]
  }
];

export const TvGrid = () => {
  const { t } = useTranslation();
  
  const groupedTvs = tvs.reduce((acc, tv) => {
    if (!acc[tv.series]) {
      acc[tv.series] = [];
    }
    acc[tv.series].push(tv);
    return acc;
  }, {} as Record<string, typeof tvs>);

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {Object.entries(groupedTvs).map(([series, seriesTvs]) => (
        <div key={series} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{t(`tvSeries.${series}.name`, series)}</h2>
            <p className="text-lg text-muted-foreground">
              {t(`tvSeries.${series}.description`, getTechnologyDescription(series))}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesTvs.map((tv) => (
              <TvCard key={tv.id} {...tv} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const getTechnologyDescription = (series: string) => {
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
