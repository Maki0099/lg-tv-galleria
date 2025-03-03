
import { TvModel } from "@/data/tvData";
import { useTranslation } from "react-i18next";
import { CompactTvCard } from "@/components/tv-card/CompactTvCard";

interface TvSeriesProps {
  tv: TvModel;
  seriesTvs: TvModel[];
}

export const TvSeries = ({ tv, seriesTvs }: TvSeriesProps) => {
  const { t } = useTranslation();
  
  if (seriesTvs.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">
        {t("tvDetail.seriesModels", { series: tv.series })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesTvs.map((seriesTv) => (
          <CompactTvCard key={seriesTv.id} tv={seriesTv} />
        ))}
      </div>
    </div>
  );
};
