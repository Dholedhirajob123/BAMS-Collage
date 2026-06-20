// components/pages/InfoPage.tsx

interface InfoPageProps {
  hero: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  highlights?: { label: string; value: string }[];
}

export function InfoPage({
  hero, title, subtitle, paragraphs, highlights,
}: InfoPageProps) {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-md">
        <img src={hero} alt={title} loading="lazy" className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/30 to-transparent flex items-end p-5">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        </div>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground leading-relaxed">{p}</p>
      ))}
      {highlights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {highlights.map((h, i) => (
            <div key={i} className="border border-border rounded-md p-4 text-center bg-secondary/30">
              <div className="text-xl font-bold text-brand">{h.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InfoPage;