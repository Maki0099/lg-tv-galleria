
import { TvModel } from "@/data/tvData";
import { Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TierBadge } from "@/components/tv-card/TierBadge";

interface TvHeaderProps {
  tv: TvModel;
}

export const TvHeader = ({ tv }: TvHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img 
          src={tv.image} 
          alt={tv.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <TierBadge tier={tv.tier} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{tv.title}</h1>
          <p className="text-xl text-muted-foreground">{tv.subtitle}</p>
        </div>

        <p className="text-2xl font-bold text-[#001744] dark:text-[#FFB612]">
          {tv.price.toLocaleString("cs-CZ")} {t("tvCard.price")}
        </p>

        {/* Enhanced size display */}
        {tv.sizes && tv.sizes.length > 0 && (
          <div className="bg-[#F8F8F8] dark:bg-[#1A1A1A] p-4 rounded-lg border border-[#EAEAEA] dark:border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-5 w-5 text-[#FFB612] dark:text-[#FFB612]" />
              <h3 className="font-medium">{t("tvCard.availableSizes")}:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tv.sizes.map((size) => (
                <div key={size} className="px-3 py-1 bg-white dark:bg-[#2A2A2A] rounded-full border border-[#EAEAEA] dark:border-[#444444] text-sm">
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
