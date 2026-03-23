import { Battery, Clock, Globe, Wifi } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function DeviceStatusSection() {
  const { t } = useLanguage();

  const cards = [
    {
      key: "battery",
      icon: <Battery size={28} className="text-green-500" />,
      label: t.deviceStatus.battery,
      value: "82%",
      sub: (
        <div className="w-full bg-muted rounded-full h-3 mt-2">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: "82%" }}
          />
        </div>
      ),
    },
    {
      key: "status",
      icon: <Wifi size={28} className="text-primary" />,
      label: t.deviceStatus.status,
      value: t.deviceStatus.statusScanning,
      sub: (
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-3 bg-green-400 rounded-full scanning-dot" />
          <span className="text-sm text-green-600 font-medium">
            {t.deviceStatus.statusScanning}
          </span>
        </div>
      ),
    },
    {
      key: "scan",
      icon: <Clock size={28} className="text-accent" />,
      label: t.deviceStatus.lastScan,
      value: "Today, 10:45 AM",
      sub: null,
    },
    {
      key: "mode",
      icon: <Globe size={28} className="text-orange-500" />,
      label: t.deviceStatus.mode,
      value: "Simulation",
      sub: (
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full mt-2">
          Simulation Mode
        </span>
      ),
    },
  ];

  return (
    <section id="device-status" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
          📡 {t.deviceStatus.sectionTitle}
        </h2>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl px-6 py-4 mb-8 text-center">
          <p className="text-orange-700 font-semibold text-base">
            {t.deviceStatus.simBanner}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.key}
              data-ocid="device.card"
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                {card.icon}
                <p className="text-muted-foreground text-sm font-medium">
                  {card.label}
                </p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {card.value}
              </p>
              {card.sub}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
