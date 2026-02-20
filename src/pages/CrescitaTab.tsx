import { useState } from "react";
import DiaperCTA from "@/components/DiperCTA";
import growthIllustration from "@/assets/growth-illustration.png";
import { Plus, TrendingUp, Baby } from "lucide-react";

interface Entry {
  date: string;
  peso: number;
  altezza: number;
  eta: string;
}

const initialEntries: Entry[] = [
  { date: "2024-01-15", peso: 3.5, altezza: 50, eta: "0 mesi" },
  { date: "2024-02-20", peso: 4.8, altezza: 55, eta: "1 mese" },
  { date: "2024-03-18", peso: 6.0, altezza: 59, eta: "2 mesi" },
];

const diaper_size_by_weight = (peso: number) => {
  if (peso < 3) return "Newborn";
  if (peso < 6) return "Taglia 1 (3–6 kg)";
  if (peso < 9) return "Taglia 2 (6–9 kg)";
  if (peso < 12) return "Taglia 3 (9–12 kg)";
  return "Taglia 4 (12+ kg)";
};

export default function CrescitaTab() {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ peso: "", altezza: "", eta: "" });

  const lastEntry = entries[entries.length - 1];

  const handleAdd = () => {
    if (!form.peso || !form.altezza || !form.eta) return;
    const newEntry: Entry = {
      date: new Date().toISOString().split("T")[0],
      peso: parseFloat(form.peso),
      altezza: parseFloat(form.altezza),
      eta: form.eta,
    };
    setEntries([...entries, newEntry]);
    setForm({ peso: "", altezza: "", eta: "" });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-0 pb-2">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 gradient-hero">
        <h1 className="font-heading text-2xl font-extrabold text-foreground">📏 Crescita</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Traccia peso e altezza del tuo bambino</p>
      </div>

      {/* Current stats */}
      <div className="px-4 -mt-2 mb-4">
        <div className="bg-card rounded-3xl shadow-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Baby size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-body">Ultimo aggiornamento</p>
              <p className="text-foreground font-heading font-bold">{lastEntry.eta} · {lastEntry.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-2xl p-3 text-center">
              <p className="text-muted-foreground text-xs font-body">Peso</p>
              <p className="text-primary font-heading font-extrabold text-2xl">{lastEntry.peso}</p>
              <p className="text-muted-foreground text-xs font-body">kg</p>
            </div>
            <div className="bg-mint/20 rounded-2xl p-3 text-center">
              <p className="text-muted-foreground text-xs font-body">Altezza</p>
              <p className="text-primary font-heading font-extrabold text-2xl">{lastEntry.altezza}</p>
              <p className="text-muted-foreground text-xs font-body">cm</p>
            </div>
          </div>
          <div className="mt-3 bg-peach/30 rounded-2xl p-3 text-center">
            <p className="text-xs font-body text-muted-foreground">Taglia pannolino consigliata</p>
            <p className="font-heading font-bold text-foreground text-base">{diaper_size_by_weight(lastEntry.peso)}</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-foreground text-lg flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" /> Storico
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground font-body font-semibold text-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-soft"
          >
            <Plus size={14} /> Aggiungi
          </button>
        </div>

        {showForm && (
          <div className="bg-card rounded-2xl shadow-card p-4 mb-3">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Età (es. 3 mesi)"
                value={form.eta}
                onChange={e => setForm({ ...form, eta: e.target.value })}
                className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Peso (kg)"
                  value={form.peso}
                  onChange={e => setForm({ ...form, peso: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="number"
                  placeholder="Altezza (cm)"
                  value={form.altezza}
                  onChange={e => setForm({ ...form, altezza: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                onClick={handleAdd}
                className="gradient-cta text-primary-foreground font-heading font-bold py-2.5 rounded-xl shadow-soft"
              >
                Salva
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {[...entries].reverse().map((e, i) => (
            <div key={i} className="bg-card rounded-2xl shadow-card p-4 flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-foreground text-sm">{e.eta}</p>
                <p className="text-muted-foreground text-xs font-body">{e.date}</p>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="font-heading font-bold text-primary text-base">{e.peso} kg</p>
                  <p className="text-muted-foreground text-xs font-body">peso</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-base">{e.altezza} cm</p>
                  <p className="text-muted-foreground text-xs font-body">altezza</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <DiaperCTA variant="banner" />
      <div className="h-4" />
    </div>
  );
}
