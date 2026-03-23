import { Menu, X } from "lucide-react";
import { useState } from "react";
import { type Language, useLanguage } from "../contexts/LanguageContext";

const navIds = [
  "home",
  "disease-detection",
  "crop-health",
  "field-coverage",
  "device-status",
  "disease-library",
  "farmer-guidance",
] as const;

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLabels = [
    t.nav.home,
    t.nav.diseaseDetection,
    t.nav.cropHealth,
    t.nav.fieldCoverage,
    t.nav.deviceStatus,
    t.nav.diseaseLibrary,
    t.nav.farmerGuidance,
  ];

  const langOptions: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "te", label: "తె" },
    { code: "hi", label: "हि" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[oklch(0.44_0.16_145)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 text-white font-display font-semibold text-lg"
        >
          <span className="text-2xl">🌱</span>
          <span className="hidden sm:inline">Smart Crop Detection</span>
          <span className="sm:hidden">Crop Detection</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navIds.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              data-ocid="nav.link"
              className="text-green-100 hover:text-white text-sm font-medium px-2 py-1 rounded hover:bg-white/10 transition-colors"
            >
              {navLabels[i]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white/15 overflow-hidden">
            {langOptions.map((opt) => (
              <button
                type="button"
                key={opt.code}
                data-ocid="lang.toggle"
                onClick={() => setLang(opt.code)}
                className={`px-3 py-1 text-sm font-semibold transition-colors ${
                  lang === opt.code
                    ? "bg-white text-[oklch(0.44_0.16_145)]"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[oklch(0.40_0.16_145)] border-t border-white/10 px-4 py-2">
          {navIds.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              data-ocid="nav.link"
              onClick={() => setMenuOpen(false)}
              className="block text-green-100 hover:text-white py-2 text-base font-medium border-b border-white/10 last:border-0"
            >
              {navLabels[i]}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
