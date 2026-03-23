import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import VisualizationPanel from "./VisualizationPanel";

type DemoDisease = {
  id: string;
  plant: string;
  disease: string;
  confidence: number;
  affectedPct: number;
  healthyPct: number;
  treatment: string;
  imageSrc: string;
};

const demoDiseases: DemoDisease[] = [
  {
    id: "tomato",
    plant: "Tomato",
    disease: "Late Blight",
    confidence: 91,
    affectedPct: 35,
    healthyPct: 65,
    treatment:
      "Apply Mancozeb fungicide spray. Remove infected leaves immediately. Improve air circulation.",
    imageSrc: "/assets/generated/tomato-late-blight.dim_600x400.jpg",
  },
  {
    id: "wheat",
    plant: "Wheat",
    disease: "Stem Rust",
    confidence: 87,
    affectedPct: 28,
    healthyPct: 72,
    treatment:
      "Apply Propiconazole or Tebuconazole fungicide at first sign of infection.",
    imageSrc: "/assets/generated/wheat-rust.dim_600x400.jpg",
  },
];

function DiseaseCard({ d }: { d: DemoDisease }) {
  const { t } = useLanguage();
  const [showViz, setShowViz] = useState(false);

  return (
    <div
      data-ocid="detection.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden"
    >
      <div className="relative">
        <img
          src={d.imageSrc}
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {t.detection.affectedArea}: {d.affectedPct}%
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {d.confidence}% {t.detection.confidence}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌿</span>
          <div>
            <p className="font-bold text-foreground text-lg">{d.plant}</p>
            <p className="text-muted-foreground text-sm">
              {t.detection.diseaseName}:{" "}
              <span className="text-red-500 font-semibold">{d.disease}</span>
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          <span className="font-semibold text-foreground">
            {t.detection.treatment}:
          </span>{" "}
          {d.treatment}
        </p>
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
            imageSrc={d.imageSrc}
            healthyPct={d.healthyPct}
            diseasedPct={d.affectedPct}
            diseaseName={d.disease}
            treatment={d.treatment}
          />
        )}
      </div>
    </div>
  );
}

type ResultItem = { label: string; value: string; color: string; key: string };

export default function DiseaseDetectionSection() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showUploadViz, setShowUploadViz] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowResult(false);
    setShowUploadViz(false);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  const resultItems: ResultItem[] = [
    {
      key: "plant",
      label: t.detection.plantName,
      value: "Tomato",
      color: "text-foreground",
    },
    {
      key: "disease",
      label: t.detection.diseaseName,
      value: "Late Blight",
      color: "text-red-500",
    },
    {
      key: "confidence",
      label: t.detection.confidence,
      value: "91%",
      color: "text-primary",
    },
    {
      key: "area",
      label: t.detection.affectedArea,
      value: "35%",
      color: "text-orange-500",
    },
  ];

  return (
    <section id="disease-detection" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          🦠 {t.detection.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.detection.uploadHint}
        </p>

        <div className="flex flex-col items-center mb-10">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="detection.upload_button"
          />
          <button
            type="button"
            data-ocid="detection.primary_button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-bold px-10 py-5 rounded-2xl text-xl shadow-lg transition-transform hover:scale-105"
          >
            <Upload size={28} />
            {t.detection.uploadBtn}
          </button>
          <p className="text-muted-foreground mt-3 text-sm">
            {t.detection.uploadHint}
          </p>
        </div>

        {analyzing && (
          <div
            data-ocid="detection.loading_state"
            className="flex flex-col items-center gap-3 py-10"
          >
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="text-foreground font-semibold text-lg">
              {t.detection.analyzing}
            </p>
          </div>
        )}

        {showResult && uploadedImage && (
          <div
            data-ocid="detection.success_state"
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-card rounded-2xl shadow-lg border border-primary/30 overflow-hidden">
              <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                  ✅ {t.detection.resultTitle}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={uploadedImage}
                    alt="Uploaded leaf"
                    className="w-full md:w-48 h-36 md:h-36 object-cover rounded-xl border border-border"
                  />
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {resultItems.map((item) => (
                      <div
                        key={item.key}
                        className="bg-secondary/50 rounded-xl p-3"
                      >
                        <p className="text-muted-foreground text-xs mb-1">
                          {item.label}
                        </p>
                        <p className={`font-bold text-lg ${item.color}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 bg-secondary/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">
                    {t.detection.treatment}
                  </p>
                  <p className="text-foreground text-sm">
                    Apply Mancozeb fungicide spray. Remove infected leaves
                    immediately. Improve air circulation.
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="detection.view_analysis.button"
                  onClick={() => setShowUploadViz(!showUploadViz)}
                  className="mt-4 w-full bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {showUploadViz
                    ? t.detection.hideAnalysis
                    : t.detection.viewAnalysis}
                </button>
                {showUploadViz && (
                  <VisualizationPanel
                    imageSrc="/assets/generated/tomato-late-blight.dim_600x400.jpg"
                    healthyPct={65}
                    diseasedPct={35}
                    diseaseName="Late Blight"
                    treatment="Apply Mancozeb fungicide spray. Remove infected leaves immediately."
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
            {t.detection.demoTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {demoDiseases.map((d) => (
              <DiseaseCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
