
import { Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SizeDisplayProps {
  sizes: string[];
  compact?: boolean;
}

export const SizeDisplay = ({ sizes, compact = false }: SizeDisplayProps) => {
  const { t } = useTranslation();
  
  if (sizes.length === 0) return null;
  
  //Convert inches to cm
  const getDisplaySize = (size: string) => {
    const inches = parseInt(size);
    if (!isNaN(inches)) {
      const cm = Math.round(inches * 2.54);
      return `${inches}" (${cm} cm)`;
    }
    return size;
  };
  
  if (compact) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-700">
        <Monitor className="h-4 w-4 text-gray-500" />
        <p className="truncate">{getDisplaySize(sizes[0])}</p>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <Monitor className="h-4 w-4 text-gray-500" />
      <p>{t('tvCard.availableSizes')}: {sizes.map(getDisplaySize).join(", ")}</p>
    </div>
  );
};
