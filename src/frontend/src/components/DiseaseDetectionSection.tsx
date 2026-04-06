import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import VisualizationPanel from "./VisualizationPanel";

const timestamp = new Date().toLocaleString();

function SeverityBadge({ severity }: { severity: "Medium" | "High" }) {
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
        severity === "High"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {severity}
    </span>
  );
}

function TomatoCard() {
  const { t } = useLanguage();
  const d = t.diseases.tomato;
  const [showViz, setShowViz] = useState(false);

  return (
    <div
      data-ocid="detection.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden"
    >
      <div className="relative">
        <img
          src="/assets/generated/tomato-late-blight.dim_600x400.jpg"
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-3 right-3">
          <SeverityBadge severity="Medium" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display text-xl font-bold text-foreground">
            {d.disease}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">
            {t.detection.plantName}:
          </span>{" "}
          {d.plant}
        </p>
        <p className="text-sm text-muted-foreground mb-3">{d.description}</p>
        <div className="bg-secondary/60 rounded-xl p-3 mb-3">
          <p className="text-xs font-semibold text-muted-foreground mb-0.5">
            {t.detection.treatment}
          </p>
          <p className="text-sm text-foreground font-medium">{d.treatment}</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{timestamp}</p>
        <button
          type="button"
          data-ocid="detection.button"
          onClick={() => setShowViz(!showViz)}
          className="w-full bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
        >
          {showViz ? t.detection.hideAnalysis : t.detection.viewAnalysis}
        </button>
        {showViz && (
          <VisualizationPanel
            imageSrc="/assets/generated/tomato-late-blight.dim_600x400.jpg"
            healthyPct={65}
            diseasedPct={35}
            diseaseName={d.disease}
            treatment={d.treatment}
          />
        )}
      </div>
    </div>
  );
}

function WheatCard() {
  const { t } = useLanguage();
  const d = t.diseases.wheat;
  const [showViz, setShowViz] = useState(false);

  return (
    <div
      data-ocid="detection.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden"
    >
      <div className="relative">
        <img
          src="/assets/generated/wheat-rust.dim_600x400.jpg"
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-3 right-3">
          <SeverityBadge severity="High" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display text-xl font-bold text-foreground">
            {d.disease}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">
            {t.detection.plantName}:
          </span>{" "}
          {d.plant}
        </p>
        <p className="text-sm text-muted-foreground mb-3">{d.description}</p>
        <div className="bg-secondary/60 rounded-xl p-3 mb-3">
          <p className="text-xs font-semibold text-muted-foreground mb-0.5">
            {t.detection.treatment}
          </p>
          <p className="text-sm text-foreground font-medium">{d.treatment}</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{timestamp}</p>
        <button
          type="button"
          data-ocid="detection.button"
          onClick={() => setShowViz(!showViz)}
          className="w-full bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
        >
          {showViz ? t.detection.hideAnalysis : t.detection.viewAnalysis}
        </button>
        {showViz && (
          <VisualizationPanel
            imageSrc="/assets/generated/wheat-rust.dim_600x400.jpg"
            healthyPct={65}
            diseasedPct={35}
            diseaseName={d.disease}
            treatment={d.treatment}
          />
        )}
      </div>
    </div>
  );
}

export default function DiseaseDetectionSection() {
  const { t } = useLanguage();

  return (
    <section id="disease-detection" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          🦠 {t.detection.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.detection.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <TomatoCard />
          <WheatCard />
        </div>
      </div>
    </section>
  );
}
