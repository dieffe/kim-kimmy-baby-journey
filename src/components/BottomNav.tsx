import { Home, TrendingUp, Lightbulb, BookOpen } from "lucide-react";

type Tab = "home" | "crescita" | "consigli" | "articoli";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, label: "Home", icon: Home },
  { id: "crescita" as Tab, label: "Crescita", icon: TrendingUp },
  { id: "consigli" as Tab, label: "Consigli", icon: Lightbulb },
  { id: "articoli" as Tab, label: "Articoli", icon: BookOpen },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="z-50">
      <div className="glass border-t border-border">
        <div className="flex items-center justify-around px-2 pt-2 pb-2">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div className={`p-1.5 rounded-2xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />
                </div>
                <span
                  className={`text-[10px] font-body font-semibold transition-all duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
