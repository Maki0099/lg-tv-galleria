
import { TvCard } from "./TvCard";

const tvs = [
  {
    id: 1,
    title: "LG OLED evo G3 65\"",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    price: 69990,
    rating: 4.8,
    location: "Praha"
  },
  {
    id: 2,
    title: "LG QNED MiniLED 75\"",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    price: 45990,
    rating: 4.6,
    location: "Brno"
  },
  {
    id: 3,
    title: "LG OLED C3 55\"",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: 38990,
    rating: 4.9,
    location: "Ostrava"
  },
  // More TVs can be added here
];

export const TvGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tvs.map((tv) => (
          <TvCard key={tv.id} {...tv} />
        ))}
      </div>
    </div>
  );
};
