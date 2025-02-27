
import { TvModel } from "@/data/tvData";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { TierBadge } from "./TierBadge";
import { FavoriteButton } from "./FavoriteButton";
import { FeatureTags } from "./FeatureTags";
import { HighlightsList } from "./HighlightsList";
import { RecommendationBox } from "./RecommendationBox";
import { SizeDisplay } from "./SizeDisplay";

interface DetailedTvCardProps extends TvModel {
  getSeriesStyle: () => string;
}

export const DetailedTvCard = ({ 
  title, 
  subtitle, 
  image, 
  price, 
  tier, 
  features, 
  highlights, 
  recommendation, 
  sizes = [], 
  getSeriesStyle 
}: DetailedTvCardProps) => {
  const { t } = useTranslation();
  
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
          <TierBadge tier={tier} />
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton />
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-xl font-bold text-[#001744] dark:text-[#FFB612]">
            {price.toLocaleString("cs-CZ")} {t('tvCard.price')}
          </p>
        </div>

        <div className="space-y-3">
          <SizeDisplay sizes={sizes} />
          <FeatureTags features={features} />
          <HighlightsList highlights={highlights} />
          <RecommendationBox recommendation={recommendation} />
        </div>
      </div>
    </div>
  );
};
