
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ModelSeriesProps {
  series: {
    id: string;
    name: string;
    technology: string;
    description: string;
    highlights: string[];
    sizes: string[];
  };
}

export const ModelSeriesCard = ({ series }: ModelSeriesProps) => {
  const { t } = useTranslation();
  
  // Funkce pro výběr barev podle technologie
  const getColorsForTechnology = (tech: string) => {
    switch(tech) {
      case "OLED":
        return {
          bg: "bg-gradient-to-br from-[#001744]/10 to-[#001744]/20 border-[#001744]/40",
          badgeBg: "bg-[#001744]/20",
          badgeText: "text-[#001744]",
          button: "bg-[#001744] hover:bg-[#001744]/80 text-white"
        };
      case "QNED":
        return {
          bg: "bg-gradient-to-br from-[#FFB612]/10 to-[#FFB612]/20 border-[#FFB612]/40",
          badgeBg: "bg-[#FFB612]/20",
          badgeText: "text-[#001744]",
          button: "bg-[#FFB612] hover:bg-[#FFB612]/80 text-[#001744]"
        };
      case "NanoCell":
        return {
          bg: "bg-gradient-to-br from-[#001744]/5 to-[#FFB612]/10 border-[#001744]/30",
          badgeBg: "bg-[#001744]/20",
          badgeText: "text-[#001744]",
          button: "bg-[#001744] hover:bg-[#001744]/80 text-white"
        };
      case "LED":
        return {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100 border-[#FFB612]/30",
          badgeBg: "bg-[#FFB612]/20",
          badgeText: "text-[#001744]",
          button: "bg-[#FFB612] hover:bg-[#FFB612]/80 text-[#001744]"
        };
      default:
        return {
          bg: "bg-card",
          badgeBg: "bg-secondary/20",
          badgeText: "text-secondary",
          button: "bg-primary"
        };
    }
  };
  
  const colors = getColorsForTechnology(series.technology);
  
  return (
    <Card className={cn("border", colors.bg, "transition-all duration-300 hover:shadow-md")}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{series.name}</CardTitle>
          <Badge variant="outline" className={cn(colors.badgeBg, colors.badgeText, "uppercase text-xs")}>
            {series.technology}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {series.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium mb-1">{t("modelSeries.highlights", { defaultValue: "Hlavní přednosti" })}</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              {series.highlights.slice(0, 2).map((highlight, i) => (
                <li key={i} className="text-muted-foreground">{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">{t("modelSeries.availableSizes", { defaultValue: "Dostupné velikosti" })}</p>
            <div className="flex flex-wrap gap-1">
              {series.sizes.map(size => (
                <Badge key={size} variant="secondary" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/model/${series.id}`} className="w-full">
          <Button className={cn("w-full", colors.button)}>
            {t("modelSeries.showModels", { defaultValue: "Zobrazit modely" })}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
