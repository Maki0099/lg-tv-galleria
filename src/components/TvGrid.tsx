
import { useTranslation } from "react-i18next";
import { tvs } from "@/data/tvData";
import { groupTvsByCategories } from "@/utils/tvUtils";
import { TvSeriesSection } from "./TvSeriesSection";

export const TvGrid = () => {
  const { t } = useTranslation();
  
  const groupedTvs = groupTvsByCategories(tvs);

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {Object.entries(groupedTvs).map(([series, seriesTvs]) => (
        <TvSeriesSection 
          key={series}
          series={series}
          tvs={seriesTvs}
          description={t(`tvSeries.${series}.description`, { defaultValue: "" })}
        />
      ))}
    </div>
  );
};
