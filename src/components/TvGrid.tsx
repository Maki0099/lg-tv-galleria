
import { TvCard } from "./TvCard";

const tvs = [
  // OLED řada
  {
    id: 1,
    title: "LG OLED G3 65\"",
    subtitle: "Gallery Series - Špičkový model s MLA",
    image: "/tv/lg-g3.jpg",
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
    recommendation: "Pro náročné uživatele hledající to nejlepší"
  },
  {
    id: 2,
    title: "LG OLED C3 65\"",
    subtitle: "Nejlepší poměr cena/výkon",
    image: "/tv/lg-c3.jpg",
    price: 49990,
    series: "OLED",
    tier: "High-end",
    features: ["4K", "120Hz", "α9 AI Gen6", "HDMI 2.1"],
    highlights: [
      "Vysoký jas OLED Evo",
      "Perfektní pro filmy a hry",
      "4× HDMI 2.1"
    ],
    recommendation: "Pro filmové nadšence a hráče"
  },
  {
    id: 3,
    title: "LG OLED B3 65\"",
    subtitle: "Dostupnější OLED",
    image: "/tv/lg-b3.jpg",
    price: 39990,
    series: "OLED",
    tier: "Mid-range",
    features: ["4K", "120Hz", "α7 AI Gen6"],
    highlights: [
      "OLED kvalita obrazu",
      "Dobrý pro gaming",
      "Skvělá cena za OLED"
    ],
    recommendation: "Pro ty, kdo chtějí OLED za rozumnou cenu"
  },

  // QNED řada
  {
    id: 4,
    title: "LG QNED99 75\"",
    subtitle: "8K Mini LED vlajková loď",
    image: "/tv/lg-qned99.jpg",
    price: 89990,
    series: "QNED",
    tier: "Premium",
    features: ["8K", "Mini LED", "α9 AI Gen6"],
    highlights: [
      "8K rozlišení",
      "Prémiové Mini LED podsvícení",
      "Quantum Dot + NanoCell"
    ],
    recommendation: "Pro ty, kdo chtějí nejvyšší rozlišení"
  },
  {
    id: 5,
    title: "LG QNED91 65\"",
    subtitle: "4K Mini LED premium model",
    image: "/tv/lg-qned91.jpg",
    price: 45990,
    series: "QNED",
    tier: "High-end",
    features: ["4K", "Mini LED", "α7 AI Gen6"],
    highlights: [
      "Prémiové Mini LED podsvícení",
      "Quantum Dot + NanoCell",
      "Vysoký jas a kontrast"
    ],
    recommendation: "Pro milovníky jasného obrazu"
  },
  {
    id: 6,
    title: "LG QNED81 65\"",
    subtitle: "Základní QNED model",
    image: "/tv/lg-qned81.jpg",
    price: 29990,
    series: "QNED",
    tier: "Mid-range",
    features: ["4K", "Quantum Dot", "α7 AI Gen5"],
    highlights: [
      "QNED technologie",
      "Dobrý poměr cena/výkon",
      "Živé barvy"
    ],
    recommendation: "Pro ty, kdo chtějí kvalitní obraz za rozumnou cenu"
  },

  // LED NanoCell řada
  {
    id: 7,
    title: "LG NANO91 65\"",
    subtitle: "Prémiový NanoCell",
    image: "/tv/lg-nano91.jpg",
    price: 25990,
    series: "NanoCell",
    tier: "High-end",
    features: ["4K", "Local Dimming", "α7 AI Gen5"],
    highlights: [
      "Lokální stmívání",
      "NanoCell technologie",
      "Přesné barvy"
    ],
    recommendation: "Pro ty, kdo chtějí kvalitní barvy"
  },
  {
    id: 8,
    title: "LG NANO75 65\"",
    subtitle: "Dostupný NanoCell",
    image: "/tv/lg-nano75.jpg",
    price: 19990,
    series: "NanoCell",
    tier: "Mid-range",
    features: ["4K", "NanoCell", "α5 AI Gen5"],
    highlights: [
      "Cenově dostupná",
      "Lepší barvy než LED",
      "4K rozlišení"
    ],
    recommendation: "Pro běžné sledování TV"
  },

  // LED řada
  {
    id: 9,
    title: "LG UR8 70\"",
    subtitle: "Moderní základní model",
    image: "/tv/lg-ur8.jpg",
    price: 22990,
    series: "LED",
    tier: "Entry",
    features: ["4K", "HDR", "WebOS 23"],
    highlights: [
      "Velká úhlopříčka",
      "Dobrá cena",
      "Smart TV funkce"
    ],
    recommendation: "Pro nenáročné uživatele"
  },
  {
    id: 10,
    title: "LG UQ7 65\"",
    subtitle: "Ekonomická volba",
    image: "/tv/lg-uq7.jpg",
    price: 15990,
    series: "LED",
    tier: "Entry",
    features: ["4K", "HDR", "WebOS 22"],
    highlights: [
      "Nízká cena",
      "4K rozlišení",
      "Smart funkce"
    ],
    recommendation: "Nejlepší poměr cena/velikost"
  }
];

export const TvGrid = () => {
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
            <h2 className="text-3xl font-bold text-gray-900">{series}</h2>
            <p className="text-lg text-muted-foreground">
              {getTechnologyDescription(series)}
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
