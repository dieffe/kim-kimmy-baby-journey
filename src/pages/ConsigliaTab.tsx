import DiaperCTA from "@/components/DiperCTA";
import IOSHeader from "@/components/IOSHeader";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const ageGroups = [
  {
    range: "0–3 mesi",
    emoji: "🌱",
    color: "bg-mint/20 border-mint/40",
    tips: [
      { title: "Sonno sicuro", text: "Metti il bambino a dormire sempre sulla schiena, su un materasso rigido e piatto." },
      { title: "Cambio pannolino", text: "I neonati hanno bisogno di circa 8-12 cambi al giorno. Scegli pannolini ultra-assorbenti per evitare irritazioni." },
      { title: "Allattamento", text: "Allatta a richiesta, ogni 2-3 ore. L'attacco corretto previene le ragadi al seno." },
      { title: "Bagno", text: "Bagna il bambino con acqua tiepida (37°C), 2-3 volte a settimana con detergenti delicatissimi." },
    ],
  },
  {
    range: "3–6 mesi",
    emoji: "🌼",
    color: "bg-peach/20 border-peach/40",
    tips: [
      { title: "Tummy time", text: "Metti il bambino a pancia in giù per 3-5 min, più volte al giorno, per sviluppare i muscoli del collo." },
      { title: "Prime pappe", text: "Inizia con purea di verdure singole (carota, zucca) per abituare il palato ai sapori naturali." },
      { title: "Pannolino taglia 2", text: "Verso i 6 kg è il momento di passare alla taglia 2. Controlla i segni rossi sulla pelle." },
      { title: "Vaccini", text: "Ricorda le vaccinazioni previste al 3° mese. Tieni traccia del libretto sanitario." },
    ],
  },
  {
    range: "6–12 mesi",
    emoji: "🌟",
    color: "bg-lavender/20 border-lavender/40",
    tips: [
      { title: "Svezzamento", text: "Introduci un nuovo alimento alla volta, aspettando 3 giorni prima di aggiungerne un altro." },
      { title: "Sicurezza in casa", text: "Monta le protezioni sulle prese, angoli pericolosi e scale. Il bambino inizia a gattonare!" },
      { title: "Primi denti", text: "Massaggia le gengive con un dito pulito. Usa solo fluoruro dopo i 6 mesi." },
      { title: "Sonno notturno", text: "Instaura una routine serale rilassante: bagno, poppata, ninnananna a orario fisso." },
    ],
  },
];

function TipGroup({ group }: { group: (typeof ageGroups)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-card rounded-3xl shadow-card border ${group.color} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{group.emoji}</span>
          <span className="font-heading font-bold text-foreground text-base">{group.range}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          {group.tips.map((tip) => (
            <div key={tip.title} className="bg-background rounded-2xl p-3.5">
              <p className="font-heading font-bold text-foreground text-sm mb-1">{tip.title}</p>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ConsigliaTab() {
  return (
    <div className="flex flex-col gap-0 pb-2">
      {/* iOS Large Title Header */}
      <IOSHeader title="Consigli 💡" subtitle="Per ogni fase della crescita" />

      <div className="px-4 py-3 flex flex-col gap-3">
        {ageGroups.map((group) => (
          <TipGroup key={group.range} group={group} />
        ))}
      </div>

      {/* CTA */}
      <DiaperCTA variant="banner" />
      <div className="h-4" />
    </div>
  );
}
