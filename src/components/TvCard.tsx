
import { useState } from "react";
import { Star, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TvCardProps {
  title: string;
  subtitle: string;
  image: string;
  price: number;
  series: string;
  tier: string;
  features: string[];
  highlights: string[];
  recommendation: string;
}

export const TvCard = ({ 
  title, 
  subtitle,
  image, 
  price, 
  series, 
  tier,
  features,
  highlights,
  recommendation
}: TvCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Určení barvy pozadí podle série
  const getSeriesStyle = () => {
    switch (series) {
      case "OLED":
        return "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200";
      case "QNED":
        return "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200";
      case "NanoCell":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "LED":
        return "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200";
      default:
        return "bg-card";
    }
  };

  const getTierBadgeStyle = () => {
    switch (tier) {
      case "Premium":
        return "bg-amber-500 text-white";
      case "High-end":
        return "bg-sky-500 text-white";
      case "Mid-range":
        return "bg-blue-500 text-white";
      case "Entry":
        return "bg-slate-500 text-white";
      default:
        return "bg-gray-500 text-white";
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
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            getTierBadgeStyle()
          )}>
            {tier}
          </span>
        </div>
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
        <div className="space-y-1">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-xl font-bold text-sky-600">
            {price.toLocaleString("cs-CZ")} Kč
          </p>
        </div>

        <div className="space-y-3">
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
                <Check className="h-4 w-4 mr-2 text-sky-500 shrink-0" />
                {highlight}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 p-3 bg-sky-500/5 rounded-lg">
            <Info className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
            <p className="text-sm text-sky-700">{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
