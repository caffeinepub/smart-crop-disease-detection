import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function AnimatedBar({
  pct,
  color,
  label,
}: { pct: number; color: string; label: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), 100);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm font-semibold mb-1">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-5 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full progress-bar flex items-center justify-end pr-2`}
          style={{ width: `${width}%` }}
        >
          <span className="text-white text-xs font-bold">
            {width > 10 ? `${pct}%` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

type StatCard = {
  label: string;
  value: string;
  icon: string;
  color: string;
  key: string;
};

export default function CropHealthSection() {
  const { t } = useLanguage();

  const stats: StatCard[] = [
    {
      key: "total",
      label: t.cropHealth.totalAnalyzed,
      value: t.cropHealth.cropsCount,
      icon: "📊",
      color: "bg-primary/10 text-primary",
    },
    {
      key: "healthy",
      label: t.cropHealth.healthy,
      value: "78%",
      icon: "✅",
      color: "bg-green-50 text-green-700",
    },
    {
      key: "infected",
      label: t.cropHealth.infected,
      value: "22%",
      icon: "⚠️",
      color: "bg-red-50 text-red-700",
    },
  ];

  return (
    <section id="crop-health" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          🌾 {t.cropHealth.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.key}
              data-ocid="crop_health.card"
              className={`${stat.color} rounded-2xl p-6 text-center border border-border`}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-display font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border space-y-5">
          <AnimatedBar
            pct={78}
            color="bg-green-500"
            label={t.cropHealth.healthy}
          />
          <AnimatedBar
            pct={22}
            color="bg-red-500"
            label={t.cropHealth.infected}
          />

          <div className="pt-4">
            <div className="flex items-end gap-4 h-32 justify-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-16 bg-green-500 rounded-t-lg"
                  style={{ height: "78%" }}
                />
                <span className="text-xs text-muted-foreground">
                  {t.cropHealth.healthy}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-16 bg-red-400 rounded-t-lg"
                  style={{ height: "22%" }}
                />
                <span className="text-xs text-muted-foreground">
                  {t.cropHealth.infected}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
