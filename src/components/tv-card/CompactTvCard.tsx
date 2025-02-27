
import { TvModel } from "@/data/tvData";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { TierBadge } from "./TierBadge";
import { FavoriteButton } from "./FavoriteButton";
import { FeatureTags } from "./FeatureTags";
import { SizeDisplay } from "./SizeDisplay";
import { useNavigate } from "react-router-dom";

interface CompactTvCardProps {
  tv: TvModel;
  className?: string;
  compact?: boolean;
}

export const CompactTvCard = ({ tv, className }: CompactTvCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSeriesStyle = () => {
    switch(tv.series) {
      case "OLED":
        return "border-[#001744] dark:border-[#FFB612]";
      case "QNED":
        return "border-blue-500";
      case "NanoCell":
        return "border-green-500";
      case "LED":
        return "border-gray-500";
      default:
        return "border-gray-300";
    }
  };
  
  return (
    <div 
      className={cn(
        "card-hover relative rounded-lg overflow-hidden border cursor-pointer",
        getSeriesStyle(),
        className
      )}
      onClick={() => navigate(`/tv/${tv.id}`)}
    >
      <div className="flex">
        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
          <img 
            src={tv.image} 
            alt={tv.title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-1 left-1">
            <TierBadge tier={tv.tier} compact />
          </div>
        </div>
        
        <div className="p-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-sm">{tv.title}</h3>
              <div onClick={(e) => e.stopPropagation()}>
                <FavoriteButton compact />
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{tv.subtitle}</p>
          </div>
          
          <div className="mt-auto">
            <p className="text-sm font-bold text-[#001744] dark:text-[#FFB612]">
              {tv.price.toLocaleString("cs-CZ")} {t('tvCard.price')}
            </p>
            
            <SizeDisplay sizes={tv.sizes || []} compact />
            
            <div className="flex flex-wrap gap-1 mt-1">
              <FeatureTags features={tv.features} compact limit={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
