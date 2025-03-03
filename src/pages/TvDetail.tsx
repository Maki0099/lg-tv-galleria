
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findSizeVariants } from "@/utils/tv";
import { useTvData } from "@/hooks/useTvData";
import { Navigation } from "@/components/Navigation";
import { TvHeader } from "@/components/tv-detail/TvHeader";
import { TvSpecifications } from "@/components/tv-detail/TvSpecifications";
import { TvSizeVariants } from "@/components/tv-detail/TvSizeVariants";
import { TvSeries } from "@/components/tv-detail/TvSeries";

const TvDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, data: tvs, getTvById } = useTvData();

  const tv = getTvById(Number(id));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB612]"></div>
        </div>
      </div>
    );
  }

  if (!tv) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#001744] dark:text-[#FFB612] mb-6 hover:opacity-80"
          >
            <ChevronLeft className="h-5 w-5" />
            {t("navigation.back")}
          </button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">TV nebyla nalezena</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Požadovaný model TV neexistuje nebo byl odstraněn.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="mt-6 bg-[#001744] hover:bg-[#001744]/90 text-white dark:bg-[#FFB612] dark:text-[#001744] dark:hover:bg-[#FFB612]/90"
            >
              Zpět na hlavní stránku
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Find all TVs from the same series
  const seriesTvs = tvs.filter(
    (seriesTv) => seriesTv.series === tv.series && seriesTv.id !== tv.id && seriesTv.modelNumber !== tv.modelNumber
  );

  // Najít varianty stejného modelu v různých velikostech
  const sizeVariants = findSizeVariants(tv, tvs);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#001744] dark:text-[#FFB612] mb-6 hover:opacity-80"
        >
          <ChevronLeft className="h-5 w-5" />
          {t("navigation.back")}
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hlavička s informacemi o TV */}
          <TvHeader tv={tv} />

          {/* Specifikace TV */}
          <TvSpecifications tv={tv} />
        </div>

        {/* Velikostní varianty */}
        <TvSizeVariants currentTv={tv} variants={sizeVariants} />

        {/* Další TV ze stejné série */}
        <TvSeries tv={tv} seriesTvs={seriesTvs} />
      </div>
    </div>
  );
};

export default TvDetail;
