
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CompactTvCard } from "@/components/tv-card/CompactTvCard";
import { useTvData } from "@/hooks/useTvData";
import { getModelSeriesById, getTvsByModelSeries, sortTvsBySizeDescending } from "@/utils/tv";
import { cn } from "@/lib/utils";

const ModelSeriesDetail = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, data: tvs } = useTvData();

  // Získání informací o modelové řadě
  const seriesInfo = seriesId ? getModelSeriesById(seriesId) : null;
  
  // Získání TV patřících do modelové řady
  const seriesTvs = seriesId ? getTvsByModelSeries(tvs, seriesId) : [];
  
  // Seřazení TV podle velikosti úhlopříčky (od největší k nejmenší)
  const sortedTvs = sortTvsBySizeDescending(seriesTvs);

  // Funkce pro výběr barev podle technologie
  const getColorsForTechnology = (tech: string) => {
    switch(tech) {
      case "OLED":
        return {
          bg: "bg-gradient-to-br from-[#001744]/10 to-[#001744]/20 border-[#001744]/40",
          badgeBg: "bg-[#001744]",
          badgeText: "text-white",
          highlight: "bg-[#001744]/5",
          bulletColor: "text-[#001744]"
        };
      case "QNED":
        return {
          bg: "bg-gradient-to-br from-[#FFB612]/10 to-[#FFB612]/20 border-[#FFB612]/40",
          badgeBg: "bg-[#FFB612]",
          badgeText: "text-[#001744]",
          highlight: "bg-[#FFB612]/5",
          bulletColor: "text-[#FFB612]"
        };
      case "NanoCell":
        return {
          bg: "bg-gradient-to-br from-[#001744]/5 to-[#FFB612]/10 border-[#001744]/30",
          badgeBg: "bg-[#001744]",
          badgeText: "text-white",
          highlight: "bg-[#001744]/5",
          bulletColor: "text-[#001744]"
        };
      case "LED":
        return {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100 border-[#FFB612]/30",
          badgeBg: "bg-[#FFB612]",
          badgeText: "text-[#001744]",
          highlight: "bg-gray-50",
          bulletColor: "text-[#FFB612]"
        };
      default:
        return {
          bg: "bg-card",
          badgeBg: "bg-secondary",
          badgeText: "text-secondary-foreground",
          highlight: "bg-secondary/5",
          bulletColor: "text-secondary"
        };
    }
  };

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

  const colors = getColorsForTechnology(seriesInfo.technology);

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
        <Card className={cn("border mb-10", colors.bg)}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{seriesInfo.name}</h1>
                    <p className="text-lg text-muted-foreground mt-1">{seriesInfo.description}</p>
                  </div>
                  <Badge className={cn(colors.badgeBg, colors.badgeText, "uppercase ml-2")}>
                    {seriesInfo.technology}
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-3">{t("modelSeries.highlights", { defaultValue: "Hlavní přednosti" })}</h2>
                  <ul className="space-y-2">
                    {seriesInfo.highlights.map((highlight: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className={cn("inline-block w-2 h-2 rounded-full mt-1.5 mr-2", colors.bulletColor)}></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4 md:w-1/3">
                <div className={cn("p-4 rounded-lg", colors.highlight)}>
                  <h3 className="font-medium mb-3">{t("sizes.title", { defaultValue: "Velikosti" })}</h3>
                  <div className="flex flex-wrap gap-2">
                    {seriesInfo.sizes.map((size: string) => (
                      <div key={size} className={cn(
                        "px-4 py-2 rounded-full text-center font-medium",
                        colors.badgeBg, colors.badgeText
                      )}>
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("sizes.diagonal", { defaultValue: "úhlopříčka" })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seznam televizí v dané modelové řadě */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {seriesTvs.length > 0 
              ? t("tvDetail.availableModels", { defaultValue: "Dostupné modely" }) 
              : t("tvDetail.noModels", { defaultValue: "Žádné modely nebyly nalezeny" })}
          </h2>

          {seriesTvs.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-lg text-muted-foreground">
                Pro tuto modelovou řadu nejsou momentálně dostupné žádné televizory.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTvs.map((tv) => (
                <CompactTvCard key={tv.id} tv={tv} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelSeriesDetail;
