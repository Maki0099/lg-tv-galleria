
import { TvCard } from "./tv-card/TvCard";
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

  // Funkce pro výběr barvy nadpisu podle série
  const getTitleColor = (series: string) => {
    switch(series) {
      case "OLED":
        return "text-[#001744] dark:text-[#001744]/90";
      case "QNED":
        return "text-[#FFB612] dark:text-[#FFB612]";
      case "NanoCell":
        return "text-[#001744] dark:text-[#FFB612]/90";
      case "LED":
        return "text-[#FFB612] dark:text-[#FFB612]/90";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  // Funkce pro styl pozadí sekce podle série
  const getSectionStyle = (series: string) => {
    switch(series) {
      case "OLED":
        return "border-l-4 border-[#001744] pl-4";
      case "QNED":
        return "border-l-4 border-[#FFB612] pl-4";
      case "NanoCell":
        return "border-l-4 border-[#001744] pl-4";
      case "LED":
        return "border-l-4 border-[#FFB612] pl-4";
      default:
        return "";
    }
  };

  return (
    <div className={cn("space-y-6", getSectionStyle(series))}>
      <div className="space-y-2">
        <h2 className={cn("text-3xl font-bold", getTitleColor(series))}>
          {t(`tvSeries.${series}.name`, { defaultValue: series })}
        </h2>
        <p className="text-lg text-muted-foreground">
          {description}
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
