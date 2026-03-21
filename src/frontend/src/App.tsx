import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Battery,
  BatteryCharging,
  BookOpen,
  Bug,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  Droplets,
  FlaskConical,
  Home,
  Info,
  Leaf,
  MapPin,
  Menu,
  Microscope,
  ShieldCheck,
  Sprout,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useActor } from "./hooks/useActor";
import {
  useAllDetections,
  useCropHealthStats,
  useDeviceStatus,
  useDiseaseLibrary,
} from "./hooks/useQueries";

const NAV_LINKS = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#detection", label: "Disease Detection", icon: Microscope },
  { href: "#health", label: "Crop Health", icon: Activity },
  { href: "#device", label: "Device Status", icon: Cpu },
  { href: "#library", label: "Disease Library", icon: BookOpen },
  { href: "#guidance", label: "Farmer Guidance", icon: Sprout },
];

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    low: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        map[level.toLowerCase()] ??
        "bg-muted text-muted-foreground border-border"
      }`}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

function DeviceStatusBadge({ status }: { status: string }) {
  if (status === "scanning")
    return (
      <span className="badge-scanning inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        Scanning
      </span>
    );
  if (status === "completed")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Completed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground border border-border">
      <span className="w-2 h-2 rounded-full bg-gray-400" />
      Idle
    </span>
  );
}

function AnimatedProgress({
  value,
  className,
}: { value: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = value / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setDisplayed(value);
              clearInterval(timer);
            } else {
              setDisplayed(Math.round(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <Progress value={displayed} className={className} />
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  if (ms === 0) return "Not yet scanned";
  return new Date(ms).toLocaleString();
}

export default function App() {
  const { actor, isFetching: actorFetching } = useActor();
  const [seeded, setSeeded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Seed data on mount
  useEffect(() => {
    if (!actor || actorFetching || seeded) return;
    actor
      .seedData()
      .then(() => setSeeded(true))
      .catch(() => setSeeded(true));
  }, [actor, actorFetching, seeded]);

  const {
    data: detections,
    isLoading: detectionsLoading,
    isError: detectionsError,
  } = useAllDetections();
  const {
    data: healthStats,
    isLoading: healthLoading,
    isError: healthError,
  } = useCropHealthStats();
  const {
    data: deviceStatus,
    isLoading: deviceLoading,
    isError: deviceError,
  } = useDeviceStatus();
  const {
    data: diseaseLibrary,
    isLoading: libraryLoading,
    isError: libraryError,
  } = useDiseaseLibrary();

  // Track active section
  useEffect(() => {
    const sections = [
      "home",
      "detection",
      "health",
      "coverage",
      "device",
      "library",
      "guidance",
    ];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const o of observers) {
        o?.disconnect();
      }
    };
  }, []);

  const healthPercent = healthStats
    ? Math.round(
        (Number(healthStats.healthyCount) /
          Number(healthStats.totalCropsMonitored)) *
          100,
      )
    : 0;
  const infectedPercent = healthStats
    ? Math.round(
        (Number(healthStats.infectedCount) /
          Number(healthStats.totalCropsMonitored)) *
          100,
      )
    : 0;

  const chartData = healthStats
    ? [
        { name: "Healthy", value: Number(healthStats.healthyCount) },
        { name: "Infected", value: Number(healthStats.infectedCount) },
      ]
    : [];

  const CHART_COLORS = ["oklch(0.55 0.17 145)", "oklch(0.55 0.22 25)"];

  const diseaseImages: Record<string, string> = {
    "Tomato Blight": "/assets/generated/disease-blight.dim_400x300.jpg",
    "Rice Rust": "/assets/generated/disease-rust.dim_400x300.jpg",
    "Corn Leaf Blight": "/assets/generated/disease-mold.dim_400x300.jpg",
  };
  const fallbackDiseaseImg = "/assets/generated/disease-blight.dim_400x300.jpg";

  return (
    <div className="min-h-screen bg-background">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground leading-tight hidden sm:block">
                Smart Crop
                <br />
                <span className="text-sm font-medium text-muted-foreground">
                  Disease Detection
                </span>
              </span>
              <span className="font-display font-bold text-base text-foreground sm:hidden">
                SmartCrop
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  data-ocid={`nav.${href.replace("#", "")}.link`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.menu.toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  data-ocid={`nav.mobile.${href.replace("#", "")}.link`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO / HOME ── */}
        <section id="home" className="relative overflow-hidden">
          <div
            className="relative min-h-[560px] flex items-center"
            style={{
              backgroundImage: `linear-gradient(to right, oklch(0.15 0.06 145 / 0.92) 0%, oklch(0.15 0.06 145 / 0.7) 60%, transparent 100%), url('/assets/generated/hero-cropfield.dim_1200x600.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 text-xs font-semibold tracking-wide uppercase">
                  🌾 AI-Powered Agriculture
                </Badge>
                <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Protect Your Crops
                  <span className="block text-accent">
                    {" "}
                    Before It's Too Late
                  </span>
                </h1>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Our smart device uses a high-resolution camera and sensors to
                  scan your field and detect crop diseases early — so you can
                  act fast and save your harvest.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#detection"
                    data-ocid="hero.detection.primary_button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Microscope className="w-4 h-4" />
                    View Detections
                  </a>
                  <a
                    href="#health"
                    data-ocid="hero.health.secondary_button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors border border-white/20 text-sm backdrop-blur-sm"
                  >
                    <Activity className="w-4 h-4" />
                    Crop Health
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="bg-white border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                {
                  icon: Leaf,
                  label: "Crops Monitored",
                  value: healthStats
                    ? Number(healthStats.totalCropsMonitored).toLocaleString()
                    : "—",
                },
                {
                  icon: Bug,
                  label: "Diseases Detected",
                  value: detections ? detections.length.toString() : "—",
                },
                {
                  icon: MapPin,
                  label: "Field Coverage",
                  value: deviceStatus
                    ? `${deviceStatus.fieldCoveragePercentage}%`
                    : "—",
                },
                {
                  icon: ShieldCheck,
                  label: "Healthy Crops",
                  value: healthStats ? `${healthPercent}%` : "—",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground font-display">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DISEASE DETECTION ── */}
        <section id="detection" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Microscope className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Disease Detections</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              Recent disease alerts found in your field by the smart device.
            </p>

            {detectionsError && (
              <div
                data-ocid="detections.error_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20"
              >
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>Unable to load disease detections. Please try again.</p>
              </div>
            )}

            {detectionsLoading ? (
              <div
                data-ocid="detections.loading_state"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : detections && detections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {detections.map((d, i) => (
                  <Card
                    key={String(d.id)}
                    data-ocid={`detections.item.${i + 1}`}
                    className="shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group"
                  >
                    <div className="h-44 overflow-hidden bg-muted">
                      <img
                        src={diseaseImages[d.diseaseName] ?? fallbackDiseaseImg}
                        alt={d.diseaseName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-bold">
                          {d.diseaseName}
                        </CardTitle>
                        <SeverityBadge level={d.severityLevel} />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        Affected: {d.affectedCrop}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        {d.description}
                      </p>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                          <FlaskConical className="w-3.5 h-3.5" /> Recommended
                          Treatment
                        </p>
                        <p className="text-sm text-foreground">
                          {d.recommendedTreatment}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimestamp(d.detectedTimestamp)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              !detectionsLoading && (
                <div
                  data-ocid="detections.empty_state"
                  className="text-center py-16 bg-muted/40 rounded-2xl border border-border"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground text-lg">
                    No diseases detected
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your crops appear healthy!
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── CROP HEALTH OVERVIEW ── */}
        <section id="health" className="py-16 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Crop Health Overview</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              Live summary of your field's health status.
            </p>

            {healthError && (
              <div
                data-ocid="health.error_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20"
              >
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>Unable to load health stats. Please try again.</p>
              </div>
            )}

            {healthLoading ? (
              <div
                data-ocid="health.loading_state"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-64 w-full rounded-2xl" />
              </div>
            ) : (
              healthStats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart card */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart2 className="w-4 h-4 text-primary" />
                        Health Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {chartData.map((_, index) => (
                              <Cell
                                key={chartData[index].name}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} crops`, ""]}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Stats card */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Leaf className="w-4 h-4 text-primary" />
                        Field Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                            Healthy Crops
                          </span>
                          <span className="font-bold text-foreground">
                            {Number(healthStats.healthyCount).toLocaleString()}{" "}
                            ({healthPercent}%)
                          </span>
                        </div>
                        <AnimatedProgress
                          value={healthPercent}
                          className="h-3 [&>div]:bg-emerald-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                            Infected Crops
                          </span>
                          <span className="font-bold text-foreground">
                            {Number(healthStats.infectedCount).toLocaleString()}{" "}
                            ({infectedPercent}%)
                          </span>
                        </div>
                        <AnimatedProgress
                          value={infectedPercent}
                          className="h-3 [&>div]:bg-red-500"
                        />
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Total Crops Monitored
                          </span>
                          <span className="text-lg font-bold text-foreground font-display">
                            {Number(
                              healthStats.totalCropsMonitored,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            Last Updated
                          </span>
                          <span className="text-sm text-foreground">
                            {formatTimestamp(healthStats.lastUpdatedTimestamp)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── FIELD COVERAGE ── */}
        <section id="coverage" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Field Coverage</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              How much of your field has been scanned by the device.
            </p>

            {deviceLoading ? (
              <div data-ocid="coverage.loading_state">
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
            ) : (
              deviceStatus && (
                <Card className="shadow-card max-w-2xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold font-display text-primary">
                          {String(deviceStatus.fieldCoveragePercentage)}%
                        </p>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          of total field scanned
                        </p>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <AnimatedProgress
                      value={Number(deviceStatus.fieldCoveragePercentage)}
                      className="h-5 rounded-full [&>div]:bg-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <p className="text-lg font-bold font-display text-foreground">
                          Active Zone
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Currently scanning
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold font-display text-foreground">
                          {100 - Number(deviceStatus.fieldCoveragePercentage)}%
                          Left
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Remaining to scan
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </section>

        {/* ── DEVICE STATUS ── */}
        <section id="device" className="py-16 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Device Status</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              Real-time information about your scanning device.
            </p>

            {deviceError && (
              <div
                data-ocid="device.error_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20"
              >
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>Unable to load device status. Please try again.</p>
              </div>
            )}

            {deviceLoading ? (
              <div
                data-ocid="device.loading_state"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-36 w-full rounded-2xl" />
                ))}
              </div>
            ) : (
              deviceStatus && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Status */}
                  <Card data-ocid="device.status.card" className="shadow-card">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Status
                      </p>
                      <DeviceStatusBadge
                        status={deviceStatus.operationalStatus}
                      />
                    </CardContent>
                  </Card>

                  {/* Battery */}
                  <Card data-ocid="device.battery.card" className="shadow-card">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                        {Number(deviceStatus.batteryPercentage) > 20 ? (
                          <Battery className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <BatteryCharging className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Battery
                      </p>
                      <p className="text-2xl font-bold font-display text-foreground">
                        {String(deviceStatus.batteryPercentage)}%
                      </p>
                      <AnimatedProgress
                        value={Number(deviceStatus.batteryPercentage)}
                        className={`mt-2 h-2 ${
                          Number(deviceStatus.batteryPercentage) > 50
                            ? "[&>div]:bg-emerald-500"
                            : Number(deviceStatus.batteryPercentage) > 20
                              ? "[&>div]:bg-amber-500"
                              : "[&>div]:bg-red-500"
                        }`}
                      />
                    </CardContent>
                  </Card>

                  {/* Last Scan */}
                  <Card
                    data-ocid="device.lastscan.card"
                    className="shadow-card"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-violet-600" />
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Last Scan
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatTimestamp(deviceStatus.lastScanTimestamp)}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Coverage */}
                  <Card
                    data-ocid="device.coverage.card"
                    className="shadow-card"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-amber-600" />
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Coverage
                      </p>
                      <p className="text-2xl font-bold font-display text-foreground">
                        {String(deviceStatus.fieldCoveragePercentage)}%
                      </p>
                      <AnimatedProgress
                        value={Number(deviceStatus.fieldCoveragePercentage)}
                        className="mt-2 h-2 [&>div]:bg-amber-500"
                      />
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── DISEASE LIBRARY ── */}
        <section id="library" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Disease Library</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              Learn about common crop diseases, their symptoms, and how to treat
              them.
            </p>

            {libraryError && (
              <div
                data-ocid="library.error_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20"
              >
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>Unable to load disease library. Please try again.</p>
              </div>
            )}

            {libraryLoading ? (
              <div
                data-ocid="library.loading_state"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : diseaseLibrary && diseaseLibrary.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {diseaseLibrary.map((lib, i) => (
                  <Card
                    key={String(lib.id)}
                    data-ocid={`library.item.${i + 1}`}
                    className="shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden bg-muted">
                      <img
                        src={
                          diseaseImages[lib.diseaseName] ?? fallbackDiseaseImg
                        }
                        alt={lib.diseaseName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-bold">
                        {lib.diseaseName}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit text-xs">
                        {lib.affectedCropType}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                          <Info className="w-3.5 h-3.5 text-primary" /> Symptoms
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {lib.symptomsDescription}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                          Prevention
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {lib.preventionTips}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="font-semibold text-primary flex items-center gap-1.5 mb-1">
                          <FlaskConical className="w-3.5 h-3.5" /> Treatment
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {lib.treatmentRecommendations}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              !libraryLoading && (
                <div
                  data-ocid="library.empty_state"
                  className="text-center py-16 bg-muted/40 rounded-2xl border border-border"
                >
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground text-lg">
                    Library is empty
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    No diseases in library yet.
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── FARMER GUIDANCE ── */}
        <section id="guidance" className="py-16 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <h2 className="section-heading">Farmer Guidance</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              Simple steps to keep your crops healthy and act fast when disease
              is found.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  color: "bg-red-50 border-red-100",
                  iconColor: "text-red-600",
                  iconBg: "bg-red-100",
                  title: "Disease Detected? Do This:",
                  steps: [
                    "Check the app for the disease name and severity.",
                    "Isolate affected plants from healthy ones immediately.",
                    "Contact your local agriculture officer for guidance.",
                    "Follow the treatment recommendation shown in the app.",
                    "Monitor affected area daily for changes.",
                  ],
                },
                {
                  icon: Droplets,
                  color: "bg-blue-50 border-blue-100",
                  iconColor: "text-blue-600",
                  iconBg: "bg-blue-100",
                  title: "How to Apply Pesticide:",
                  steps: [
                    "Wear protective gloves and a mask before mixing.",
                    "Mix the correct pesticide amount with water as labeled.",
                    "Spray in the early morning or late evening.",
                    "Cover all leaves, especially the undersides.",
                    "Wash hands and equipment thoroughly after use.",
                  ],
                },
                {
                  icon: ShieldCheck,
                  color: "bg-emerald-50 border-emerald-100",
                  iconColor: "text-emerald-600",
                  iconBg: "bg-emerald-100",
                  title: "Prevent Disease Spread:",
                  steps: [
                    "Remove and burn infected leaves and plants.",
                    "Keep field clean — remove weeds regularly.",
                    "Ensure proper water drainage to avoid root rot.",
                    "Rotate crops each season to break disease cycles.",
                    "Use disease-resistant seed varieties when possible.",
                  ],
                },
              ].map(
                (
                  { icon: Icon, color, iconColor, iconBg, title, steps },
                  idx,
                ) => (
                  <Card
                    key={title}
                    data-ocid={`guidance.item.${idx + 1}`}
                    className={`shadow-card border ${color}`}
                  >
                    <CardHeader className="pb-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-2`}
                      >
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <CardTitle className="text-base font-bold">
                        {title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2.5">
                        {steps.map((step, si) => (
                          <li
                            key={step}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                          >
                            <span
                              className={`shrink-0 w-5 h-5 rounded-full ${iconBg} ${iconColor} flex items-center justify-center text-xs font-bold mt-0.5`}
                            >
                              {si + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-base text-white">
                  Smart Crop Detection
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Empowering farmers with AI-powered disease detection to protect
                their crops and livelihoods.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white/90 mb-3 text-sm uppercase tracking-wide">
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-white/90 mb-3 text-sm uppercase tracking-wide">
                Contact
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <p>📧 support@smartcrop.ai</p>
                <p>📞 +1 800 CROP-HELP</p>
                <p>🌍 Available worldwide</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Smart Crop Disease Detection System.
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <a
        href="#home"
        data-ocid="nav.top.link"
        className="fixed bottom-6 right-6 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Back to top"
      >
        <ChevronDown className="w-5 h-5 rotate-180" />
      </a>
    </div>
  );
}
