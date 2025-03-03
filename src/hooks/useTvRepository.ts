
import { useState, useEffect } from "react";
import { TvRepository, TvFilters } from "@/data/repositories/TvRepository";
import { TvModel } from "@/data/models/TvModel";
import { useTvData } from "./useTvData";

export const useTvRepository = () => {
  const { loading, error, data } = useTvData();
  const [repository, setRepository] = useState<TvRepository | null>(null);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const repo = new TvRepository(data);
      setRepository(repo);
    }
  }, [loading, data]);

  // Wait until the repository is ready
  const isReady = !loading && repository !== null;

  return {
    loading,
    error,
    repository,
    isReady,
    // Helper methods that unwrap the Promises for convenience in components
    getAllTvs: async () => isReady ? await repository!.getAllTvs() : [],
    getTvById: async (id: number) => isReady ? await repository!.getTvById(id) : undefined,
    getTvsBySeries: async (series: string) => isReady ? await repository!.getTvsBySeries(series) : [],
    getTvsByTier: async (tier: string) => isReady ? await repository!.getTvsByTier(tier) : [],
    getTvsByModelNumber: async (modelNumber: string) => isReady ? await repository!.getTvsByModelNumber(modelNumber) : [],
    getTvsByPriceRange: async (minPrice: number, maxPrice: number) => 
      isReady ? await repository!.getTvsByPriceRange(minPrice, maxPrice) : [],
    getFilteredTvs: async (filters: TvFilters) => isReady ? await repository!.getFilteredTvs(filters) : [],
    sortTvsByPrice: (tvs: TvModel[], ascending?: boolean) => 
      isReady ? repository!.sortTvsByPrice(tvs, ascending) : [],
    sortTvsBySize: (tvs: TvModel[], ascending?: boolean) => 
      isReady ? repository!.sortTvsBySize(tvs, ascending) : []
  };
};
