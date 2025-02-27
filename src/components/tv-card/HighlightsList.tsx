
import { Check } from "lucide-react";

interface HighlightsListProps {
  highlights: string[];
}

export const HighlightsList = ({ highlights }: HighlightsListProps) => {
  return (
    <div className="space-y-1">
      {highlights.map((highlight) => (
        <div key={highlight} className="flex items-center text-sm text-muted-foreground">
          <Check className="h-4 w-4 mr-2 text-[#FFB612] dark:text-[#FFB612] shrink-0" />
          {highlight}
        </div>
      ))}
    </div>
  );
};
