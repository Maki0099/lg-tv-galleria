
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-accent"
      title={t('theme.toggle')}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#FFB612]" />
      ) : (
        <Moon className="h-5 w-5 text-[#001744]" />
      )}
    </Button>
  );
}
