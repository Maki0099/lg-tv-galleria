
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold">{t('brand')}</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="nav-link">{t('navigation.news')}</a>
              <a href="#" className="nav-link">OLED</a>
              <a href="#" className="nav-link">QNED</a>
              <a href="#" className="nav-link">LED</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Input 
                type="search" 
                placeholder={t('navigation.search')}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};
