
import { useState } from "react";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TvCardProps {
  title: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  series: string;
  features: string[];
  highlights: string[];
}

export const TvCard = ({ 
  title, 
  image, 
  price, 
  rating, 
  location, 
  series, 
  features,
  highlights 
}: TvCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Určení barvy pozadí podle série
  const getSeriesStyle = () => {
    switch (series) {
      case "OLED evo":
        return "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200";
      case "QNED":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "LED":
        return "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200";
      default:
        return "bg-card";
    }
  };

  return (
    <div className={cn(
      "card-hover relative rounded-lg overflow-hidden border",
      getSeriesStyle()
    )}>
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
              isFavorite ? "fill-sky-500 text-sky-500" : "text-muted-foreground"
            )} 
          />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
            <span>{location}</span>
            <span className="font-semibold text-foreground">
              {price.toLocaleString("cs-CZ")} Kč
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {features.map((feature) => (
              <span 
                key={feature}
                className="inline-flex items-center px-2 py-1 rounded-full 
                         text-xs font-medium bg-sky-500/10 text-sky-700"
              >
                {feature}
              </span>
            ))}
          </div>
          
          <div className="space-y-1">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center text-sm text-muted-foreground">
                <Check className="h-4 w-4 mr-2 text-sky-500" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
