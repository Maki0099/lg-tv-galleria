
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useView } from "./ViewContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Navigation = () => {
  const { t } = useTranslation();
  const { isCompactView, toggleView } = useView();

  // Function to handle smooth scrolling to technology sections
  const scrollToTechnology = (techId: string) => {
    const element = document.getElementById(techId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b dark:bg-background/90 dark:border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold">{t('brand')}</h1>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToTechnology('OLED')} 
                className="nav-link hover:text-[#001744] dark:hover:text-[#FFB612] transition-colors"
              >
                OLED
              </button>
              <button 
                onClick={() => scrollToTechnology('QNED')}
                className="nav-link hover:text-[#001744] dark:hover:text-[#FFB612] transition-colors"
              >
                QNED
              </button>
              <button 
                onClick={() => scrollToTechnology('NanoCell')}
                className="nav-link hover:text-[#001744] dark:hover:text-[#FFB612] transition-colors"
              >
                NanoCell
              </button>
              <button 
                onClick={() => scrollToTechnology('LED')}
                className="nav-link hover:text-[#001744] dark:hover:text-[#FFB612] transition-colors"
              >
                LED
              </button>
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
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={toggleView}
                      aria-label={t('view.toggle')}
                    >
                      {isCompactView ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isCompactView ? t('view.expandedView') : t('view.compactView')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
