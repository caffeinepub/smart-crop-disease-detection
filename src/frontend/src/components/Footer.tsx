import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.diseaseDetection, href: "#disease-detection" },
    { label: t.nav.cropHealth, href: "#crop-health" },
    { label: t.nav.deviceStatus, href: "#device-status" },
    { label: t.nav.diseaseLibrary, href: "#disease-library" },
    { label: t.nav.farmerGuidance, href: "#farmer-guidance" },
  ];

  return (
    <footer className="bg-[oklch(0.18_0.05_145)] text-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🌱</span>
              <span className="font-display text-xl font-bold text-white">
                Smart Crop Detection
              </span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-green-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              {t.footer.contactUs}
            </h4>
            <p className="text-sm text-green-300 leading-relaxed whitespace-pre-line">
              {t.footer.contact}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
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
