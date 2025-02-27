
import { cn } from "@/lib/utils";

interface FeatureTagsProps {
  features: string[];
  compact?: boolean;
  limit?: number;
}

export const FeatureTags = ({ 
  features, 
  compact = false,
  limit
}: FeatureTagsProps) => {
  const displayedFeatures = limit ? features.slice(0, limit) : features;
  const hasMore = limit ? features.length > limit : false;
  
  return (
    <div className="flex flex-wrap gap-1">
      {displayedFeatures.map((feature) => (
        <span 
          key={feature}
          className={cn(
            "inline-flex items-center rounded-full text-xs font-medium bg-[#001744]/10 text-[#001744] dark:bg-[#FFB612]/20 dark:text-[#FFB612]",
            compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1"
          )}
        >
          {feature}
        </span>
      ))}
      {hasMore && (
        <span className={cn(
          "inline-flex items-center rounded-full text-xs font-medium bg-[#001744]/10 text-[#001744] dark:bg-[#FFB612]/20 dark:text-[#FFB612]",
          compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1"
        )}>
          +{features.length - limit}
        </span>
      )}
    </div>
  );
};
