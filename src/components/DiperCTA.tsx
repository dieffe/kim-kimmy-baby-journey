import { ShoppingBag, ArrowRight } from "lucide-react";

interface DiaperCTAProps {
  variant?: "full" | "banner" | "floating";
  className?: string;
}

export default function DiaperCTA({ variant = "full", className = "" }: DiaperCTAProps) {
  const handleOrder = () => {
    window.open("https://kim-kimmy.it/collections/diapers", "_blank");
  };

  if (variant === "banner") {
    return (
      <div className={`mx-4 mb-4 rounded-2xl gradient-cta shadow-cta p-4 flex items-center justify-between ${className}`}>
        <div>
          <p className="text-primary-foreground font-heading font-bold text-base">Pannolini Kim & Kimmy</p>
          <p className="text-primary-foreground/80 text-xs font-body mt-0.5">Morbidi, naturali, senza perdite</p>
        </div>
        <button
          onClick={handleOrder}
          className="bg-card text-primary font-heading font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-card"
        >
          Ordina <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className={`${className}`}>
        <button
          onClick={handleOrder}
          className="gradient-cta shadow-cta text-primary-foreground font-heading font-bold rounded-2xl px-5 py-3.5 flex items-center gap-2 text-base w-full justify-center"
        >
          <ShoppingBag size={20} />
          Ordina i Pannolini
        </button>
      </div>
    );
  }

  return (
    <div className={`mx-4 rounded-3xl gradient-cta shadow-cta overflow-hidden ${className}`}>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="bg-card/20 rounded-2xl p-2.5">
            <ShoppingBag size={24} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-primary-foreground/80 text-xs font-body uppercase tracking-wide">Il migliore per il tuo bambino</p>
            <h3 className="text-primary-foreground font-heading font-bold text-lg leading-tight mt-0.5">
              Pannolini Kim & Kimmy
            </h3>
            <p className="text-primary-foreground/80 text-sm font-body mt-1">
              Ultra morbidi, ecologici, senza perdite. Addio eruzioni cutanee! 🌿
            </p>
          </div>
        </div>
        <button
          onClick={handleOrder}
          className="mt-4 bg-card text-primary font-heading font-bold text-base px-5 py-3 rounded-2xl w-full flex items-center justify-center gap-2 shadow-card"
        >
          Ordina ora <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
