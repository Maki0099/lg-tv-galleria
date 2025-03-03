
import { useTranslation } from "react-i18next";
import { ModelSeriesCard } from "./ModelSeriesCard";
import { technologyInfo, getModelSeriesByTechnology } from "@/utils/tv";

interface TechnologySectionProps {
  technology: string;
}

export const TechnologySection = ({ technology }: TechnologySectionProps) => {
  const { t } = useTranslation();
  const techInfo = technologyInfo[technology as keyof typeof technologyInfo];
  const modelSeries = getModelSeriesByTechnology(technology);
  
  // Funkce pro výběr barvy pozadí podle technologie
  const getBgColor = (tech: string) => {
    switch(tech) {
      case "OLED":
        return "bg-gradient-to-br from-[#001744]/5 to-[#001744]/10";
      case "QNED":
        return "bg-gradient-to-br from-[#FFB612]/5 to-[#FFB612]/10";
      case "NanoCell":
        return "bg-gradient-to-br from-[#001744]/5 to-[#FFB612]/5";
      case "LED":
        return "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/10 dark:to-gray-900/20";
      default:
        return "bg-transparent";
    }
  };

  // Funkce pro výběr barvy textu podle technologie
  const getTitleColor = (tech: string) => {
    switch(tech) {
      case "OLED":
        return "text-[#001744] dark:text-[#001744]/90";
      case "QNED":
        return "text-[#FFB612] dark:text-[#FFB612]";
      case "NanoCell":
        return "text-[#001744] dark:text-[#FFB612]/90";
      case "LED":
        return "text-[#FFB612] dark:text-[#FFB612]/90";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  // Ikony pro jednotlivé technologie
  const getTechIcon = (tech: string) => {
    switch(tech) {
      case "OLED":
        return (
          <div className="h-8 w-8 rounded-full bg-[#001744] flex items-center justify-center">
            <span className="text-white font-bold text-xs">OLED</span>
          </div>
        );
      case "QNED":
        return (
          <div className="h-8 w-8 rounded-full bg-[#FFB612] flex items-center justify-center">
            <span className="text-[#001744] font-bold text-xs">QNED</span>
          </div>
        );
      case "NanoCell":
        return (
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#001744] to-[#FFB612] flex items-center justify-center">
            <span className="text-white font-bold text-xs">NANO</span>
          </div>
        );
      case "LED":
        return (
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">LED</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (!techInfo) return null;

  return (
    <section id={technology} className={`mb-12 p-6 rounded-lg ${getBgColor(technology)}`}>
      <div className="flex items-center gap-3 mb-2">
        {getTechIcon(technology)}
        <h2 className={`text-2xl font-bold ${getTitleColor(technology)}`}>
          {technology} {t("technology.title", { defaultValue: "Technologie" })}
        </h2>
      </div>
      
      <div className="mb-4">
        <p className="text-muted-foreground">{techInfo.description}</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {techInfo.highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="p-3 bg-white/60 dark:bg-black/20 rounded-md flex items-center gap-2 shadow-sm"
            >
              <div className={`h-2 w-2 rounded-full 
                ${technology === "OLED" ? "bg-[#001744]" : 
                  technology === "QNED" ? "bg-[#FFB612]" : 
                  technology === "NanoCell" ? "bg-[#001744]" : "bg-[#FFB612]"}`}
              />
              <span className="text-sm text-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-4">{t("technology.modelSeries", { defaultValue: "Modelové řady" })}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modelSeries.map(series => (
            <ModelSeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
    </section>
  );
};
