
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  initialState?: boolean;
  compact?: boolean;
}

export const FavoriteButton = ({ 
  initialState = false, 
  compact = false 
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  return (
    <button
      onClick={() => setIsFavorite(!isFavorite)}
      className={cn(
        compact ? "p-1" : "p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors dark:bg-black/60 dark:hover:bg-black/80"
      )}
    >
      <Star 
        className={cn(
          compact ? "h-4 w-4" : "h-5 w-5",
          isFavorite ? "fill-[#FFB612] text-[#FFB612]" : "text-muted-foreground"
        )} 
      />
    </button>
  );
};
