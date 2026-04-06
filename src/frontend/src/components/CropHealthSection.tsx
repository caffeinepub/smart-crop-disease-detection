import { useLanguage } from "../contexts/LanguageContext";

const lastUpdated = new Date().toLocaleString();

export default function CropHealthSection() {
  const { t } = useLanguage();

  return (
    <section id="crop-health" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          🌾 {t.cropHealth.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.cropHealth.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chart card */}
          <div
            data-ocid="crop_health.card"
            className="bg-card rounded-2xl p-6 shadow-sm border border-border"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {t.cropHealth.healthDistribution}
            </h3>
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg
                  viewBox="0 0 36 36"
                  className="w-full h-full -rotate-90"
                  role="img"
                  aria-label="Health distribution chart"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="oklch(0.88 0.04 145)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="oklch(0.52 0.17 145)"
                    strokeWidth="3.5"
                    strokeDasharray="60 40"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="oklch(0.55 0.22 27)"
                    strokeWidth="3.5"
                    strokeDasharray="40 60"
                    strokeDashoffset="-60"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">
                    60%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.cropHealth.healthy}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  {t.cropHealth.healthy}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">
                  {t.cropHealth.infected}
                </span>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div
            data-ocid="crop_health.card"
            className="bg-card rounded-2xl p-6 shadow-sm border border-border"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {t.cropHealth.fieldStatistics}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">
                    {t.cropHealth.healthy}
                  </span>
                </div>
                <span className="font-bold text-green-600">3 (60%)</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-foreground">
                    {t.cropHealth.infected}
                  </span>
                </div>
                <span className="font-bold text-red-600">2 (40%)</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm font-medium text-foreground">
                  {t.cropHealth.totalAnalyzed}
                </span>
                <span className="font-bold text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t.cropHealth.lastUpdated}
                </span>
                <span className="text-sm text-muted-foreground">
                  {lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
