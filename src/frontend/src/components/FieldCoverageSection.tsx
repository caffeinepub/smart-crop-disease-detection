import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function FieldCoverageSection() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProgress(70), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="field-coverage" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          🗺️ {t.fieldCoverage.sectionTitle}
        </h2>

        <div ref={ref} className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center">
            <p className="text-muted-foreground font-medium mb-2">
              {t.fieldCoverage.coverage}
            </p>
            <p className="font-display text-5xl font-bold text-primary mb-6">
              {progress}% Scanned
            </p>

            {/* Linear progress bar */}
            <div className="w-full bg-muted rounded-full h-8 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-primary to-[oklch(0.60_0.18_145)] rounded-full progress-bar flex items-center justify-center"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white font-bold text-sm">
                  {progress > 15 ? `${progress}%` : ""}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: t.fieldCoverage.totalArea, value: "5.2 acres" },
                { label: t.fieldCoverage.scanned, value: "3.6 acres" },
                { label: t.fieldCoverage.remaining, value: "1.6 acres" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary/60 rounded-xl p-3"
                >
                  <p className="text-muted-foreground text-xs mb-1">
                    {stat.label}
                  </p>
                  <p className="font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
