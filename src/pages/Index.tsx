
import { Navigation } from "@/components/Navigation";
import { Filters } from "@/components/Filters";
import { TvGrid } from "@/components/TvGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Filters />
      <TvGrid />
    </div>
  );
};

export default Index;
