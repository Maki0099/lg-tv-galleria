
export interface TvModel {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  series: string;
  tier: string;
  features: string[];
  highlights: string[];
  recommendation: string;
  sizes?: string[];
  modelNumber?: string;
  keyFeaturesFull?: string;
  resolution?: string;
}
