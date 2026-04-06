import { useLanguage } from "../contexts/LanguageContext";

export default function FarmerGuidanceSection() {
  const { t } = useLanguage();

  const sections = [
    {
      key: "detected",
      icon: "🚨",
      title: t.farmerGuidance.detected,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      titleColor: "text-red-700",
      numBg: "bg-red-100",
      numText: "text-red-700",
      steps: t.farmerGuidance.detectedSteps,
    },
    {
      key: "pesticide",
      icon: "💊",
      title: t.farmerGuidance.pesticide,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      titleColor: "text-blue-700",
      numBg: "bg-blue-100",
      numText: "text-blue-700",
      steps: t.farmerGuidance.pesticideSteps,
    },
    {
      key: "prevention",
      icon: "🛡️",
      title: t.farmerGuidance.prevention,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      titleColor: "text-green-700",
      numBg: "bg-green-100",
      numText: "text-green-700",
      steps: t.farmerGuidance.preventionTips,
    },
  ];

  return (
    <section id="farmer-guidance" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          👨‍🌾 {t.farmerGuidance.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.farmerGuidance.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((s) => (
            <div
              key={s.key}
              data-ocid="guidance.card"
              className={`${s.bgColor} ${s.borderColor} rounded-2xl p-6 md:p-8 border shadow-sm`}
            >
              <h3
                className={`font-display text-lg font-bold mb-5 ${s.titleColor} leading-snug`}
              >
                {s.title}
              </h3>
              <ul className="space-y-3">
                {s.steps.map((step, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static steps
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 ${s.numBg} rounded-full flex items-center justify-center text-sm font-bold ${s.numText} shadow-sm mt-0.5`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground text-sm leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
