import { useState, useRef, useCallback } from "react";
import { Baby, Ruler, Weight } from "lucide-react";

const MIN_CM = 40;
const MAX_CM = 120;
const TICK_HEIGHT = 14; // px per cm

interface GrowthRulerProps {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}

function VerticalRuler({ value, onChange, label = "cm" }: GrowthRulerProps) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getValueFromY = (clientY: number) => {
    const rect = rulerRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const relY = rect.bottom - clientY;
    const raw = Math.round(relY / TICK_HEIGHT) + MIN_CM;
    return Math.max(MIN_CM, Math.min(MAX_CM, raw));
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    onChange(getValueFromY(e.clientY));
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    onChange(getValueFromY(e.clientY));
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const totalHeight = (MAX_CM - MIN_CM) * TICK_HEIGHT;
  const markerBottom = (value - MIN_CM) * TICK_HEIGHT;

  return (
    <div className="flex items-end gap-2 select-none">
      {/* Ruler track */}
      <div
        ref={rulerRef}
        onPointerDown={handlePointerDown}
        className="relative cursor-ns-resize touch-none"
        style={{ height: totalHeight, width: 56 }}
      >
        {/* Background track */}
        <div className="absolute inset-0 rounded-3xl bg-secondary overflow-hidden">
          {/* Filled portion */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-3xl gradient-cta transition-all duration-75"
            style={{ height: markerBottom }}
          />
        </div>

        {/* Tick marks */}
        <div className="absolute inset-0 flex flex-col-reverse justify-start pointer-events-none">
          {Array.from({ length: MAX_CM - MIN_CM + 1 }, (_, i) => i + MIN_CM).map((cm) => {
            const isMajor = cm % 10 === 0;
            const isMid = cm % 5 === 0;
            return (
              <div
                key={cm}
                className="absolute left-0 flex items-center"
                style={{ bottom: (cm - MIN_CM) * TICK_HEIGHT - 1 }}
              >
                <div
                  className={`bg-foreground/20 ${isMajor ? "h-0.5 w-7" : isMid ? "h-px w-4" : "h-px w-2"}`}
                />
                {isMajor && (
                  <span className="ml-1.5 text-[9px] font-body text-muted-foreground font-semibold">{cm}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Draggable handle */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center pointer-events-none z-10"
          style={{ bottom: markerBottom - 14, height: 28 }}
        >
          <div className="w-full h-7 rounded-xl bg-primary shadow-cta flex items-center justify-center gap-1">
            <div className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-0.5 h-3 rounded-full bg-primary-foreground/60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Value display */}
      <div className="flex flex-col items-start gap-1">
        <div className="bg-card rounded-2xl shadow-card px-4 py-3 min-w-[80px]">
          <p className="text-3xl font-heading font-extrabold text-primary leading-none">{value}</p>
          <p className="text-xs font-body text-muted-foreground mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Weight dial ────────────────────────────────────────────────────────────

const MIN_KG = 2;
const MAX_KG = 30;
const STEP = 0.1;

function WeightDial({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const handleMinus = () => onChange(Math.max(MIN_KG, Math.round((value - STEP) * 10) / 10));
  const handlePlus = () => onChange(Math.min(MAX_KG, Math.round((value + STEP) * 10) / 10));

  const pct = ((value - MIN_KG) / (MAX_KG - MIN_KG)) * 100;

  return (
    <div className="bg-card rounded-3xl shadow-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-peach/40 flex items-center justify-center">
          <Weight size={16} className="text-accent" />
        </div>
        <p className="font-heading font-bold text-foreground text-sm">Peso</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleMinus}
          className="w-10 h-10 rounded-2xl bg-secondary font-heading font-bold text-foreground text-xl flex items-center justify-center active:scale-95 transition-transform"
        >−</button>

        <div className="flex-1 text-center">
          <p className="text-4xl font-heading font-extrabold text-primary leading-none">{value.toFixed(1)}</p>
          <p className="text-xs font-body text-muted-foreground">kg</p>
        </div>

        <button
          onClick={handlePlus}
          className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground font-heading font-bold text-xl flex items-center justify-center active:scale-95 transition-transform shadow-soft"
        >+</button>
      </div>

      {/* Track */}
      <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full gradient-cta transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-body text-muted-foreground">
        <span>{MIN_KG} kg</span><span>{MAX_KG} kg</span>
      </div>
    </div>
  );
}

// ─── Diaper size helper ──────────────────────────────────────────────────────

function diaperInfo(kg: number) {
  if (kg < 3)  return { label: "Newborn", sub: "< 3 kg",  emoji: "🐣" };
  if (kg < 6)  return { label: "Taglia 1", sub: "3–6 kg",  emoji: "👶" };
  if (kg < 9)  return { label: "Taglia 2", sub: "6–9 kg",  emoji: "🍼" };
  if (kg < 12) return { label: "Taglia 3", sub: "9–12 kg", emoji: "🌱" };
  if (kg < 15) return { label: "Taglia 4", sub: "12–15 kg",emoji: "🧒" };
  return        { label: "Taglia 5+",sub: "15+ kg",        emoji: "🌟" };
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function GrowthRuler() {
  const [altezza, setAltezza] = useState(72);
  const [peso, setPeso] = useState(8.5);

  const diaper = diaperInfo(peso);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* Ruler section */}
        <div className="bg-card rounded-3xl shadow-card p-4 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-mint/40 flex items-center justify-center">
              <Ruler size={16} className="text-primary" />
            </div>
            <p className="font-heading font-bold text-foreground text-sm">Altezza</p>
          </div>
          <div className="flex justify-center">
            <VerticalRuler value={altezza} onChange={setAltezza} />
          </div>
          <p className="text-center text-[10px] font-body text-muted-foreground">trascina per regolare</p>
        </div>

        {/* Right col: weight + diaper */}
        <div className="flex flex-col gap-3 flex-1">
          <WeightDial value={peso} onChange={setPeso} />

          {/* Diaper suggestion */}
          <div className="bg-card rounded-3xl shadow-card p-4 flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-peach/30 flex items-center justify-center text-3xl">
              {diaper.emoji}
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-foreground text-base leading-tight">{diaper.label}</p>
              <p className="text-muted-foreground text-xs font-body">{diaper.sub}</p>
              <p className="text-muted-foreground text-[10px] font-body mt-0.5">pannolino consigliato</p>
            </div>
          </div>

          {/* BMI-style note */}
          <div className="bg-mint/20 rounded-2xl p-3 text-center">
            <p className="text-xs font-body text-muted-foreground leading-snug">
              Rapporto peso/altezza
            </p>
            <p className="font-heading font-bold text-primary text-sm mt-0.5">
              {(peso / (altezza / 100) ** 2).toFixed(1)} BMI bimbo
            </p>
          </div>
        </div>
      </div>

      {/* Baby silhouette scale bar */}
      <div className="bg-card rounded-3xl shadow-card p-4 flex items-end gap-3">
        <Baby size={20} className="text-primary mb-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex justify-between text-[10px] font-body text-muted-foreground mb-1">
            <span>40 cm</span>
            <span className="font-semibold text-primary">{altezza} cm</span>
            <span>120 cm</span>
          </div>
          <div className="relative h-4 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full gradient-cta transition-all duration-150"
              style={{ width: `${((altezza - 40) / 80) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-body text-muted-foreground mt-1">
            <span>Neonato</span><span>1 anno</span><span>5 anni</span>
          </div>
        </div>
      </div>
    </div>
  );
}
