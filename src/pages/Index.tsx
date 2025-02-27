
import { Navigation } from "@/components/Navigation";
import { Filters } from "@/components/Filters";
import { TvGrid } from "@/components/TvGrid";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Check Supabase connection on component mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from("LGTV 2").select("count()", { count: "exact", head: true });
        if (error) {
          console.error("Supabase connection error:", error);
          setIsConnected(false);
        } else {
          console.log("Supabase connection successful");
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Failed to check Supabase connection:", err);
        setIsConnected(false);
      }
    }
    
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {isConnected === false && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
            <p className="font-bold">Upozornění</p>
            <p>Nepodařilo se připojit k databázi. Budou zobrazena výchozí data.</p>
          </div>
        </div>
      )}
      <Filters />
      <TvGrid />
    </div>
  );
};

export default Index;
