
import { useRef } from "react";

const filters = [
  "Všechny", "OLED", "QNED", "LED", "4K", "8K", 
  "Smart TV", "Gaming", "HDR", "Dolby Vision"
];

export const Filters = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-4">
      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
        >
          {filters.map((filter) => (
            <span key={filter} className="filter-chip whitespace-nowrap">
              {filter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
