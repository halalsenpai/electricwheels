export function Hero({ title, subtitle, ctas }: { title: string; subtitle?: string; ctas?: React.ReactNode }) {
  return (
    <section className="text-center space-y-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      {ctas}
    </section>
  );
}


