import heroBaby from "@/assets/hero-baby.jpg";
import DiaperCTA from "@/components/DiperCTA";
import { Star, Shield, Leaf, Droplets } from "lucide-react";

export default function HomeTab() {
  return (
    <div className="flex flex-col gap-0 pb-2">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 gradient-hero">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-muted-foreground text-sm font-body">Benvenuta 👋</p>
            <h1 className="font-heading text-2xl font-extrabold text-foreground leading-tight">
              Kim & Kimmy
            </h1>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="font-heading font-bold text-primary text-lg">K</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-soft">
          <img
            src={heroBaby}
            alt="Baby con pannolino Kim & Kimmy"
            className="w-full h-52 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent flex flex-col justify-end p-5">
            <p className="text-primary-foreground/90 text-xs font-body uppercase tracking-widest">Il marchio per</p>
            <h2 className="text-primary-foreground font-heading font-extrabold text-xl leading-tight">
              Crescere bambini felici e sani
            </h2>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: "Ipoallergenico", color: "bg-mint/30 text-mint" },
            { icon: Leaf, label: "Ecologico", color: "bg-secondary text-primary" },
            { icon: Droplets, label: "Ultra assorbente", color: "bg-peach/30 text-accent" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="bg-card rounded-2xl p-3 shadow-card flex flex-col items-center gap-2 text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <span className="text-xs font-body font-semibold text-foreground leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="hsl(38 90% 58%)" className="text-yellow-400" />
            ))}
            <span className="text-xs text-muted-foreground font-body ml-1">49 recensioni</span>
          </div>
          <p className="text-foreground font-body text-sm italic">"Finalmente una notte tranquilla! Nessuna perdita e la pelle del mio bimbo è morbidissima."</p>
          <p className="text-muted-foreground text-xs font-body font-semibold mt-2">— Melissa H.</p>
        </div>
      </div>

      {/* CTA */}
      <DiaperCTA variant="full" />
      <div className="h-4" />
    </div>
  );
}
