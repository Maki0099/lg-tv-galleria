
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RecommendationBox } from "@/components/tv-card/RecommendationBox";
import { FeatureTags } from "@/components/tv-card/FeatureTags";
import { HighlightsList } from "@/components/tv-card/HighlightsList";
import { TierBadge } from "@/components/tv-card/TierBadge";
import { ChevronLeft, Monitor, Star } from "lucide-react";
import { CompactTvCard } from "@/components/tv-card/CompactTvCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { findSizeVariants } from "@/utils/tvUtils";
import { useTvData } from "@/hooks/useTvData";
import { Navigation } from "@/components/Navigation";

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
  
  // Všechny velikostní varianty včetně aktuálního TV
  const allSizeVariants = [tv, ...sizeVariants];

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

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t("tvDetail.specifications")}</h2>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-medium mb-2">{t("tvDetail.features")}</h3>
                  <FeatureTags features={tv.features} />
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t("tvDetail.highlights")}</h3>
                  <HighlightsList highlights={tv.highlights} />
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t("tvDetail.recommendation")}</h3>
                  <RecommendationBox recommendation={tv.recommendation} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Variants Gallery - pouze velikostní varianty stejného modelu */}
        {sizeVariants.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              {t("tvDetail.availableSizes")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSizeVariants.map((sizeTv) => (
                <div 
                  key={sizeTv.id} 
                  className={cn(
                    "border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all",
                    sizeTv.id === tv.id 
                      ? "border-[#FFB612] dark:border-[#FFB612] shadow-md" 
                      : "border-[#EAEAEA] dark:border-[#333333]"
                  )}
                  onClick={() => navigate(`/tv/${sizeTv.id}`)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{sizeTv.title}</h3>
                      {sizeTv.id === tv.id && (
                        <span className="px-2 py-1 bg-[#FFB612] text-[#001744] text-xs font-medium rounded">
                          {t("tvDetail.selected")}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-[#FFB612] text-[#FFB612]" />
                      <Star className="h-4 w-4 fill-[#FFB612] text-[#FFB612]" />
                      <Star className="h-4 w-4 fill-[#FFB612] text-[#FFB612]" />
                      <Star className="h-4 w-4 fill-[#FFB612] text-[#FFB612]" />
                      <Star className="h-4 w-4 fill-[#FFB612] text-[#FFB612]" />
                      <span className="text-sm text-muted-foreground ml-1">4.9</span>
                    </div>
                    
                    <div className="relative aspect-video mb-4 rounded overflow-hidden">
                      <img 
                        src={sizeTv.image} 
                        alt={sizeTv.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-[#FFB612] text-[#001744] text-xs font-medium px-2 py-1 rounded">
                          {sizeTv.title.split(" ").pop()?.replace(/"/g, "")}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {sizeTv.features.slice(0, 3).map((feature, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-[#F8F8F8] dark:bg-[#1A1A1A] text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-[#001744] dark:text-[#FFB612]">
                        {sizeTv.price.toLocaleString("cs-CZ")} {t("tvCard.price")}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={sizeTv.id === tv.id 
                          ? "opacity-50 cursor-not-allowed" 
                          : "border-[#001744] text-[#001744] hover:bg-[#001744] hover:text-white dark:border-[#FFB612] dark:text-[#FFB612] dark:hover:bg-[#FFB612] dark:hover:text-[#001744]"}
                        disabled={sizeTv.id === tv.id}
                      >
                        {sizeTv.id === tv.id ? t("tvDetail.viewing") : t("tvDetail.view")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other TVs from the same series */}
        {seriesTvs.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default TvDetail;
