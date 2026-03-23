import { useLanguage } from "../contexts/LanguageContext";

type GuidanceCardProps = {
  title: string;
  steps: string[];
  bgColor: string;
  iconBg: string;
};

function GuidanceCard({ title, steps, bgColor, iconBg }: GuidanceCardProps) {
  return (
    <div
      data-ocid="guidance.card"
      className={`${bgColor} rounded-2xl p-6 md:p-8 border border-border shadow-sm`}
    >
      <h3
        className={`font-display text-xl md:text-2xl font-bold mb-5 ${iconBg}`}
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {steps.map((step, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: steps are static translation strings
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm font-bold text-primary shadow-sm mt-0.5">
              {i + 1}
            </span>
            <span className="text-foreground text-base leading-relaxed">
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FarmerGuidanceSection() {
  const { t } = useLanguage();

  return (
    <section id="farmer-guidance" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          👨‍🌾 {t.farmerGuidance.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GuidanceCard
            title={t.farmerGuidance.detected}
            steps={t.farmerGuidance.detectedSteps}
            bgColor="bg-red-50"
            iconBg="text-red-700"
          />
          <GuidanceCard
            title={t.farmerGuidance.pesticide}
            steps={t.farmerGuidance.pesticideSteps}
            bgColor="bg-blue-50"
            iconBg="text-blue-700"
          />
          <GuidanceCard
            title={t.farmerGuidance.prevention}
            steps={t.farmerGuidance.preventionTips}
            bgColor="bg-green-50"
            iconBg="text-green-700"
          />
        </div>
      </div>
    </section>
  );
}
