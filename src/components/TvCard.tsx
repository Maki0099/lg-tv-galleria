
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TvCardProps {
  title: string;
  image: string;
  price: number;
  rating: number;
  location: string;
}

export const TvCard = ({ title, image, price, rating, location }: TvCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="card-hover relative rounded-lg overflow-hidden bg-card">
      <div className="relative aspect-video">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 
                     backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Star 
            className={cn(
              "h-5 w-5",
              isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            )} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{location}</span>
          <span className="font-semibold text-foreground">
            {price.toLocaleString("cs-CZ")} Kč
          </span>
        </div>
      </div>
    </div>
  );
};
