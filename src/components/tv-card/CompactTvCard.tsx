
import { TvModel } from "@/data/tvData";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { TierBadge } from "./TierBadge";
import { FavoriteButton } from "./FavoriteButton";
import { FeatureTags } from "./FeatureTags";
import { SizeDisplay } from "./SizeDisplay";
import { useNavigate } from "react-router-dom";
import { Star, Truck } from "lucide-react";

interface CompactTvCardProps {
  tv: TvModel;
  className?: string;
  compact?: boolean;
}

export const CompactTvCard = ({ tv, className }: CompactTvCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Function to get energy class letter and color
  const getEnergyClass = () => {
    const energyClasses = ["A", "B", "C", "D", "E", "F", "G"];
    const classIndex = Math.floor(Math.random() * 7); // Random class for demo
    const letterClass = energyClasses[classIndex];
    
    const getColorByClass = (letter: string) => {
      switch(letter) {
        case "A": return "bg-green-500";
        case "B": return "bg-green-400";
        case "C": return "bg-yellow-400";
        case "D": return "bg-yellow-500";
        case "E": return "bg-orange-400";
        case "F": return "bg-orange-500";
        case "G": return "bg-red-500";
        default: return "bg-gray-400";
      }
    };
    
    return {
      letter: letterClass,
      color: getColorByClass(letterClass)
    };
  };

  // Get a random rating between 4.0 and 5.0
  const getRating = () => {
    return (4 + Math.random()).toFixed(1);
  };
  
  // Get a random number of reviews
  const getReviewCount = () => {
    return Math.floor(Math.random() * 200);
  };

  const energyClass = getEnergyClass();
  const rating = getRating();
  const reviewCount = getReviewCount();
  
  // Calculate discount
  const originalPrice = Math.round(tv.price * 1.2);
  const discount = Math.round(((originalPrice - tv.price) / originalPrice) * 100);
  
  // Handle savings
  const savings = originalPrice - tv.price;
  
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
      onClick={() => navigate(`/tv/${tv.id}`)}
    >
      <div className="p-3">
        <h3 className="font-medium text-base mb-2 h-12 line-clamp-2">
          Televize {tv.title}
        </h3>
        
        {/* Rating stars */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(Number(rating)) ? "text-[#FFB612] fill-[#FFB612]" : "text-gray-300 fill-gray-300"}`} 
            />
          ))}
          <span className="text-[#FFB612] font-bold ml-1">{rating}</span>
          <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
        </div>
        
        {/* Free shipping badge */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-[#5cb85c] text-white text-xs font-semibold rounded">
            DOPRAVA ZDARMA
          </span>
          
          {Math.random() > 0.7 && (
            <span className="inline-block px-2 py-1 bg-[#17a2b8] text-white text-xs font-semibold rounded ml-1">
              DOPORUČUJEME
            </span>
          )}
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-center bg-white p-2">
          <img 
            src={tv.image} 
            alt={tv.title} 
            className="h-44 object-contain"
            loading="lazy"
          />
        </div>
        
        {/* Energy efficiency label */}
        <div className="absolute left-2 bottom-2 flex">
          <div className="flex flex-col items-center">
            <div className="text-xs bg-[#001744] text-white px-1">A</div>
            <div className="text-xs bg-[#001744] text-white px-1">G</div>
          </div>
          <div className={`${energyClass.color} w-8 h-8 flex items-center justify-center text-white font-bold`}>
            {energyClass.letter}
          </div>
        </div>
      </div>
      
      <div className="p-3">
        {/* TV specs */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {tv.sizes?.[0]?.replace('"', "") || "55"} ({tv.sizes?.[0]?.includes("cm") ? tv.sizes?.[0] : `${Math.round(parseInt(tv.sizes?.[0] || "55") * 2.54)} cm`}) úhlopříčka 
          • {tv.resolution || "4K Ultra HD"} 
          • Smart TV 
          • {tv.features?.[0] || "HDR"} 
          • {tv.features?.[1] || "WiFi"}
        </p>
        
        {/* Availability */}
        <div className="flex items-center mb-2 text-sm text-green-600">
          <Truck className="h-4 w-4 mr-1" />
          <span>Ihned k odeslání u vás již {new Date().getDate() + 2}.{new Date().getMonth() + 1}.{new Date().getFullYear()}</span>
        </div>
        
        {/* Price section */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="flex items-center">
              <span className="text-gray-500 line-through text-sm">{originalPrice.toLocaleString("cs-CZ")} Kč</span>
            </div>
            <div className="text-2xl font-bold text-[#FF0000]">
              {tv.price.toLocaleString("cs-CZ")} Kč
            </div>
            <div className="text-sm text-orange-500">
              Ušetříte: {savings.toLocaleString("cs-CZ")} Kč ({discount}%)
            </div>
          </div>
          
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-2 py-1 rounded text-sm">
            Vložit do košíku
          </button>
        </div>
        
        <div className="mt-2 text-sm text-blue-500 hover:underline cursor-pointer">
          Přidat do porovnání
        </div>
      </div>
    </div>
  );
};
