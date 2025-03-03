
import { useTranslation } from "react-i18next";
import { CompactTvCard } from "@/components/tv-card/CompactTvCard";
import { TvModel } from "@/data/tvData";

interface ModelSeriesTvListProps {
  tvs: TvModel[];
}

export const ModelSeriesTvList = ({ tvs }: ModelSeriesTvListProps) => {
  const { t } = useTranslation();

  if (tvs.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {t("tvDetail.noModels", { defaultValue: "Žádné modely nebyly nalezeny" })}
        </h2>
        
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-muted-foreground">
            Pro tuto modelovou řadu nejsou momentálně dostupné žádné televizory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {t("tvDetail.availableModels", { defaultValue: "Dostupné modely" })}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tvs.map((tv) => (
          <CompactTvCard key={tv.id} tv={tv} />
        ))}
      </div>
    </div>
  );
};
