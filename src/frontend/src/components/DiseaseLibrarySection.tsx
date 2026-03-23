import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Disease = {
  id: string;
  plant: string;
  disease: string;
  imageSrc: string;
  symptoms: string;
  prevention: string;
  treatment: string;
};

const diseases: Disease[] = [
  {
    id: "tomato",
    plant: "Tomato",
    disease: "Late Blight",
    imageSrc: "/assets/generated/tomato-late-blight.dim_600x400.jpg",
    symptoms: "Dark brown spots, white mold on undersides, yellowing leaves",
    prevention:
      "Avoid overhead watering, space plants properly, use resistant varieties",
    treatment: "Apply Mancozeb or Chlorothalonil fungicide every 7-10 days",
  },
  {
    id: "wheat",
    plant: "Wheat",
    disease: "Stem Rust",
    imageSrc: "/assets/generated/wheat-rust.dim_600x400.jpg",
    symptoms: "Orange-brown pustules on stems and leaves, powdery spores",
    prevention: "Plant rust-resistant varieties, monitor early in season",
    treatment: "Apply Propiconazole or Tebuconazole fungicide at first sign",
  },
];

function InfoRow({
  label,
  text,
  color,
}: { label: string; text: string; color: string }) {
  return (
    <div>
      <span className={`text-xs font-bold uppercase tracking-wide ${color}`}>
        {label}:{" "}
      </span>
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}

function DiseaseLibraryCard({ d }: { d: Disease }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-ocid="library.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={d.imageSrc}
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
          <span className="text-white font-display font-bold text-lg">
            {d.plant}
          </span>
          <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {d.disease}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-2 mb-3">
          <InfoRow
            label={t.diseaseLibrary.symptoms}
            text={d.symptoms}
            color="text-orange-600"
          />
        </div>
        <button
          type="button"
          data-ocid="library.toggle"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? "Show less" : "Show more"}
        </button>
        {expanded && (
          <div className="mt-3 space-y-2">
            <InfoRow
              label={t.diseaseLibrary.prevention}
              text={d.prevention}
              color="text-green-600"
            />
            <InfoRow
              label={t.diseaseLibrary.treatment}
              text={d.treatment}
              color="text-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiseaseLibrarySection() {
  const { t } = useLanguage();

  return (
    <section id="disease-library" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          📚 {t.diseaseLibrary.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {diseases.map((d) => (
            <DiseaseLibraryCard key={d.id} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
