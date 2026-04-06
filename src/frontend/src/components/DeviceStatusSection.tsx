import { Battery, Clock, Cpu, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const lastScanTime = new Date().toLocaleString();

export default function DeviceStatusSection() {
  const { t } = useLanguage();

  const cards = [
    {
      key: "status",
      icon: <Cpu size={28} className="text-primary" />,
      label: t.deviceStatus.status,
      value: t.deviceStatus.statusScanning,
      sub: (
        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full mt-2">
          {t.deviceStatus.statusScanning}
        </span>
      ),
    },
    {
      key: "battery",
      icon: <Battery size={28} className="text-green-500" />,
      label: t.deviceStatus.battery,
      value: "75%",
      sub: (
        <div className="w-full bg-muted rounded-full h-3 mt-2">
          <div
            className="h-full bg-green-500 rounded-full progress-bar"
            style={{ width: "75%" }}
          />
        </div>
      ),
    },
    {
      key: "scan",
      icon: <Clock size={28} className="text-accent" />,
      label: t.deviceStatus.lastScan,
      value: lastScanTime,
      sub: null,
    },
    {
      key: "field",
      icon: <MapPin size={28} className="text-orange-500" />,
      label: t.deviceStatus.mode,
      value: "80%",
      sub: (
        <div className="w-full bg-muted rounded-full h-3 mt-2">
          <div
            className="h-full bg-orange-400 rounded-full progress-bar"
            style={{ width: "80%" }}
          />
        </div>
      ),
    },
  ];

  return (
    <section id="device-status" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          📡 {t.deviceStatus.sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          {t.deviceStatus.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
              <p className="font-display text-xl font-bold text-foreground break-words">
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
