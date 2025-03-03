
import { useTranslation } from "react-i18next";
import { groupTvsByTechnology } from "@/utils/tvUtils";
import { TvSeriesSection } from "./TvSeriesSection";
import { useTvData } from "@/hooks/useTvData";

export const TvGrid = () => {
  const { t } = useTranslation();
  const { loading, error, data: tvData } = useTvData();
  
  const groupedTvs = groupTvsByTechnology(tvData);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-16">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB612]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-16">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Chyba při načítání dat
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {error.message || 'Nepodařilo se načíst data o televizích.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {Object.entries(groupedTvs).length > 0 ? (
        Object.entries(groupedTvs).map(([series, seriesTvs]) => (
          <TvSeriesSection 
            key={series}
            series={series}
            tvs={seriesTvs}
            description={t(`tvSeries.${series}.description`, { defaultValue: "" })}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[#001744] dark:text-gray-300">
            Nebyly nalezeny žádné televizory
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Zkontrolujte prosím připojení k databázi nebo přidejte data do tabulky.
          </p>
        </div>
      )}
    </div>
  );
};
