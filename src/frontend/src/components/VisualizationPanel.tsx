import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  imageSrc: string;
  healthyPct: number;
  diseasedPct: number;
  diseaseName: string;
  treatment: string;
};

export default function VisualizationPanel({
  imageSrc,
  healthyPct,
  diseasedPct,
  diseaseName,
  treatment,
}: Props) {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[oklch(0.10_0.03_145)] rounded-2xl p-4 md:p-6 mt-4 border border-primary/30">
      <h3 className="text-white font-display text-xl font-semibold mb-4 text-center">
        🔬 {t.detection.vizTitle}
      </h3>

      {/* Side-by-side images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Original */}
        <div>
          <p className="text-green-300 text-sm font-semibold mb-2 text-center">
            {t.detection.originalImg}
          </p>
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt="Original leaf"
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
        </div>

        {/* Processed */}
        <div>
          <p className="text-green-300 text-sm font-semibold mb-2 text-center">
            {t.detection.processedImg}
          </p>
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt="Processed leaf"
              className="w-full h-48 md:h-56 object-cover"
            />
            {/* Diseased overlay */}
            <div
              className="absolute inset-0 diseased-overlay"
              style={{
                boxShadow: "inset 0 0 30px rgba(220,38,38,0.4)",
              }}
            />
            {/* Healthy overlay */}
            <div
              className="absolute inset-0 healthy-overlay opacity-60"
              style={{ mixBlendMode: "multiply" }}
            />
            {/* Dashed infection boundary */}
            <div
              className="absolute top-[8%] left-[5%] w-[45%] h-[55%] rounded-full glow-red"
              style={{
                border: "2.5px dashed rgba(255,60,60,0.9)",
                background: "transparent",
              }}
            />
          </div>
        </div>
      </div>

      {/* Color legend */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-sm text-gray-300">
            {t.detection.legendDiseased}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-sm text-gray-300">
            {t.detection.legendHealthy}
          </span>
        </div>
      </div>

      {/* Health bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-400 font-semibold">
              {t.detection.healthyLabel}
            </span>
            <span className="text-green-400 font-bold">{healthyPct}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full progress-bar"
              style={{ width: animated ? `${healthyPct}%` : "0%" }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400 font-semibold">
              {t.detection.diseasedLabel}
            </span>
            <span className="text-red-400 font-bold">{diseasedPct}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full progress-bar"
              style={{ width: animated ? `${diseasedPct}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">
            {t.detection.affectedArea}
          </p>
          <p className="text-red-400 font-bold text-xl">{diseasedPct}%</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">
            {t.detection.diseaseName}
          </p>
          <p className="text-yellow-300 font-bold">{diseaseName}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">{t.detection.treatment}</p>
          <p className="text-green-300 text-sm">{treatment.split(".")[0]}</p>
        </div>
      </div>

      <p className="text-gray-500 text-xs italic text-center">
        {t.detection.vizNote}
      </p>
    </div>
  );
}
