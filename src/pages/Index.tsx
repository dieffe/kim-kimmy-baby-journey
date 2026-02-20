import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/pages/HomeTab";
import CrescitaTab from "@/pages/CrescitaTab";
import ConsigliaTab from "@/pages/ConsigliaTab";
import ArticoliTab from "@/pages/ArticoliTab";

type Tab = "home" | "crescita" | "consigli" | "articoli";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home": return <HomeTab />;
      case "crescita": return <CrescitaTab />;
      case "consigli": return <ConsigliaTab />;
      case "articoli": return <ArticoliTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative shadow-xl overflow-hidden">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {renderTab()}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
