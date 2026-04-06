import { useLanguage } from "../contexts/LanguageContext";

export default function HomeSection() {
  const { t } = useLanguage();

  const statCards = [
    { key: "crops", value: "5", label: t.cropHealth.totalAnalyzed },
    { key: "diseases", value: "2", label: t.detection.demoTitle },
    { key: "coverage", value: "80%", label: t.fieldCoverage.coverage },
    { key: "healthy", value: "85%", label: t.cropHealth.healthy },
  ];

  return (
    <section id="home" className="relative">
      <div
        className="relative min-h-[480px] md:min-h-[560px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(/assets/generated/farm-hero.dim_1200x600.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.25_0.12_145/0.75)] to-[oklch(0.18_0.10_145/0.85)]" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto section-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-green-300 scanning-dot inline-block" />
            🌾 AI-Powered Agriculture
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
            {t.home.heading}
          </h1>
          <p className="text-lg md:text-xl text-green-100 leading-relaxed mb-8">
            {t.home.subheading}
          </p>
          <a
            href="#disease-detection"
            data-ocid="home.primary_button"
            className="inline-block bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 shadow-lg"
          >
            {t.home.viewDetections}
          </a>
        </div>
      </div>

      <div className="bg-secondary/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s) => (
              <div
                key={s.key}
                data-ocid="home.card"
                className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="font-display text-3xl font-bold text-primary mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
