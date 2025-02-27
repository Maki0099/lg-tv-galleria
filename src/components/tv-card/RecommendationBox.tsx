
import { Info } from "lucide-react";

interface RecommendationBoxProps {
  recommendation: string;
}

export const RecommendationBox = ({ recommendation }: RecommendationBoxProps) => {
  return (
    <div className="flex items-start gap-2 p-3 bg-[#001744]/5 rounded-lg dark:bg-[#FFB612]/10">
      <Info className="h-5 w-5 text-[#001744] dark:text-[#FFB612] shrink-0 mt-0.5" />
      <p className="text-sm text-[#001744] dark:text-[#FFB612]">{recommendation}</p>
    </div>
  );
};
