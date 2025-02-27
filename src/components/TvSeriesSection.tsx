
import { TvCard } from "./TvCard";
import { useTranslation } from "react-i18next";
import { useView } from "./ViewContext";
import { cn } from "@/lib/utils";
import { TvModel } from "@/data/tvData";

interface TvSeriesSectionProps {
  series: string;
  tvs: TvModel[];
  description: string;
}

export const TvSeriesSection = ({ series, tvs, description }: TvSeriesSectionProps) => {
  const { t } = useTranslation();
  const { isCompactView } = useView();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t(`tvSeries.${series}.name`, series)}</h2>
        <p className="text-lg text-muted-foreground">
          {t(`tvSeries.${series}.description`, description)}
        </p>
      </div>
      <div className={cn(
        "grid gap-6",
        isCompactView 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {tvs.map((tv) => (
          <TvCard key={tv.id} {...tv} />
        ))}
      </div>
    </div>
  );
};
