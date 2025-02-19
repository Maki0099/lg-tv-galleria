
import { TvCard } from "./TvCard";

const tvs = [
  // OLED evo řada - prémiová
  {
    id: 1,
    title: "LG OLED evo G3 65\"",
    image: "https://cdn.datart.cz/images/product/1000x1000/202303/TV-OLED-LG-OLED65G3LA-000.jpg",
    price: 69990,
    rating: 4.8,
    location: "Praha",
    series: "OLED evo",
    features: ["8K", "α9 AI Processor", "Infinite Contrast", "Dolby Vision IQ", "HDMI 2.1"],
    highlights: ["Jas až 2000 nit", "Perfect Black", "NVIDIA G-Sync"]
  },
  {
    id: 2,
    title: "LG OLED evo C3 65\"",
    image: "https://cdn.datart.cz/images/product/1000x1000/202303/TV-OLED-LG-OLED65C3LA-000.jpg",
    price: 49990,
    rating: 4.7,
    location: "Brno",
    series: "OLED evo",
    features: ["4K", "α9 AI Processor", "Infinite Contrast", "Dolby Vision", "HDMI 2.1"],
    highlights: ["Jas až 1000 nit", "Perfect Black", "AMD FreeSync"]
  },
  // QNED řada - střední třída
  {
    id: 3,
    title: "LG QNED MiniLED 75\"",
    image: "https://cdn.datart.cz/images/product/1000x1000/202304/TV-LED-LG-75QNED813RE-000.jpg",
    price: 45990,
    rating: 4.6,
    location: "Ostrava",
    series: "QNED",
    features: ["4K", "α7 AI Processor", "Local Dimming", "HDR10", "HDMI 2.1"],
    highlights: ["Quantum Dot", "MiniLED podsvícení"]
  },
  // LED řada - základní
  {
    id: 4,
    title: "LG LED UHD 70\"",
    image: "https://cdn.datart.cz/images/product/1000x1000/202304/TV-LED-LG-70UR78003LK-000.jpg",
    price: 22990,
    rating: 4.4,
    location: "Praha",
    series: "LED",
    features: ["4K", "α5 AI Processor", "HDR", "WebOS"],
    highlights: ["Direct LED"]
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
    <div className="container mx-auto px-4 py-8 space-y-12">
      {Object.entries(groupedTvs).map(([series, seriesTvs]) => (
        <div key={series} className="space-y-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold">{series}</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {seriesTvs.map((tv) => (
              <TvCard key={tv.id} {...tv} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
