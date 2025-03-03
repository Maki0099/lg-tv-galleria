
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModelSeriesHeaderProps {
  seriesInfo: {
    name: string;
    description: string;
    technology: string;
    highlights: string[];
    sizes: string[];
  };
}

export const ModelSeriesHeader = ({ seriesInfo }: ModelSeriesHeaderProps) => {
  const { t } = useTranslation();

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

  const colors = getColorsForTechnology(seriesInfo.technology);

  return (
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
  );
};
