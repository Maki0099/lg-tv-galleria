
import { useState } from "react";
import { Star, Check, Info, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useView } from "./ViewContext";

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
  sizes?: string[];
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
  recommendation,
  sizes = []
}: TvCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const { isCompactView } = useView();

  // Určení barvy pozadí podle série
  const getSeriesStyle = () => {
    switch (series) {
      case "OLED":
        return "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800";
      case "QNED":
        return "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 dark:from-sky-950 dark:to-sky-900 dark:border-sky-800";
      case "NanoCell":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800";
      case "LED":
        return "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 dark:from-slate-950 dark:to-slate-900 dark:border-slate-800";
      default:
        return "bg-card dark:bg-card";
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

  if (isCompactView) {
    return (
      <div className={cn(
        "card-hover relative rounded-lg overflow-hidden border",
        getSeriesStyle()
      )}>
        <div className="flex">
          <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-1 left-1">
              <span className={cn(
                "px-1 py-0.5 rounded text-[10px] font-medium",
                getTierBadgeStyle()
              )}>
                {tier}
              </span>
            </div>
          </div>
          
          <div className="p-2 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{title}</h3>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-1"
                >
                  <Star 
                    className={cn(
                      "h-4 w-4",
                      isFavorite ? "fill-sky-500 text-sky-500" : "text-muted-foreground"
                    )} 
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{subtitle}</p>
            </div>
            
            <div className="mt-auto">
              <p className="text-sm font-bold text-sky-600 dark:text-sky-400">
                {price.toLocaleString("cs-CZ")} {t('tvCard.price')}
              </p>
              
              {sizes.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Monitor className="h-3 w-3 text-sky-500 dark:text-sky-400" />
                  <p className="truncate">{sizes.join(", ")}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mt-1">
                {features.slice(0, 2).map((feature) => (
                  <span 
                    key={feature}
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full 
                             text-[10px] font-medium bg-sky-500/10 text-sky-700
                             dark:bg-sky-500/20 dark:text-sky-300"
                  >
                    {feature}
                  </span>
                ))}
                {features.length > 2 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full 
                                 text-[10px] font-medium bg-sky-500/10 text-sky-700
                                 dark:bg-sky-500/20 dark:text-sky-300">
                    +{features.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                     backdrop-blur-sm hover:bg-background transition-colors
                     dark:bg-black/60 dark:hover:bg-black/80"
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
          <p className="text-xl font-bold text-sky-600 dark:text-sky-400">
            {price.toLocaleString("cs-CZ")} {t('tvCard.price')}
          </p>
        </div>

        <div className="space-y-3">
          {sizes.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Monitor className="h-4 w-4 text-sky-500 dark:text-sky-400" />
              <p>{t('tvCard.availableSizes')}: {sizes.join(", ")}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {features.map((feature) => (
              <span 
                key={feature}
                className="inline-flex items-center px-2 py-1 rounded-full 
                         text-xs font-medium bg-sky-500/10 text-sky-700
                         dark:bg-sky-500/20 dark:text-sky-300"
              >
                {feature}
              </span>
            ))}
          </div>
          
          <div className="space-y-1">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center text-sm text-muted-foreground">
                <Check className="h-4 w-4 mr-2 text-sky-500 dark:text-sky-400 shrink-0" />
                {highlight}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 p-3 bg-sky-500/5 rounded-lg dark:bg-sky-500/10">
            <Info className="h-5 w-5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
            <p className="text-sm text-sky-700 dark:text-sky-300">{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
