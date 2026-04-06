import { useLanguage } from "../contexts/LanguageContext";

function TomatoLibraryCard() {
  const { t } = useLanguage();
  const d = t.diseases.tomato;
  return (
    <div
      data-ocid="library.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src="/assets/generated/tomato-late-blight.dim_600x400.jpg"
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
          <span className="text-white font-display font-bold text-lg">
            {d.disease}
          </span>
          <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {d.plant}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
            {t.diseaseLibrary.symptoms}
          </p>
          <p className="text-sm text-muted-foreground">{d.symptoms}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-600 mb-0.5">
            {t.diseaseLibrary.prevention}
          </p>
          <p className="text-sm text-muted-foreground">{d.prevention}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-0.5">
            {t.diseaseLibrary.treatment}
          </p>
          <p className="text-sm text-muted-foreground">{d.treatment}</p>
        </div>
      </div>
    </div>
  );
}

function WheatLibraryCard() {
  const { t } = useLanguage();
  const d = t.diseases.wheat;
  return (
    <div
      data-ocid="library.card"
      className="bg-card rounded-2xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src="/assets/generated/wheat-rust.dim_600x400.jpg"
          alt={d.plant}
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
          <span className="text-white font-display font-bold text-lg">
            {d.disease}
          </span>
          <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {d.plant}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
            {t.diseaseLibrary.symptoms}
          </p>
          <p className="text-sm text-muted-foreground">{d.symptoms}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-600 mb-0.5">
            {t.diseaseLibrary.prevention}
          </p>
          <p className="text-sm text-muted-foreground">{d.prevention}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-0.5">
            {t.diseaseLibrary.treatment}
          </p>
          <p className="text-sm text-muted-foreground">{d.treatment}</p>
        </div>
      </div>
    </div>
  );
}

export default function DiseaseLibrarySection() {
  const { t } = useLanguage();

  return (
    <section id="disease-library" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          📚 {t.diseaseLibrary.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.diseaseLibrary.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TomatoLibraryCard />
          <WheatLibraryCard />
        </div>
      </div>
    </section>
  );
}
