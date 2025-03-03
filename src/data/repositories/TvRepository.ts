
import { TvModel } from "@/data/models/TvModel";

// Repository interface
export interface ITvRepository {
  // Basic queries
  getAllTvs(): Promise<TvModel[]>;
  getTvById(id: number): Promise<TvModel | undefined>;
  
  // Filtering by properties
  getTvsBySeries(series: string): Promise<TvModel[]>;
  getTvsByTier(tier: string): Promise<TvModel[]>;
  getTvsByModelNumber(modelNumber: string): Promise<TvModel[]>;
  getTvsByPriceRange(minPrice: number, maxPrice: number): Promise<TvModel[]>;
  
  // Combined/advanced filtering
  getFilteredTvs(filters: TvFilters): Promise<TvModel[]>;
  
  // Sorting
  sortTvsByPrice(tvs: TvModel[], ascending?: boolean): TvModel[];
  sortTvsBySize(tvs: TvModel[], ascending?: boolean): TvModel[];
}

// Filter options
export interface TvFilters {
  series?: string[];
  tier?: string[];
  modelNumber?: string[];
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  sizes?: string[];
}

// Implementation of the repository
export class TvRepository implements ITvRepository {
  private tvs: TvModel[] = [];
  private isInitialized: boolean = false;

  constructor(initialTvs: TvModel[] = []) {
    this.tvs = initialTvs;
    this.isInitialized = initialTvs.length > 0;
  }

  // Initialize or update repository with new TV data
  async initialize(tvs: TvModel[]): Promise<void> {
    this.tvs = tvs;
    this.isInitialized = true;
  }

  // Check if repository is initialized
  isReady(): boolean {
    return this.isInitialized;
  }

  // Basic queries
  async getAllTvs(): Promise<TvModel[]> {
    return [...this.tvs];
  }

  async getTvById(id: number): Promise<TvModel | undefined> {
    return this.tvs.find(tv => tv.id === id);
  }

  // Filtering by properties
  async getTvsBySeries(series: string): Promise<TvModel[]> {
    return this.tvs.filter(tv => tv.series === series);
  }

  async getTvsByTier(tier: string): Promise<TvModel[]> {
    return this.tvs.filter(tv => tv.tier === tier);
  }

  async getTvsByModelNumber(modelNumber: string): Promise<TvModel[]> {
    return this.tvs.filter(tv => tv.modelNumber === modelNumber);
  }

  async getTvsByPriceRange(minPrice: number, maxPrice: number): Promise<TvModel[]> {
    return this.tvs.filter(tv => tv.price >= minPrice && tv.price <= maxPrice);
  }

  // Combined/advanced filtering
  async getFilteredTvs(filters: TvFilters): Promise<TvModel[]> {
    return this.tvs.filter(tv => {
      // Filter by series
      if (filters.series && filters.series.length > 0 && !filters.series.includes(tv.series)) {
        return false;
      }

      // Filter by tier
      if (filters.tier && filters.tier.length > 0 && !filters.tier.includes(tv.tier)) {
        return false;
      }

      // Filter by model number
      if (filters.modelNumber && filters.modelNumber.length > 0 && 
          !filters.modelNumber.includes(tv.modelNumber || '')) {
        return false;
      }

      // Filter by price range
      if (filters.minPrice !== undefined && tv.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && tv.price > filters.maxPrice) {
        return false;
      }

      // Filter by features
      if (filters.features && filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(feature => 
          tv.features.some(tvFeature => 
            tvFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
        if (!hasAllFeatures) return false;
      }

      // Filter by sizes
      if (filters.sizes && filters.sizes.length > 0 && tv.sizes) {
        const hasSomeSize = filters.sizes.some(size => 
          tv.sizes?.includes(size)
        );
        if (!hasSomeSize) return false;
      }

      return true;
    });
  }

  // Sorting methods
  sortTvsByPrice(tvs: TvModel[], ascending: boolean = true): TvModel[] {
    return [...tvs].sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });
  }

  sortTvsBySize(tvs: TvModel[], ascending: boolean = true): TvModel[] {
    return [...tvs].sort((a, b) => {
      // Extract size from first size in array (e.g., "55\"")
      const sizeA = a.sizes?.[0] ? parseInt(a.sizes[0].replace(/"/g, '')) : 0;
      const sizeB = b.sizes?.[0] ? parseInt(b.sizes[0].replace(/"/g, '')) : 0;
      
      return ascending ? sizeA - sizeB : sizeB - sizeA;
    });
  }
}

// Export a factory function to create repository instances
export function createTvRepository(initialTvs: TvModel[] = []): TvRepository {
  return new TvRepository(initialTvs);
}
