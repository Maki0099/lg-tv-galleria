import { useParams } from "react-router-dom";
import { tvs } from "@/data/tvData";
import { useTranslation } from "react-i18next";
import { RecommendationBox } from "@/components/tv-card/RecommendationBox";
import { FeatureTags } from "@/components/tv-card/FeatureTags";
import { HighlightsList } from "@/components/tv-card/HighlightsList";
import { SizeDisplay } from "@/components/tv-card/SizeDisplay";
import { TierBadge } from "@/components/tv-card/TierBadge";
import { ChevronLeft, Monitor, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CompactTvCard } from "@/components/tv-card/CompactTvCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TvDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tv = tvs.find((tv) => tv.id === Number(id));

  if (!tv) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">TV Not Found</h1>
      </div>
    );
  }

  // Find all TVs from the same series
  const seriesTvs = tvs.filter(
    (seriesTv) => seriesTv.series === tv.series && seriesTv.id !== tv.id
  );

  // Create a gallery of TVs with the same model but different sizes
  const sizeVariants = tvs.filter(
    (sizeTv) => 
      sizeTv.title.split(" ").slice(0, 2).join(" ") === tv.title.split(" ").slice(0, 2).join(" ") && 
      sizeTv.id !== tv.id
  );
  
  const allSizeVariants = [tv, ...sizeVariants];

  return (
    <div className="min-h-screen bg-background">
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

        {/* Size Variants Gallery */}
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
                    "border rounded-lg overflow-hidden",
                    sizeTv.id === tv.id 
                      ? "border-[#FFB612] dark:border-[#FFB612]" 
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
                          {sizeTv.sizes && sizeTv.sizes[0]}
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
