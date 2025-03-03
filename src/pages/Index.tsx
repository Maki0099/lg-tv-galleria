
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTvRepository } from "@/hooks/useTvRepository";
import { TechnologySection } from "@/components/TechnologySection";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { loading, error, isReady } = useTvRepository();
  const { toast } = useToast();

  // Check Supabase connection on component mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from("LGTV3").select("count()", { count: "exact", head: true });
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
          <div className="bg-yellow-100 border-l-4 border-[#FFB612] text-[#001744] p-4 rounded" role="alert">
            <p className="font-bold">Upozornění</p>
            <p>Nepodařilo se připojit k databázi. Budou zobrazena výchozí data.</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Chyba</p>
            <p>{error.message}</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#001744] to-[#FFB612]">
            Průvodce televizory LG
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Vyberte si televizor podle technologie a modelové řady, která nejlépe odpovídá vašim potřebám
          </p>
        </header>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB612]"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <TechnologySection technology="OLED" />
            <TechnologySection technology="QNED" />
            <TechnologySection technology="NanoCell" />
            <TechnologySection technology="LED" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
