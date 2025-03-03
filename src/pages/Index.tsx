
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTvRepository } from "@/hooks/useTvRepository";
import { TechnologySection } from "@/components/TechnologySection";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("Kontroluji připojení k databázi...");
  const {
    loading,
    error,
    isReady
  } = useTvRepository();
  const {
    toast
  } = useToast();

  // Check Supabase connection on component mount
  useEffect(() => {
    async function checkConnection() {
      try {
        setConnectionStatus("Připojuji se k databázi LGTV3...");
        console.log("Checking Supabase LGTV3 connection");
        
        const {
          data,
          error
        } = await supabase.from("LGTV3").select("count()", {
          count: "exact",
          head: true
        });
        
        if (error) {
          console.error("Supabase connection error:", error);
          setIsConnected(false);
          setConnectionStatus(`Nepodařilo se připojit k databázi: ${error.message}`);
        } else {
          console.log("Supabase connection successful");
          setIsConnected(true);
          setConnectionStatus("Připojení k databázi LGTV3 úspěšné");
        }
      } catch (err) {
        console.error("Failed to check Supabase connection:", err);
        setIsConnected(false);
        const errorMsg = err instanceof Error ? err.message : "Neznámá chyba";
        setConnectionStatus(`Chyba při připojení k databázi: ${errorMsg}`);
      }
    }
    checkConnection();
  }, []);
  
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 mt-4">
        <div className={`border-l-4 p-4 rounded mb-4 ${
          isConnected === null ? "bg-gray-100 border-gray-500 text-gray-700" :
          isConnected === true ? "bg-green-100 border-[#FFB612] text-[#001744]" :
          "bg-yellow-100 border-[#FFB612] text-[#001744]"
        }`} role="alert">
          <p className="font-bold">Stav připojení k databázi</p>
          <p>{connectionStatus}</p>
        </div>
      </div>
      
      {error && <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Chyba</p>
            <p>{error.message}</p>
          </div>
        </div>}
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#001744] to-[#FFB612] md:text-6xl font-bold">
            Průvodce televizory LG
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Vyberte si televizor podle technologie a modelové řady, která nejlépe odpovídá vašim potřebám
          </p>
        </header>
        
        {loading ? <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB612]"></div>
          </div> : <div className="space-y-8">
            <TechnologySection technology="OLED" />
            <TechnologySection technology="QNED" />
            <TechnologySection technology="NanoCell" />
            <TechnologySection technology="LED" />
          </div>}
      </div>
    </div>;
};

export default Index;
