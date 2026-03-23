import { type ReactNode, createContext, useContext, useState } from "react";

export type Language = "en" | "te" | "hi";

type Translations = {
  nav: {
    home: string;
    diseaseDetection: string;
    cropHealth: string;
    fieldCoverage: string;
    deviceStatus: string;
    diseaseLibrary: string;
    farmerGuidance: string;
  };
  home: {
    heading: string;
    subheading: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  detection: {
    sectionTitle: string;
    uploadBtn: string;
    uploadHint: string;
    analyzing: string;
    resultTitle: string;
    plantName: string;
    diseaseName: string;
    confidence: string;
    affectedArea: string;
    treatment: string;
    viewAnalysis: string;
    hideAnalysis: string;
    vizTitle: string;
    originalImg: string;
    processedImg: string;
    legendDiseased: string;
    legendHealthy: string;
    healthyLabel: string;
    diseasedLabel: string;
    vizNote: string;
    demoTitle: string;
  };
  cropHealth: {
    sectionTitle: string;
    totalAnalyzed: string;
    healthy: string;
    infected: string;
    cropsCount: string;
  };
  fieldCoverage: {
    sectionTitle: string;
    coverage: string;
    totalArea: string;
    scanned: string;
    remaining: string;
  };
  deviceStatus: {
    sectionTitle: string;
    battery: string;
    status: string;
    lastScan: string;
    mode: string;
    simBanner: string;
    statusScanning: string;
  };
  diseaseLibrary: {
    sectionTitle: string;
    symptoms: string;
    prevention: string;
    treatment: string;
  };
  farmerGuidance: {
    sectionTitle: string;
    detected: string;
    detectedSteps: string[];
    pesticide: string;
    pesticideSteps: string[];
    prevention: string;
    preventionTips: string[];
  };
  feedback: {
    title: string;
    namePlaceholder: string;
    selectLanguage: string;
    textPlaceholder: string;
    submitBtn: string;
    thankYou: string;
  };
  footer: {
    tagline: string;
    contact: string;
    copyright: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      diseaseDetection: "Disease Detection",
      cropHealth: "Crop Health",
      fieldCoverage: "Field Coverage",
      deviceStatus: "Device Status",
      diseaseLibrary: "Disease Library",
      farmerGuidance: "Farmer Guidance",
    },
    home: {
      heading: "Smart Crop Disease Detection System",
      subheading:
        "This system uses AI and camera-based image analysis to detect crop diseases at an early stage.",
      feature1Title: "Early Detection",
      feature1Desc:
        "Identify diseases before they spread and cause major crop loss.",
      feature2Title: "Low-Cost Solution",
      feature2Desc:
        "Affordable AI-powered analysis accessible to every farmer.",
      feature3Title: "Farmer-Friendly",
      feature3Desc: "Simple interface designed for easy use in the field.",
    },
    detection: {
      sectionTitle: "Disease Detection",
      uploadBtn: "📤 Upload Leaf Image",
      uploadHint: "Take a photo of your leaf and upload it for AI analysis",
      analyzing: "Analyzing leaf... Please wait",
      resultTitle: "AI Analysis Result",
      plantName: "Plant",
      diseaseName: "Disease",
      confidence: "Confidence",
      affectedArea: "Affected Area",
      treatment: "Recommended Treatment",
      viewAnalysis: "🔬 View AI Analysis",
      hideAnalysis: "🔼 Hide Analysis",
      vizTitle: "AI-Based Leaf Health Visualization",
      originalImg: "Original Leaf Image",
      processedImg: "Processed Analysis",
      legendDiseased: "Red/Yellow = Diseased Regions",
      legendHealthy: "Green/Blue = Healthy Regions",
      healthyLabel: "Healthy",
      diseasedLabel: "Diseased",
      vizNote:
        "This is AI-based analysis for early disease detection and approximate estimation.",
      demoTitle: "Recent Detections",
    },
    cropHealth: {
      sectionTitle: "Crop Health Overview",
      totalAnalyzed: "Total Crops Analyzed",
      healthy: "Healthy Crops",
      infected: "Infected Crops",
      cropsCount: "1,240 crops",
    },
    fieldCoverage: {
      sectionTitle: "Field Coverage",
      coverage: "Field Coverage",
      totalArea: "Total Area",
      scanned: "Scanned",
      remaining: "Remaining",
    },
    deviceStatus: {
      sectionTitle: "Device Status",
      battery: "Battery Level",
      status: "Device Status",
      lastScan: "Last Scan",
      mode: "Mode",
      simBanner: "⚠️ Simulation Mode Active — No hardware connected",
      statusScanning: "Scanning",
    },
    diseaseLibrary: {
      sectionTitle: "Disease Library",
      symptoms: "Symptoms",
      prevention: "Prevention",
      treatment: "Treatment",
    },
    farmerGuidance: {
      sectionTitle: "Farmer Guidance",
      detected: "🚨 Disease Detected? Do This:",
      detectedSteps: [
        "Do not panic — early detection means it can be controlled",
        "Separate infected plants from healthy ones immediately",
        "Take a photo and upload to this system for AI analysis",
        "Follow the recommended treatment shown in results",
        "Contact your local agriculture officer if unsure",
      ],
      pesticide: "💊 How to Apply Pesticide:",
      pesticideSteps: [
        "Wear gloves and mask before handling any pesticide",
        "Mix the correct dose as shown on the label",
        "Spray evenly on both sides of leaves in early morning",
        "Wash hands thoroughly after spraying",
      ],
      prevention: "🛡️ Prevention Tips:",
      preventionTips: [
        "Inspect crops every 3-4 days for early signs",
        "Avoid overwatering — fungal diseases love moisture",
        "Plant disease-resistant seed varieties",
        "Remove and burn infected plant material",
      ],
    },
    feedback: {
      title: "Farmer Feedback",
      namePlaceholder: "Your name (optional)",
      selectLanguage: "Select Language",
      textPlaceholder:
        "Tell us your problem or suggestion to improve this system",
      submitBtn: "Submit Feedback",
      thankYou: "Thank you for your feedback. We will improve the system.",
    },
    footer: {
      tagline: "Protecting farmers with AI-powered early detection",
      contact: "Contact: support@cropdetect.ai | +91 1800-XXX-XXXX",
      copyright: `© ${new Date().getFullYear()} Smart Crop Disease Detection System. Built with love using caffeine.ai`,
    },
  },
  te: {
    nav: {
      home: "హోమ్",
      diseaseDetection: "వ్యాధి నిర్ధారణ",
      cropHealth: "పంట ఆరోగ్యం",
      fieldCoverage: "పొలం కవరేజ్",
      deviceStatus: "పరికర స్థితి",
      diseaseLibrary: "వ్యాధుల లైబ్రరీ",
      farmerGuidance: "రైతు మార్గదర్శకత",
    },
    home: {
      heading: "స్మార్ట్ పంట వ్యాధి నిర్ధారణ వ్యవస్థ",
      subheading:
        "ఈ వ్యవస్థ AI మరియు కెమెరా ఆధారిత చిత్ర విశ్లేషణను ఉపయోగించి పంట వ్యాధులను ముందస్తుగా గుర్తిస్తుంది.",
      feature1Title: "ముందస్తు నిర్ధారణ",
      feature1Desc: "వ్యాధులు వ్యాపించే ముందే గుర్తించండి.",
      feature2Title: "తక్కువ ఖర్చు",
      feature2Desc: "ప్రతి రైతుకు అందుబాటులో ఉండే AI విశ్లేషణ.",
      feature3Title: "రైతుకు అనుకూలం",
      feature3Desc: "పొలంలో సులభంగా వాడగలిగే సరళమైన ఇంటర్ఫేస్.",
    },
    detection: {
      sectionTitle: "వ్యాధి నిర్ధారణ",
      uploadBtn: "📤 ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
      uploadHint: "మీ ఆకు యొక్క ఫోటో తీసి AI విశ్లేషణ కోసం అప్‌లోడ్ చేయండి",
      analyzing: "ఆకు విశ్లేషిస్తోంది... దయచేసి వేచి ఉండండి",
      resultTitle: "AI విశ్లేషణ ఫలితం",
      plantName: "మొక్క",
      diseaseName: "వ్యాధి",
      confidence: "నమ్మకం",
      affectedArea: "ప్రభావిత ప్రాంతం",
      treatment: "సిఫార్సు చికిత్స",
      viewAnalysis: "🔬 AI విశ్లేషణ చూడండి",
      hideAnalysis: "🔼 విశ్లేషణ దాచండి",
      vizTitle: "AI ఆధారిత ఆకు ఆరోగ్య దృశ్యీకరణ",
      originalImg: "అసలు ఆకు చిత్రం",
      processedImg: "ప్రాసెస్ చేసిన విశ్లేషణ",
      legendDiseased: "ఎర్రటి/పసుపు = రోగగ్రస్త ప్రాంతాలు",
      legendHealthy: "ఆకుపచ్చ/నీలం = ఆరోగ్యకరమైన ప్రాంతాలు",
      healthyLabel: "ఆరోగ్యకరమైన",
      diseasedLabel: "రోగగ్రస్త",
      vizNote: "ఇది ముందస్తు వ్యాధి నిర్ధారణ కోసం AI ఆధారిత విశ్లేషణ.",
      demoTitle: "ఇటీవలి నిర్ధారణలు",
    },
    cropHealth: {
      sectionTitle: "పంట ఆరోగ్య అవలోకనం",
      totalAnalyzed: "విశ్లేషించిన మొత్తం పంటలు",
      healthy: "ఆరోగ్యకరమైన పంటలు",
      infected: "సోకిన పంటలు",
      cropsCount: "1,240 పంటలు",
    },
    fieldCoverage: {
      sectionTitle: "పొలం కవరేజ్",
      coverage: "పొలం కవరేజ్",
      totalArea: "మొత్తం విస్తీర్ణం",
      scanned: "స్కాన్ చేయబడింది",
      remaining: "మిగిలింది",
    },
    deviceStatus: {
      sectionTitle: "పరికర స్థితి",
      battery: "బ్యాటరీ స్థాయి",
      status: "పరికర స్థితి",
      lastScan: "చివరి స్కాన్",
      mode: "మోడ్",
      simBanner: "⚠️ సిమ్యులేషన్ మోడ్ సక్రియంగా ఉంది — హార్డ్‌వేర్ కనెక్ట్ కాలేదు",
      statusScanning: "స్కానింగ్",
    },
    diseaseLibrary: {
      sectionTitle: "వ్యాధుల లైబ్రరీ",
      symptoms: "లక్షణాలు",
      prevention: "నివారణ",
      treatment: "చికిత్స",
    },
    farmerGuidance: {
      sectionTitle: "రైతు మార్గదర్శకత",
      detected: "🚨 వ్యాధి కనుగొనబడిందా? ఇలా చేయండి:",
      detectedSteps: [
        "భయపడకండి — ముందస్తు నిర్ధారణ నియంత్రించవచ్చు",
        "వెంటనే ఆరోగ్యకరమైన వాటి నుండి సోకిన మొక్కలను వేరు చేయండి",
        "ఫోటో తీసి AI విశ్లేషణ కోసం అప్‌లోడ్ చేయండి",
        "ఫలితాల్లో చూపించిన చికిత్సను అనుసరించండి",
        "అనిశ్చితంగా ఉంటే స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి",
      ],
      pesticide: "💊 పురుగుమందు ఎలా వాడాలి:",
      pesticideSteps: [
        "పురుగుమందు నిర్వహించే ముందు చేతి తొడుగులు మరియు మాస్క్ ధరించండి",
        "లేబుల్‌లో చూపిన సరైన మోతాదును కలపండి",
        "ఉదయాన్నే ఆకుల రెండు వైపులా సమానంగా స్ప్రే చేయండి",
        "స్ప్రే చేసిన తర్వాత చేతులు బాగా కడుక్కోండి",
      ],
      prevention: "🛡️ నివారణ చిట్కాలు:",
      preventionTips: [
        "ముందస్తు సంకేతాల కోసం ప్రతి 3-4 రోజులకు పంటలు తనిఖీ చేయండి",
        "అధికంగా నీరు పోయకండి — శిలీంద్ర వ్యాధులు తేమను ఇష్టపడతాయి",
        "వ్యాధి నిరోధక విత్తన రకాలను నాటండి",
        "సోకిన మొక్క పదార్థాన్ని తొలగించి కాల్చండి",
      ],
    },
    feedback: {
      title: "రైతు అభిప్రాయం",
      namePlaceholder: "మీ పేరు (ఐచ్ఛికం)",
      selectLanguage: "భాష ఎంచుకోండి",
      textPlaceholder: "ఈ వ్యవస్థను మెరుగుపరచడానికి మీ సమస్య లేదా సూచన చెప్పండి",
      submitBtn: "అభిప్రాయం సమర్పించండి",
      thankYou: "మీ అభిప్రాయానికి ధన్యవాదాలు. మేము వ్యవస్థను మెరుగుపరుస్తాము.",
    },
    footer: {
      tagline: "AI ఆధారిత ముందస్తు నిర్ధారణతో రైతులను రక్షించడం",
      contact: "సంప్రదించండి: support@cropdetect.ai | +91 1800-XXX-XXXX",
      copyright: `© ${new Date().getFullYear()} స్మార్ట్ పంట వ్యాధి నిర్ధారణ వ్యవస్థ`,
    },
  },
  hi: {
    nav: {
      home: "होम",
      diseaseDetection: "रोग पहचान",
      cropHealth: "फसल स्वास्थ्य",
      fieldCoverage: "खेत कवरेज",
      deviceStatus: "डिवाइस स्थिति",
      diseaseLibrary: "रोग पुस्तकालय",
      farmerGuidance: "किसान मार्गदर्शन",
    },
    home: {
      heading: "स्मार्ट फसल रोग पहचान प्रणाली",
      subheading:
        "यह प्रणाली AI और कैमरा-आधारित छवि विश्लेषण का उपयोग करके फसल रोगों को प्रारंभिक अवस्था में पहचानती है।",
      feature1Title: "प्रारंभिक पहचान",
      feature1Desc: "रोग फैलने से पहले उसे पहचानें और बड़ा नुकसान टालें।",
      feature2Title: "कम लागत",
      feature2Desc: "हर किसान के लिए सुलभ AI-संचालित विश्लेषण।",
      feature3Title: "किसान-अनुकूल",
      feature3Desc: "खेत में आसानी से उपयोग के लिए सरल इंटरफेस।",
    },
    detection: {
      sectionTitle: "रोग पहचान",
      uploadBtn: "📤 पत्ती की तस्वीर अपलोड करें",
      uploadHint: "अपनी पत्ती की फोटो लें और AI विश्लेषण के लिए अपलोड करें",
      analyzing: "पत्ती का विश्लेषण हो रहा है... कृपया प्रतीक्षा करें",
      resultTitle: "AI विश्लेषण परिणाम",
      plantName: "पौधा",
      diseaseName: "रोग",
      confidence: "विश्वास",
      affectedArea: "प्रभावित क्षेत्र",
      treatment: "अनुशंसित उपचार",
      viewAnalysis: "🔬 AI विश्लेषण देखें",
      hideAnalysis: "🔼 विश्लेषण छुपाएं",
      vizTitle: "AI-आधारित पत्ती स्वास्थ्य विज़ुअलाइज़ेशन",
      originalImg: "मूल पत्ती छवि",
      processedImg: "प्रसंस्कृत विश्लेषण",
      legendDiseased: "लाल/पीला = रोगग्रस्त क्षेत्र",
      legendHealthy: "हरा/नीला = स्वस्थ क्षेत्र",
      healthyLabel: "स्वस्थ",
      diseasedLabel: "रोगग्रस्त",
      vizNote: "यह प्रारंभिक रोग पहचान के लिए AI-आधारित विश्लेषण है।",
      demoTitle: "हालिया पहचानें",
    },
    cropHealth: {
      sectionTitle: "फसल स्वास्थ्य अवलोकन",
      totalAnalyzed: "कुल विश्लेषित फसलें",
      healthy: "स्वस्थ फसलें",
      infected: "संक्रमित फसलें",
      cropsCount: "1,240 फसलें",
    },
    fieldCoverage: {
      sectionTitle: "खेत कवरेज",
      coverage: "खेत कवरेज",
      totalArea: "कुल क्षेत्रफल",
      scanned: "स्कैन किया",
      remaining: "शेष",
    },
    deviceStatus: {
      sectionTitle: "डिवाइस स्थिति",
      battery: "बैटरी स्तर",
      status: "डिवाइस स्थिति",
      lastScan: "अंतिम स्कैन",
      mode: "मोड",
      simBanner: "⚠️ सिमुलेशन मोड सक्रिय — कोई हार्डवेयर कनेक्ट नहीं",
      statusScanning: "स्कैनिंग",
    },
    diseaseLibrary: {
      sectionTitle: "रोग पुस्तकालय",
      symptoms: "लक्षण",
      prevention: "रोकथाम",
      treatment: "उपचार",
    },
    farmerGuidance: {
      sectionTitle: "किसान मार्गदर्शन",
      detected: "🚨 रोग पाया? यह करें:",
      detectedSteps: [
        "घबराएं नहीं — प्रारंभिक पहचान से इसे नियंत्रित किया जा सकता है",
        "तुरंत संक्रमित पौधों को स्वस्थ पौधों से अलग करें",
        "फोटो लें और AI विश्लेषण के लिए अपलोड करें",
        "परिणामों में दिखाए गए उपचार का पालन करें",
        "अनिश्चित होने पर स्थानीय कृषि अधिकारी से संपर्क करें",
      ],
      pesticide: "💊 कीटनाशक कैसे लगाएं:",
      pesticideSteps: [
        "कीटनाशक संभालने से पहले दस्ताने और मास्क पहनें",
        "लेबल पर बताई सही मात्रा मिलाएं",
        "सुबह जल्दी पत्तियों के दोनों तरफ समान रूप से स्प्रे करें",
        "स्प्रे के बाद हाथ अच्छी तरह धोएं",
      ],
      prevention: "🛡️ रोकथाम के टिप्स:",
      preventionTips: [
        "प्रारंभिक संकेतों के लिए हर 3-4 दिन में फसलों की जांच करें",
        "अत्यधिक पानी न दें — फफूंद रोग नमी पसंद करते हैं",
        "रोग-प्रतिरोधी बीज किस्में लगाएं",
        "संक्रमित पौधों की सामग्री हटाकर जला दें",
      ],
    },
    feedback: {
      title: "किसान प्रतिक्रिया",
      namePlaceholder: "आपका नाम (वैकल्पिक)",
      selectLanguage: "भाषा चुनें",
      textPlaceholder: "इस प्रणाली को बेहतर बनाने के लिए अपनी समस्या या सुझाव बताएं",
      submitBtn: "प्रतिक्रिया भेजें",
      thankYou: "आपकी प्रतिक्रिया के लिए धन्यवाद। हम प्रणाली को बेहतर बनाएंगे।",
    },
    footer: {
      tagline: "AI-संचालित प्रारंभिक पहचान से किसानों की रक्षा",
      contact: "संपर्क: support@cropdetect.ai | +91 1800-XXX-XXXX",
      copyright: `© ${new Date().getFullYear()} स्मार्ट फसल रोग पहचान प्रणाली`,
    },
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
