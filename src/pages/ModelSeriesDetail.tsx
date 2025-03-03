
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { getModelSeriesById } from "@/utils/tv";
import { ModelSeriesHeader } from "@/components/model-series/ModelSeriesHeader";
import { ModelSeriesTvList } from "@/components/model-series/ModelSeriesTvList";
import { useTvRepository } from "@/hooks/useTvRepository";
import { TvModel } from "@/data/models/TvModel";

const ModelSeriesDetail = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, isReady, repository } = useTvRepository();
  const [seriesTvs, setSeriesTvs] = useState<TvModel[]>([]);

  // Získání informací o modelové řadě
  const seriesInfo = seriesId ? getModelSeriesById(seriesId) : null;
  
  // Fetch TVs for this series when repository is ready
  useEffect(() => {
    const fetchTvs = async () => {
      if (isReady && repository && seriesId) {
        const tvs = await repository.getTvsByModelNumber(seriesId);
        // Sort by size (largest first)
        setSeriesTvs(repository.sortTvsBySize(tvs, false));
      }
    };
    
    fetchTvs();
  }, [isReady, repository, seriesId]);

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

  if (!seriesInfo) {
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
            <h1 className="text-2xl font-bold">Modelová řada nebyla nalezena</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Požadovaná modelová řada neexistuje nebo byla odstraněna.
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="flex items-center gap-2 text-[#001744] dark:text-[#FFB612] mb-6 hover:opacity-80"
        >
          <ChevronLeft className="h-5 w-5" />
          {t("navigation.back")}
        </Link>

        {/* Hlavička s informacemi o modelové řadě */}
        <ModelSeriesHeader seriesInfo={seriesInfo} />

        {/* Seznam televizí v dané modelové řadě */}
        <ModelSeriesTvList tvs={seriesTvs} />
      </div>
    </div>
  );
};

export default ModelSeriesDetail;
