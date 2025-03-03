
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useView } from "../ViewContext";
import { TvModel } from "@/data/tvData";
import { DetailedTvCard } from "./DetailedTvCard";
import { CompactTvCard } from "./CompactTvCard";

type TvCardProps = TvModel;

export const TvCard = (props: TvCardProps) => {
  const { isCompactView } = useView();
  
  return isCompactView 
    ? <CompactTvCard tv={props} /> 
    : <DetailedTvCard {...props} getSeriesStyle={getSeriesStyle} />;
};

// Helper function to determine background style based on TV series
const getSeriesStyle = (series?: string) => {
  switch(series) {
    case "OLED":
      return "bg-gradient-to-br from-[#001744]/10 to-[#001744]/20 border-[#001744]/40 dark:from-[#001744]/70 dark:to-[#001744]/90 dark:border-[#001744]/60";
    case "QNED":
      return "bg-gradient-to-br from-[#FFB612]/10 to-[#FFB612]/20 border-[#FFB612]/40 dark:from-[#FFB612]/30 dark:to-[#FFB612]/40 dark:border-[#FFB612]/60";
    case "NanoCell":
      return "bg-gradient-to-br from-[#001744]/5 to-[#FFB612]/10 border-[#001744]/30 dark:from-[#001744]/30 dark:to-[#FFB612]/20 dark:border-[#FFB612]/40";
    case "LED":
      return "bg-gradient-to-br from-gray-50 to-gray-100 border-[#FFB612]/30 dark:from-gray-900/40 dark:to-gray-900/60 dark:border-[#FFB612]/40";
    default:
      return "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800";
  }
};
