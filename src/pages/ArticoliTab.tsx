import DiaperCTA from "@/components/DiperCTA";
import IOSHeader from "@/components/IOSHeader";
import { Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    emoji: "🌙",
    category: "Sonno",
    title: "Come insegnare al tuo bambino a dormire tutta la notte",
    excerpt: "Scopri le tecniche più efficaci per aiutare il tuo piccolo ad avere un sonno regolare e di qualità...",
    readTime: "5 min",
    color: "bg-lavender/20",
  },
  {
    id: 2,
    emoji: "🥦",
    category: "Alimentazione",
    title: "Svezzamento: da dove iniziare senza stress",
    excerpt: "Guida completa allo svezzamento classico e BLW. Cosa mangiare, quando e come prepararsi...",
    readTime: "7 min",
    color: "bg-mint/20",
  },
  {
    id: 3,
    emoji: "🧴",
    category: "Cura della pelle",
    title: "Come prevenire e trattare l'eritema da pannolino",
    excerpt: "I consigli dei pediatri per mantenere la pelle del bambino integra e protetta sotto il pannolino...",
    readTime: "4 min",
    color: "bg-peach/20",
  },
  {
    id: 4,
    emoji: "💪",
    category: "Sviluppo",
    title: "I 10 milestone del primo anno di vita",
    excerpt: "Quando il bambino dovrebbe sorridere, gattonare, stare seduto? Ecco cosa aspettarsi mese dopo mese...",
    readTime: "6 min",
    color: "bg-secondary",
  },
  {
    id: 5,
    emoji: "🌿",
    category: "Ecologia",
    title: "Pannolini eco-friendly: perché sono meglio?",
    excerpt: "Un confronto tra pannolini tradizionali ed ecologici: impatto ambientale, qualità e costo nel tempo...",
    readTime: "5 min",
    color: "bg-mint/20",
  },
];

export default function ArticoliTab() {
  return (
    <div className="flex flex-col gap-0 pb-2">
      {/* iOS Large Title Header */}
      <IOSHeader title="Articoli 📰" subtitle="Guide per genitori consapevoli" />

      {/* Featured article */}
      <div className="px-4 py-3">
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className={`${articles[0].color} px-5 py-6`}>
            <span className="text-4xl">{articles[0].emoji}</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                {articles[0].category}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                <Clock size={11} /> {articles[0].readTime}
              </div>
            </div>
            <h2 className="font-heading font-bold text-foreground text-base leading-tight mb-2">
              {articles[0].title}
            </h2>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">{articles[0].excerpt}</p>
            <button className="text-primary font-body font-semibold text-sm flex items-center gap-1">
              Leggi articolo <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Article list */}
      <div className="px-4 flex flex-col gap-3 mb-4">
        {articles.slice(1).map((article) => (
          <div key={article.id} className="bg-card rounded-2xl shadow-card p-4 flex items-start gap-3">
            <div className={`w-14 h-14 rounded-2xl ${article.color} flex items-center justify-center text-2xl flex-shrink-0`}>
              {article.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                  <Clock size={10} /> {article.readTime}
                </div>
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm leading-tight">
                {article.title}
              </h3>
              <button className="text-primary font-body font-semibold text-xs flex items-center gap-1 mt-1.5">
                Leggi <ArrowRight size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <DiaperCTA variant="banner" />
      <div className="h-4" />
    </div>
  );
}
