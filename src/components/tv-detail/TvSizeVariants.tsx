
import { TvModel } from "@/data/tvData";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface TvSizeVariantsProps {
  currentTv: TvModel;
  variants: TvModel[];
}

export const TvSizeVariants = ({ currentTv, variants }: TvSizeVariantsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  if (variants.length === 0) {
    return null;
  }
  
  // Všechny velikostní varianty včetně aktuálního TV
  const allSizeVariants = [currentTv, ...variants];

  return (
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
              sizeTv.id === currentTv.id 
                ? "border-[#FFB612] dark:border-[#FFB612] shadow-md" 
                : "border-[#EAEAEA] dark:border-[#333333]"
            )}
            onClick={() => navigate(`/tv/${sizeTv.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{sizeTv.title}</h3>
                {sizeTv.id === currentTv.id && (
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
                  className={sizeTv.id === currentTv.id 
                    ? "opacity-50 cursor-not-allowed" 
                    : "border-[#001744] text-[#001744] hover:bg-[#001744] hover:text-white dark:border-[#FFB612] dark:text-[#FFB612] dark:hover:bg-[#FFB612] dark:hover:text-[#001744]"}
                  disabled={sizeTv.id === currentTv.id}
                >
                  {sizeTv.id === currentTv.id ? t("tvDetail.viewing") : t("tvDetail.view")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
