import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import IOSStatusBar from "@/components/IOSStatusBar";
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
    /* Phone shell */
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div
        className="relative bg-background flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          boxShadow: "0 0 0 10px #1a1a1a, 0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 bg-black z-50 rounded-full"
          style={{ width: 126, height: 37 }}
        />

        {/* Status bar */}
        <div className="pt-12 flex-shrink-0 z-40">
          <IOSStatusBar />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
          {renderTab()}
        </div>

        {/* Bottom nav + iOS home indicator */}
        <div className="flex-shrink-0">
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          {/* Home indicator */}
          <div className="flex justify-center pb-2 pt-1 bg-background">
            <div className="w-32 h-1 bg-foreground/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
