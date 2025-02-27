
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
const getSeriesStyle = () => {
  return "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800";
};
