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
          setTimeout(() => setProgress(80), 200);
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
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          🗺️ {t.fieldCoverage.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.fieldCoverage.subtitle}
        </p>

        <div ref={ref} className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center">
            <p className="font-display text-7xl font-bold text-primary mb-1">
              {progress}%
            </p>
            <p className="text-muted-foreground font-medium mb-8">
              {t.fieldCoverage.ofTotalScanned}
            </p>

            <div className="w-full bg-muted rounded-full h-6 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-primary to-[oklch(0.60_0.18_145)] rounded-full progress-bar flex items-center justify-center"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white font-bold text-xs">
                  {progress > 10 ? `${progress}%` : ""}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-8">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full scanning-dot inline-block" />
                  <span className="text-sm font-semibold text-green-700">
                    {t.fieldCoverage.activeZone}
                  </span>
                </div>
                <p className="text-xs text-green-600">
                  {t.fieldCoverage.currentlyScanning}
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="font-display text-2xl font-bold text-orange-600 mb-1">
                  20%
                </div>
                <p className="text-xs text-orange-600">
                  {t.fieldCoverage.remainingToScan}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
