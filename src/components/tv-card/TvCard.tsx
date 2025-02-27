
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useView } from "../ViewContext";
import { TvModel } from "@/data/tvData";
import { DetailedTvCard } from "./DetailedTvCard";
import { CompactTvCard } from "./CompactTvCard";

type TvCardProps = TvModel;

export const TvCard = (props: TvCardProps) => {
  const { isCompactView } = useView();
  
  // Určení barvy pozadí podle série
  const getSeriesStyle = () => {
    switch (props.series) {
      case "OLED":
        return "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800";
      case "QNED":
        return "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 dark:from-sky-950 dark:to-sky-900 dark:border-sky-800";
      case "NanoCell":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800";
      case "LED":
        return "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 dark:from-slate-950 dark:to-slate-900 dark:border-slate-800";
      default:
        return "bg-card dark:bg-card";
    }
  };

  return isCompactView 
    ? <CompactTvCard {...props} getSeriesStyle={getSeriesStyle} /> 
    : <DetailedTvCard {...props} getSeriesStyle={getSeriesStyle} />;
};
