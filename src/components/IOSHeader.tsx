interface IOSHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export default function IOSHeader({ title, subtitle, rightAction, transparent }: IOSHeaderProps) {
  return (
    <div className={`px-5 pt-2 pb-4 ${transparent ? "gradient-hero" : "bg-background"}`}>
      <div className="flex items-end justify-between">
        <div>
          {subtitle && (
            <p className="text-muted-foreground text-sm font-body mb-0.5">{subtitle}</p>
          )}
          <h1 className="font-heading text-3xl font-extrabold text-foreground leading-tight tracking-tight">
            {title}
          </h1>
        </div>
        {rightAction && (
          <div className="mb-1">{rightAction}</div>
        )}
      </div>
    </div>
  );
}
