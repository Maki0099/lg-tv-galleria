
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === "cs" ? "en" : "cs";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="flex items-center gap-1"
    >
      <Globe className="h-4 w-4" />
      {i18n.language === "cs" ? "EN" : "CS"}
    </Button>
  );
};
