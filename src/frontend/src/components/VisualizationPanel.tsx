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
      <p className="text-green-300 font-semibold text-sm text-center mb-4">
        🔬 {t.detection.vizTitle}
      </p>

      {/* Side-by-side images */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-green-300 text-xs font-semibold mb-1 text-center">
            {t.detection.originalImg}
          </p>
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt="Original leaf"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
        <div>
          <p className="text-green-300 text-xs font-semibold mb-1 text-center">
            {t.detection.processedImg}
          </p>
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt="Multispectral"
              className="w-full h-40 object-cover"
              style={{
                filter: "hue-rotate(200deg) saturate(3) brightness(0.8)",
              }}
            />
            <div
              className="absolute inset-0 diseased-overlay"
              style={{ boxShadow: "inset 0 0 20px rgba(220,38,38,0.4)" }}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-red-500" />
          <span className="text-xs text-gray-300">
            {t.detection.legendDiseased}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-green-500" />
          <span className="text-xs text-gray-300">
            {t.detection.legendHealthy}
          </span>
        </div>
      </div>

      {/* Health bars */}
      <div className="space-y-2 mb-5">
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
      <div className="space-y-1 text-sm mb-4">
        <p className="text-gray-300">
          <span className="font-semibold text-white">
            {t.detection.affectedArea}:
          </span>{" "}
          {diseasedPct}%
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">
            {t.detection.diseaseName}:
          </span>{" "}
          {diseaseName}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">
            {t.detection.treatment}:
          </span>{" "}
          {treatment}
        </p>
      </div>

      <p className="text-gray-500 text-xs italic text-center">
        {t.detection.vizNote}
      </p>
    </div>
  );
}
