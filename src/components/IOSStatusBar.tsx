export default function IOSStatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-transparent select-none">
      <span className="font-heading font-bold text-sm text-foreground">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <div className="flex items-end gap-px">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} className="w-1 rounded-sm bg-foreground" style={{ height: h }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path d="M7.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" className="text-foreground"/>
          <path d="M4.5 7.2A4.3 4.3 0 0 1 7.5 6a4.3 4.3 0 0 1 3 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-foreground"/>
          <path d="M2 4.5A7.2 7.2 0 0 1 7.5 2.5 7.2 7.2 0 0 1 13 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-foreground"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 rounded-sm border border-foreground relative">
            <div className="absolute inset-0.5 right-1 rounded-sm bg-foreground" />
          </div>
          <div className="w-0.5 h-1.5 bg-foreground rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}
