
import { Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SizeDisplayProps {
  sizes: string[];
  compact?: boolean;
}

export const SizeDisplay = ({ sizes, compact = false }: SizeDisplayProps) => {
  const { t } = useTranslation();
  
  if (sizes.length === 0) return null;
  
  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Monitor className="h-3 w-3 text-[#FFB612] dark:text-[#FFB612]" />
        <p className="truncate">{sizes.join(", ")}</p>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Monitor className="h-4 w-4 text-[#FFB612] dark:text-[#FFB612]" />
      <p>{t('tvCard.availableSizes')}: {sizes.join(", ")}</p>
    </div>
  );
};
