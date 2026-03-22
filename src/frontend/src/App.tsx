import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
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
  ChevronUp,
  Clock,
  Cpu,
  Droplets,
  FlaskConical,
  Home,
  Info,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
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

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
type Lang = "en" | "te" | "hi";

const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // Nav
  nav_home: { en: "Home", te: "హోమ్", hi: "होम" },
  nav_detection: {
    en: "Disease Detection",
    te: "వ్యాధి గుర్తింపు",
    hi: "रोग पहचान",
  },
  nav_health: { en: "Crop Health", te: "పంట ఆరోగ్యం", hi: "फसल स्वास्थ्य" },
  nav_device: { en: "Device Status", te: "పరికర స్థితి", hi: "उपकरण स्थिति" },
  nav_library: { en: "Disease Library", te: "వ్యాధి గ్రంధాలయం", hi: "रोग पुस्तकालय" },
  nav_guidance: {
    en: "Farmer Guidance",
    te: "రైతు మార్గదర్శకత్వం",
    hi: "किसान मार्गदर्शन",
  },
  // Hero
  hero_title: {
    en: "Protect Your Crops",
    te: "మీ పంటలను రక్షించుకోండి",
    hi: "अपनी फसल बचाएं",
  },
  hero_subtitle: {
    en: "Before It's Too Late",
    te: "ఆలస్యం కాకముందే",
    hi: "देर होने से पहले",
  },
  hero_desc: {
    en: "Our smart device uses a high-resolution camera and sensors to scan your field and detect crop diseases early — so you can act fast and save your harvest.",
    te: "మా స్మార్ట్ పరికరం హై-రెజల్యూషన్ కెమెరా మరియు సెన్సర్లను ఉపయోగించి మీ పొలాన్ని స్కాన్ చేసి పంట వ్యాధులను ముందుగా గుర్తిస్తుంది — మీరు వేగంగా చర్య తీసుకోవచ్చు.",
    hi: "हमारा स्मार्ट उपकरण हाई-रेज़ोल्यूशन कैमरा और सेंसर का उपयोग करके आपके खेत को स्कैन करता है और फसल रोगों का जल्दी पता लगाता है।",
  },
  view_detections: {
    en: "View Detections",
    te: "గుర్తింపులు చూడండి",
    hi: "पहचान देखें",
  },
  crop_health: { en: "Crop Health", te: "పంట ఆరోగ్యం", hi: "फसल स्वास्थ्य" },
  // Stats
  crops_monitored: {
    en: "Crops Monitored",
    te: "పర్యవేక్షించిన పంటలు",
    hi: "निगरानी में फसलें",
  },
  diseases_detected: {
    en: "Diseases Detected",
    te: "గుర్తించిన వ్యాధులు",
    hi: "पाए गए रोग",
  },
  field_coverage: { en: "Field Coverage", te: "పొలం కవరేజ్", hi: "खेत कवरेज" },
  healthy_crops: { en: "Healthy Crops", te: "ఆరోగ్యకరమైన పంటలు", hi: "स्वस्थ फसलें" },
  // Sections
  disease_detections: {
    en: "Disease Detections",
    te: "వ్యాధి గుర్తింపులు",
    hi: "रोग पहचान",
  },
  disease_detections_desc: {
    en: "Recent disease alerts found in your field by the smart device.",
    te: "స్మార్ట్ పరికరం ద్వారా మీ పొలంలో కనుగొన్న ఇటీవలి వ్యాధి హెచ్చరికలు.",
    hi: "स्मार्ट उपकरण द्वारा आपके खेत में मिले हालिया रोग अलर्ट।",
  },
  crop_health_overview: {
    en: "Crop Health Overview",
    te: "పంట ఆరోగ్య సమీక్ష",
    hi: "फसल स्वास्थ्य अवलोकन",
  },
  crop_health_desc: {
    en: "Live summary of your field's health status.",
    te: "మీ పొలం ఆరోగ్య స్థితి యొక్క లైవ్ సారాంశం.",
    hi: "आपके खेत की स्वास्थ्य स्थिति का लाइव सारांश।",
  },
  health_distribution: {
    en: "Health Distribution",
    te: "ఆరోగ్య పంపిణీ",
    hi: "स्वास्थ्य वितरण",
  },
  field_statistics: {
    en: "Field Statistics",
    te: "పొలం గణాంకాలు",
    hi: "खेत के आंकड़े",
  },
  infected_crops: { en: "Infected Crops", te: "సోకిన పంటలు", hi: "संक्रमित फसलें" },
  total_crops: {
    en: "Total Crops Monitored",
    te: "మొత్తం పంటలు",
    hi: "कुल निगरानी फसलें",
  },
  last_updated: { en: "Last Updated", te: "చివరి నవీకరణ", hi: "अंतिम अपडेट" },
  field_coverage_section: {
    en: "Field Coverage",
    te: "పొలం కవరేజ్",
    hi: "खेत कवरेज",
  },
  field_coverage_desc: {
    en: "How much of your field has been scanned by the device.",
    te: "పరికరం ద్వారా మీ పొలం ఎంత స్కాన్ అయిందో.",
    hi: "उपकरण द्वारा आपके खेत का कितना भाग स्कैन हुआ।",
  },
  of_field_scanned: {
    en: "of total field scanned",
    te: "మొత్తం పొలం స్కాన్ అయింది",
    hi: "कुल खेत स्कैन हुआ",
  },
  active_zone: { en: "Active Zone", te: "యాక్టివ్ జోన్", hi: "सक्रिय क्षेत्र" },
  currently_scanning: {
    en: "Currently scanning",
    te: "ప్రస్తుతం స్కాన్ అవుతోంది",
    hi: "वर्तमान में स्कैन हो रहा है",
  },
  remaining_to_scan: {
    en: "Remaining to scan",
    te: "స్కాన్ చేయాల్సినది",
    hi: "स्कैन करना शेष",
  },
  device_status: { en: "Device Status", te: "పరికర స్థితి", hi: "उपकरण स्थिति" },
  device_status_desc: {
    en: "Real-time information about your scanning device.",
    te: "మీ స్కానింగ్ పరికరం గురించి రియల్-టైమ్ సమాచారం.",
    hi: "आपके स्कैनिंग उपकरण के बारे में रीयल-टाइम जानकारी।",
  },
  status: { en: "Status", te: "స్థితి", hi: "स्थिति" },
  battery: { en: "Battery", te: "బ్యాటరీ", hi: "बैटरी" },
  last_scan: { en: "Last Scan", te: "చివరి స్కాన్", hi: "अंतिम स्कैन" },
  field_covered: { en: "Field Covered", te: "పొలం కవర్ అయింది", hi: "खेत कवर हुआ" },
  disease_library: {
    en: "Disease Library",
    te: "వ్యాధి గ్రంధాలయం",
    hi: "रोग पुस्तकालय",
  },
  disease_library_desc: {
    en: "Common crop diseases — learn symptoms, prevention, and treatment.",
    te: "సాధారణ పంట వ్యాధులు — లక్షణాలు, నివారణ మరియు చికిత్స తెలుసుకోండి.",
    hi: "आम फसल रोग — लक्षण, बचाव और उपचार जानें।",
  },
  symptoms: { en: "Symptoms", te: "లక్షణాలు", hi: "लक्षण" },
  prevention: { en: "Prevention", te: "నివారణ", hi: "बचाव" },
  treatment: { en: "Treatment", te: "చికిత్స", hi: "उपचार" },
  farmer_guidance: {
    en: "Farmer Guidance",
    te: "రైతు మార్గదర్శకత్వం",
    hi: "किसान मार्गदर्शन",
  },
  farmer_guidance_desc: {
    en: "Simple steps to keep your crops healthy and act fast when disease is found.",
    te: "మీ పంటలను ఆరోగ్యంగా ఉంచడానికి మరియు వ్యాధి కనుగొన్నప్పుడు త్వరగా వ్యవహరించడానికి సులభ దశలు.",
    hi: "अपनी फसलों को स्वस्थ रखने और रोग मिलने पर जल्दी काम करने के सरल कदम।",
  },
  // Disease cards
  affected_area: { en: "Affected Area", te: "ప్రభావిత ప్రాంతం", hi: "प्रभावित क्षेत्र" },
  recommended_treatment: {
    en: "Recommended Treatment",
    te: "సిఫార్సు చికిత్స",
    hi: "अनुशंसित उपचार",
  },
  affected: { en: "Affected", te: "ప్రభావిత", hi: "प्रभावित" },
  // Multispectral
  view_multispectral: {
    en: "View Multispectral Analysis",
    te: "మల్టీస్పెక్ట్రల్ విశ్లేషణ చూడండి",
    hi: "मल्टीस्पेक्ट्रल विश्लेषण देखें",
  },
  hide_multispectral: {
    en: "Hide Analysis",
    te: "విశ్లేషణ దాచండి",
    hi: "विश्लेषण छुपाएं",
  },
  original_leaf: { en: "Original Leaf", te: "అసలు ఆకు", hi: "मूल पत्ता" },
  multispectral_analysis: {
    en: "Multispectral Analysis",
    te: "మల్టీస్పెక్ట్రల్ విశ్లేషణ",
    hi: "मल्टीस्पेक्ट्रल विश्लेषण",
  },
  diseased_stressed: {
    en: "Diseased / Stressed Regions",
    te: "వ్యాధిగ్రస్తమైన / ఒత్తిడికి లోనైన ప్రాంతాలు",
    hi: "रोगग्रस्त / तनावग्रस्त क्षेत्र",
  },
  healthy_regions: {
    en: "Healthy Regions",
    te: "ఆరోగ్యకరమైన ప్రాంతాలు",
    hi: "स्वस्थ क्षेत्र",
  },
  disease_label: { en: "Disease", te: "వ్యాధి", hi: "रोग" },
  ai_note: {
    en: "🤖 This is AI-based analysis for early disease detection",
    te: "🤖 ఇది ముందస్తు వ్యాధి గుర్తింపు కోసం AI-ఆధారిత విశ్లేషణ",
    hi: "🤖 यह शुरुआती रोग पहचान के लिए AI-आधारित विश्लेषण है",
  },
  healthy_label: { en: "Healthy", te: "ఆరోగ్యకరమైన", hi: "स्वस्थ" },
  diseased_label: { en: "Diseased", te: "వ్యాధిగ్రస్తమైన", hi: "रोगग्रस्त" },
  // Guidance titles
  guidance_title_1: {
    en: "Disease Detected? Do This:",
    te: "వ్యాధి కనుగొనబడిందా? ఇలా చేయండి:",
    hi: "रोग पाया? यह करें:",
  },
  guidance_title_2: {
    en: "How to Apply Pesticide:",
    te: "పురుగుమందు ఎలా వేయాలి:",
    hi: "कीटनाशक कैसे लगाएं:",
  },
  guidance_title_3: {
    en: "Prevent Disease Spread:",
    te: "వ్యాధి వ్యాప్తిని నివారించండి:",
    hi: "रोग फैलने से रोकें:",
  },
  guidance_1_step_1: {
    en: "Check the app for the disease name and severity.",
    te: "వ్యాధి పేరు మరియు తీవ్రత కోసం యాప్ చూడండి.",
    hi: "ऐप में रोग का नाम और गंभीरता जांचें।",
  },
  guidance_1_step_2: {
    en: "Isolate affected plants from healthy ones immediately.",
    te: "ప్రభావిత మొక్కలను వెంటనే ఆరోగ్యకరమైన వాటి నుండి వేరు చేయండి.",
    hi: "प्रभावित पौधों को तुरंत स्वस्थ पौधों से अलग करें।",
  },
  guidance_1_step_3: {
    en: "Contact your local agriculture officer for guidance.",
    te: "మార్గదర్శకత్వం కోసం మీ స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
    hi: "मार्गदर्शन के लिए अपने स्थानीय कृषि अधिकारी से संपर्क करें।",
  },
  guidance_1_step_4: {
    en: "Follow the treatment recommendation shown in the app.",
    te: "యాప్‌లో చూపించిన చికిత్స సూచనను అనుసరించండి.",
    hi: "ऐप में दिखाई गई उपचार अनुशंसा का पालन करें।",
  },
  guidance_1_step_5: {
    en: "Monitor affected area daily for changes.",
    te: "మార్పుల కోసం ప్రభావిత ప్రాంతాన్ని రోజూ పర్యవేక్షించండి.",
    hi: "बदलावों के लिए प्रभावित क्षेत्र की रोज़ निगरानी करें।",
  },
  guidance_2_step_1: {
    en: "Wear protective gloves and a mask before mixing.",
    te: "మిక్సింగ్ చేయడానికి ముందు రక్షణ గ్లౌజులు మరియు మాస్క్ ధరించండి.",
    hi: "मिक्स करने से पहले सुरक्षात्मक दस्ताने और मास्क पहनें।",
  },
  guidance_2_step_2: {
    en: "Mix the correct pesticide amount with water as labeled.",
    te: "లేబుల్ ప్రకారం సరైన పురుగుమందు పరిమాణాన్ని నీటితో కలపండి.",
    hi: "लेबल अनुसार सही कीटनाशक की मात्रा पानी में मिलाएं।",
  },
  guidance_2_step_3: {
    en: "Spray in the early morning or late evening.",
    te: "తెల్లవారుజామున లేదా సాయంత్రం చల్లండి.",
    hi: "सुबह जल्दी या शाम को छिड़काव करें।",
  },
  guidance_2_step_4: {
    en: "Cover all leaves, especially the undersides.",
    te: "అన్ని ఆకులు, ముఖ్యంగా కింది భాగాలను కప్పండి.",
    hi: "सभी पत्तियों को, विशेषकर नीचे की तरफ, ढकें।",
  },
  guidance_2_step_5: {
    en: "Wash hands and equipment thoroughly after use.",
    te: "ఉపయోగించిన తర్వాత చేతులు మరియు పరికరాలు బాగా కడగండి.",
    hi: "उपयोग के बाद हाथ और उपकरण अच्छी तरह धोएं।",
  },
  guidance_3_step_1: {
    en: "Remove and burn infected leaves and plants.",
    te: "సోకిన ఆకులు మరియు మొక్కలను తొలగించి కాల్చండి.",
    hi: "संक्रमित पत्तियों और पौधों को हटाकर जला दें।",
  },
  guidance_3_step_2: {
    en: "Keep field clean — remove weeds regularly.",
    te: "పొలాన్ని పరిశుభ్రంగా ఉంచండి — క్రమం తప్పకుండా కలుపు తీయండి.",
    hi: "खेत साफ रखें — नियमित रूप से खरपतवार हटाएं।",
  },
  guidance_3_step_3: {
    en: "Ensure proper water drainage to avoid root rot.",
    te: "రూట్ రాట్ నివారించడానికి సరైన నీటి పారుదల నిర్ధారించుకోండి.",
    hi: "जड़ सड़न से बचने के लिए उचित जल निकासी सुनिश्चित करें।",
  },
  guidance_3_step_4: {
    en: "Rotate crops each season to break disease cycles.",
    te: "వ్యాధి చక్రాలను విచ్ఛిన్నం చేయడానికి ప్రతి సీజన్ పంట మార్పు చేయండి.",
    hi: "रोग चक्र तोड़ने के लिए हर मौसम में फसल बदलें।",
  },
  guidance_3_step_5: {
    en: "Use disease-resistant seed varieties when possible.",
    te: "సాధ్యమైనప్పుడు వ్యాధి నిరోధక విత్తన రకాలను ఉపయోగించండి.",
    hi: "जब संभव हो, रोग-प्रतिरोधी बीज किस्मों का उपयोग करें।",
  },
  // Footer
  footer_tagline: {
    en: "Smart Crop Disease Detection System",
    te: "స్మార్ట్ పంట వ్యాధి గుర్తింపు వ్యవస్థ",
    hi: "स्मार्ट फसल रोग पहचान प्रणाली",
  },
  footer_desc: {
    en: "AI-powered early disease detection for better harvests.",
    te: "మెరుగైన పంటల కోసం AI-ఆధారిత ముందస్తు వ్యాధి గుర్తింపు.",
    hi: "बेहतर फसल के लिए AI-संचालित प्रारंभिक रोग पहचान।",
  },
  quick_links: { en: "Quick Links", te: "త్వరిత లింకులు", hi: "त्वरित लिंक" },
  contact_us: { en: "Contact Us", te: "మాకు సంప్రదించండి", hi: "हमसे संपर्क करें" },
  phone: { en: "Phone", te: "ఫోన్", hi: "फोन" },
  email: { en: "Email", te: "ఇమెయిల్", hi: "ईमेल" },
  address: { en: "Address", te: "చిరునామా", hi: "पता" },
  built_with: {
    en: "Built with love using",
    te: "ప్రేమతో నిర్మించబడింది",
    hi: "प्यार से बनाया गया",
  },
  // Feedback
  share_feedback: {
    en: "Share Your Feedback",
    te: "మీ అభిప్రాయాన్ని పంచుకోండి",
    hi: "अपनी प्रतिक्रिया साझा करें",
  },
  feedback_name: {
    en: "Your Name (Optional)",
    te: "మీ పేరు (ఐచ్ఛికం)",
    hi: "आपका नाम (वैकल्पिक)",
  },
  feedback_lang: { en: "Preferred Language", te: "పిడిత భాష", hi: "पसंदीदा भाषा" },
  feedback_msg: {
    en: "Feedback or Suggestion",
    te: "అభిప్రాయం లేదా సూచన",
    hi: "प्रतिक्रिया या सुझाव",
  },
  feedback_placeholder: {
    en: "Tell us your problem or suggestion to improve this system",
    te: "ఈ వ్యవస్థను మెరుగుపరచడానికి మీ సమస్య లేదా సూచన చెప్పండి",
    hi: "इस प्रणाली को बेहतर बनाने के लिए अपनी समस्या या सुझाव बताएं",
  },
  submit: {
    en: "Submit Feedback",
    te: "అభిప్రాయం సమర్పించండి",
    hi: "प्रतिक्रिया सबमिट करें",
  },
  thank_you: {
    en: "Thank you for your feedback. We will improve the system.",
    te: "మీ అభిప్రాయానికి ధన్యవాదాలు. మేము వ్యవస్థను మెరుగుపరుస్తాము.",
    hi: "आपकी प्रतिक्రिया के लिए धन्यवाद। हम प्रणाली को बेहतर बनाएंगे।",
  },
  close: { en: "Close", te: "మూసివేయి", hi: "बंद करें" },
  no_diseases: {
    en: "No diseases detected",
    te: "వ్యాధులు గుర్తించబడలేదు",
    hi: "कोई रोग नहीं मिला",
  },
  crops_healthy: {
    en: "Your crops appear healthy!",
    te: "మీ పంటలు ఆరోగ్యంగా ఉన్నాయి!",
    hi: "आपकी फसलें स्वस्थ दिखती हैं!",
  },
  library_empty: {
    en: "Library is empty",
    te: "గ్రంధాలయం ఖాళీగా ఉంది",
    hi: "पुस्तकालय खाली है",
  },
  no_diseases_lib: {
    en: "No diseases in library yet.",
    te: "ఇంకా గ్రంధాలయంలో వ్యాధులు లేవు.",
    hi: "अभी पुस्तकालय में कोई रोग नहीं।",
  },
};

const NAV_KEYS = [
  { href: "#home", key: "nav_home", icon: Home },
  { href: "#detection", key: "nav_detection", icon: Microscope },
  { href: "#health", key: "nav_health", icon: Activity },
  { href: "#device", key: "nav_device", icon: Cpu },
  { href: "#library", key: "nav_library", icon: BookOpen },
  { href: "#guidance", key: "nav_guidance", icon: Sprout },
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

// ── MULTISPECTRAL PANEL ────────────────────────────────────────────────────────
function MultispectralPanel({
  imgSrc,
  diseaseName,
  treatment,
  affectedPct,
  t,
}: {
  imgSrc: string;
  diseaseName: string;
  treatment: string;
  affectedPct: number;
  t: (k: string) => string;
}) {
  const healthyPct = 100 - affectedPct;
  return (
    <div className="mt-4 rounded-xl bg-[oklch(0.18_0.05_145)] text-white p-4 space-y-4">
      {/* Side-by-side images */}
      <div className="grid grid-cols-2 gap-3">
        {/* Original */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
            {t("original_leaf")}
          </p>
          <div className="rounded-lg overflow-hidden border-2 border-white/20">
            <img
              src={imgSrc}
              alt="Original leaf"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
        {/* Multispectral */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-orange-300 uppercase tracking-wide">
            {t("multispectral_analysis")}
          </p>
          <div
            className="rounded-lg overflow-hidden border-2 border-dashed border-red-400"
            style={{ boxShadow: "0 0 20px 8px rgba(255,80,0,0.35)" }}
          >
            <div className="relative w-full h-32">
              <img
                src={imgSrc}
                alt="Multispectral"
                className="w-full h-full object-cover"
                style={{
                  filter: "hue-rotate(280deg) saturate(3) contrast(1.5)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,50,50,0.45) 0%, rgba(255,200,0,0.25) 60%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="text-white/80">{t("diseased_stressed")}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          <span className="text-white/80">{t("healthy_regions")}</span>
        </span>
      </div>

      {/* Bar chart */}
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-emerald-300 font-medium">
              {t("healthy_label")}
            </span>
            <span className="text-emerald-300 font-bold">{healthyPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-1000"
              style={{ width: `${healthyPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-red-300 font-medium">
              {t("diseased_label")}
            </span>
            <span className="text-red-300 font-bold">{affectedPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-red-400 transition-all duration-1000"
              style={{ width: `${affectedPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-1.5 text-sm border-t border-white/10 pt-3">
        <p>
          <span className="text-white/60">{t("affected_area")}: </span>
          <span className="font-bold text-red-300">{affectedPct}%</span>
        </p>
        <p>
          <span className="text-white/60">{t("disease_label")}: </span>
          <span className="font-semibold">{diseaseName}</span>
        </p>
        <p>
          <span className="text-white/60">{t("recommended_treatment")}: </span>
          <span>{treatment}</span>
        </p>
      </div>

      {/* AI note */}
      <p className="text-xs text-white/50 italic border-t border-white/10 pt-3">
        {t("ai_note")}
      </p>
    </div>
  );
}

// ── FEEDBACK DIALOG ────────────────────────────────────────────────────────────
function FeedbackDialog({ t, lang }: { t: (k: string) => string; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [feedbackLang, setFeedbackLang] = useState<Lang>(lang);
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setMsg("");
      setSubmitted(false);
      setFeedbackLang(lang);
    }, 300);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        data-ocid="feedback.open_modal_button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 active:scale-95"
        aria-label="Open feedback"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="feedback.dialog" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t("share_feedback")}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-foreground font-semibold text-lg leading-snug">
                {t("thank_you")}
              </p>
              <Button
                data-ocid="feedback.close_button"
                onClick={handleClose}
                className="bg-primary text-primary-foreground px-8 py-3 text-base"
              >
                {t("close")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">
                  {t("feedback_name")}
                </Label>
                <Input
                  data-ocid="feedback.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramu"
                  className="text-base h-11"
                />
              </div>
              {/* Language */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">
                  {t("feedback_lang")}
                </Label>
                <div className="flex gap-2" data-ocid="feedback.select">
                  {(["en", "te", "hi"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setFeedbackLang(l)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        feedbackLang === l
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      {l === "en" ? "EN" : l === "te" ? "తె" : "हि"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Message */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">
                  {t("feedback_msg")}
                </Label>
                <Textarea
                  data-ocid="feedback.textarea"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={t("feedback_placeholder")}
                  className="min-h-32 text-base resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="feedback.submit_button"
                className="w-full bg-primary text-primary-foreground py-3 text-base font-bold h-12"
              >
                {t("submit")}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const { actor, isFetching: actorFetching } = useActor();
  const [seeded, setSeeded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState<Lang>("en");
  const [multispectralOpen, setMultispectralOpen] = useState<
    Record<string, boolean>
  >({});

  // Translation helper
  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] ?? entry.en ?? key;
  };

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
        { name: t("healthy_crops"), value: Number(healthStats.healthyCount) },
        { name: t("infected_crops"), value: Number(healthStats.infectedCount) },
      ]
    : [];

  const CHART_COLORS = ["oklch(0.55 0.17 145)", "oklch(0.55 0.22 25)"];

  const diseaseImages: Record<string, string> = {
    "Tomato Blight": "/assets/generated/disease-blight.dim_400x300.jpg",
    "Rice Rust": "/assets/generated/disease-rust.dim_400x300.jpg",
    "Corn Leaf Blight": "/assets/generated/disease-mold.dim_400x300.jpg",
  };
  const fallbackDiseaseImg = "/assets/generated/disease-blight.dim_400x300.jpg";

  const toggleMultispectral = (id: string) => {
    setMultispectralOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-base text-foreground hidden sm:block">
              Smart Crop Detection
            </span>
            <span className="font-display font-bold text-base text-foreground sm:hidden">
              SmartCrop
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_KEYS.map(({ href, key }) => (
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
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Right side: language selector + mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="flex items-center gap-1" data-ocid="lang.select">
              {(["en", "te", "hi"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  data-ocid={`lang.${l}.toggle`}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                    language === l
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {l === "en" ? "EN" : l === "te" ? "తె" : "हि"}
                </button>
              ))}
            </div>

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
              {NAV_KEYS.map(({ href, key, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  data-ocid={`nav.mobile.${href.replace("#", "")}.link`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {t(key)}
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
                  {t("hero_title")}
                  <span className="block text-accent">
                    {" "}
                    {t("hero_subtitle")}
                  </span>
                </h1>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  {t("hero_desc")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#detection"
                    data-ocid="hero.detection.primary_button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Microscope className="w-4 h-4" />
                    {t("view_detections")}
                  </a>
                  <a
                    href="#health"
                    data-ocid="hero.health.secondary_button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors border border-white/20 text-sm backdrop-blur-sm"
                  >
                    <Activity className="w-4 h-4" />
                    {t("crop_health")}
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
                  labelKey: "crops_monitored",
                  value: healthStats
                    ? Number(healthStats.totalCropsMonitored).toLocaleString()
                    : "—",
                },
                {
                  icon: Bug,
                  labelKey: "diseases_detected",
                  value: detections ? detections.length.toString() : "—",
                },
                {
                  icon: MapPin,
                  labelKey: "field_coverage",
                  value: deviceStatus
                    ? `${deviceStatus.fieldCoveragePercentage}%`
                    : "—",
                },
                {
                  icon: ShieldCheck,
                  labelKey: "healthy_crops",
                  value: healthStats ? `${healthPercent}%` : "—",
                },
              ].map(({ icon: Icon, labelKey, value }) => (
                <div key={labelKey} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground font-display">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(labelKey)}
                    </p>
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
              <h2 className="section-heading">{t("disease_detections")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("disease_detections_desc")}
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
                {detections.map((d, i) => {
                  const cardId = String(d.id);
                  const imgSrc =
                    diseaseImages[d.diseaseName] ?? fallbackDiseaseImg;
                  const affectedPct = 35; // hardcoded for demonstration
                  const isOpen = multispectralOpen[cardId] ?? false;
                  return (
                    <Card
                      key={cardId}
                      data-ocid={`detections.item.${i + 1}`}
                      className="shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group"
                    >
                      <div className="h-44 overflow-hidden bg-muted">
                        <img
                          src={imgSrc}
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
                          {t("affected")}: {d.affectedCrop}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground leading-relaxed">
                          {d.description}
                        </p>
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                            <FlaskConical className="w-3.5 h-3.5" />{" "}
                            {t("recommended_treatment")}
                          </p>
                          <p className="text-sm text-foreground">
                            {d.recommendedTreatment}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTimestamp(d.detectedTimestamp)}
                        </p>

                        {/* Multispectral toggle button */}
                        <button
                          type="button"
                          data-ocid={`detections.multispectral.toggle.${i + 1}`}
                          onClick={() => toggleMultispectral(cardId)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Microscope className="w-3.5 h-3.5" />
                            {isOpen
                              ? t("hide_multispectral")
                              : t("view_multispectral")}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Multispectral panel */}
                        {isOpen && (
                          <MultispectralPanel
                            imgSrc={imgSrc}
                            diseaseName={d.diseaseName}
                            treatment={d.recommendedTreatment}
                            affectedPct={affectedPct}
                            t={t}
                          />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              !detectionsLoading && (
                <div
                  data-ocid="detections.empty_state"
                  className="text-center py-16 bg-muted/40 rounded-2xl border border-border"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground text-lg">
                    {t("no_diseases")}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("crops_healthy")}
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
              <h2 className="section-heading">{t("crop_health_overview")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("crop_health_desc")}
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
                        {t("health_distribution")}
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
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${entry.name}`}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
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
                        {t("field_statistics")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                            {t("healthy_crops")}
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
                            {t("infected_crops")}
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
                            {t("total_crops")}
                          </span>
                          <span className="text-lg font-bold text-foreground font-display">
                            {Number(
                              healthStats.totalCropsMonitored,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            {t("last_updated")}
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
              <h2 className="section-heading">{t("field_coverage_section")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("field_coverage_desc")}
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
                          {t("of_field_scanned")}
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
                          {t("active_zone")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("currently_scanning")}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold font-display text-foreground">
                          {100 - Number(deviceStatus.fieldCoveragePercentage)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("remaining_to_scan")}
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
              <h2 className="section-heading">{t("device_status")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("device_status_desc")}
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
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-2">
                        {t("status")}
                      </p>
                      <DeviceStatusBadge
                        status={deviceStatus.operationalStatus}
                      />
                    </CardContent>
                  </Card>
                  {/* Battery */}
                  <Card data-ocid="device.battery.card" className="shadow-card">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                        {Number(deviceStatus.batteryPercentage) > 20 ? (
                          <Battery className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <BatteryCharging className="w-6 h-6 text-amber-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {t("battery")}
                      </p>
                      <p className="text-2xl font-bold font-display text-foreground">
                        {String(deviceStatus.batteryPercentage)}%
                      </p>
                      <AnimatedProgress
                        value={Number(deviceStatus.batteryPercentage)}
                        className="h-2 mt-2 [&>div]:bg-emerald-500"
                      />
                    </CardContent>
                  </Card>
                  {/* Last Scan */}
                  <Card
                    data-ocid="device.lastscan.card"
                    className="shadow-card"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {t("last_scan")}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatTimestamp(deviceStatus.lastScanTimestamp)}
                      </p>
                    </CardContent>
                  </Card>
                  {/* Field Coverage */}
                  <Card
                    data-ocid="device.coverage.card"
                    className="shadow-card"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {t("field_covered")}
                      </p>
                      <p className="text-2xl font-bold font-display text-foreground">
                        {String(deviceStatus.fieldCoveragePercentage)}%
                      </p>
                      <AnimatedProgress
                        value={Number(deviceStatus.fieldCoveragePercentage)}
                        className="h-2 mt-2"
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
              <h2 className="section-heading">{t("disease_library")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("disease_library_desc")}
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
                          <Info className="w-3.5 h-3.5 text-primary" />{" "}
                          {t("symptoms")}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {lib.symptomsDescription}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                          {t("prevention")}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {lib.preventionTips}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="font-semibold text-primary flex items-center gap-1.5 mb-1">
                          <FlaskConical className="w-3.5 h-3.5" />{" "}
                          {t("treatment")}
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
                    {t("library_empty")}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("no_diseases_lib")}
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
              <h2 className="section-heading">{t("farmer_guidance")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 ml-[52px]">
              {t("farmer_guidance_desc")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  color: "bg-red-50 border-red-100",
                  iconColor: "text-red-600",
                  iconBg: "bg-red-100",
                  titleKey: "guidance_title_1",
                  stepKeys: [
                    "guidance_1_step_1",
                    "guidance_1_step_2",
                    "guidance_1_step_3",
                    "guidance_1_step_4",
                    "guidance_1_step_5",
                  ],
                },
                {
                  icon: Droplets,
                  color: "bg-blue-50 border-blue-100",
                  iconColor: "text-blue-600",
                  iconBg: "bg-blue-100",
                  titleKey: "guidance_title_2",
                  stepKeys: [
                    "guidance_2_step_1",
                    "guidance_2_step_2",
                    "guidance_2_step_3",
                    "guidance_2_step_4",
                    "guidance_2_step_5",
                  ],
                },
                {
                  icon: ShieldCheck,
                  color: "bg-emerald-50 border-emerald-100",
                  iconColor: "text-emerald-600",
                  iconBg: "bg-emerald-100",
                  titleKey: "guidance_title_3",
                  stepKeys: [
                    "guidance_3_step_1",
                    "guidance_3_step_2",
                    "guidance_3_step_3",
                    "guidance_3_step_4",
                    "guidance_3_step_5",
                  ],
                },
              ].map(
                (
                  { icon: Icon, color, iconColor, iconBg, titleKey, stepKeys },
                  idx,
                ) => (
                  <Card
                    key={titleKey}
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
                        {t(titleKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2.5">
                        {stepKeys.map((stepKey, si) => (
                          <li
                            key={stepKey}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                          >
                            <span
                              className={`shrink-0 w-5 h-5 rounded-full ${iconBg} ${iconColor} flex items-center justify-center text-xs font-bold mt-0.5`}
                            >
                              {si + 1}
                            </span>
                            {t(stepKey)}
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
                {t("footer_desc")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">
                {t("quick_links")}
              </h4>
              <ul className="space-y-2">
                {NAV_KEYS.map(({ href, key }) => (
                  <li key={href}>
                    <a
                      href={href}
                      data-ocid={`footer.${href.replace("#", "")}.link`}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">
                {t("contact_us")}
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>📞 {t("phone")}: +91 98765 43210</li>
                <li>✉️ {t("email")}: help@smartcrop.ag</li>
                <li>📍 {t("address")}: Hyderabad, Telangana, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()}. {t("built_with")}{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <button
        type="button"
        data-ocid="scroll.top.button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-foreground/80 text-white flex items-center justify-center shadow-lg hover:bg-foreground transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronDown className="w-4 h-4 rotate-180" />
      </button>

      {/* ── FEEDBACK CHAT BUTTON ── */}
      <FeedbackDialog t={t} lang={language} />
    </div>
  );
}
