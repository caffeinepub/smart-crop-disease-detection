import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-[oklch(0.18_0.05_145)] text-green-100 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-3xl">🌱</span>
          <span className="font-display text-xl font-bold text-white">
            Smart Crop Detection
          </span>
        </div>
        <p className="text-green-300 mb-3">{t.footer.tagline}</p>
        <p className="text-green-400 text-sm mb-4">{t.footer.contact}</p>
        <div className="border-t border-white/10 pt-4">
          <p className="text-green-500 text-xs">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
