
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: string;
  compact?: boolean;
}

export const TierBadge = ({ tier, compact = false }: TierBadgeProps) => {
  const getTierBadgeStyle = () => {
    switch (tier) {
      case "Premium":
        return "bg-amber-500 text-white";
      case "High-end":
        return "bg-sky-500 text-white";
      case "Mid-range":
        return "bg-blue-500 text-white";
      case "Entry":
        return "bg-slate-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span className={cn(
      compact 
        ? "px-1 py-0.5 rounded text-[10px] font-medium" 
        : "px-2 py-1 rounded text-xs font-medium",
      getTierBadgeStyle()
    )}>
      {tier}
    </span>
  );
};
