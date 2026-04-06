import { type ReactNode, createContext, useContext, useState } from "react";

export type Language = "en" | "te" | "hi";

type DiseaseEntry = {
  plant: string;
  disease: string;
  description: string;
  treatment: string;
  symptoms: string;
  prevention: string;
};

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
    viewDetections: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  detection: {
    sectionTitle: string;
    subtitle: string;
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
    affectedArea: string;
    diseaseName: string;
    treatment: string;
    plantName: string;
    confidence: string;
  };
  cropHealth: {
    sectionTitle: string;
    subtitle: string;
    healthDistribution: string;
    fieldStatistics: string;
    lastUpdated: string;
    totalAnalyzed: string;
    healthy: string;
    infected: string;
    cropsCount: string;
  };
  fieldCoverage: {
    sectionTitle: string;
    subtitle: string;
    coverage: string;
    totalArea: string;
    scanned: string;
    remaining: string;
    ofTotalScanned: string;
    activeZone: string;
    currentlyScanning: string;
    remainingToScan: string;
  };
  deviceStatus: {
    sectionTitle: string;
    subtitle: string;
    battery: string;
    status: string;
    lastScan: string;
    mode: string;
    simBanner: string;
    statusScanning: string;
  };
  diseaseLibrary: {
    sectionTitle: string;
    subtitle: string;
    symptoms: string;
    prevention: string;
    treatment: string;
  };
  farmerGuidance: {
    sectionTitle: string;
    subtitle: string;
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
    quickLinks: string;
    contactUs: string;
    contact: string;
    copyright: string;
  };
  diseases: {
    tomato: DiseaseEntry;
    wheat: DiseaseEntry;
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
      heading: "Protect Your Crops Before It's Too Late",
      subheading:
        "Our smart device uses a high-resolution camera and sensors to scan your field and detect crop diseases early — so you can act fast and save your harvest.",
      viewDetections: "View Detections",
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
      sectionTitle: "Disease Detections",
      subtitle:
        "Recent disease alerts found in your field by the smart device.",
      viewAnalysis: "View AI Leaf Analysis",
      hideAnalysis: "Hide Analysis",
      vizTitle: "AI-Based Leaf Health Visualization",
      originalImg: "Original Leaf",
      processedImg: "Multispectral Analysis",
      legendDiseased: "Diseased / Stressed Regions",
      legendHealthy: "Healthy Regions",
      healthyLabel: "Healthy",
      diseasedLabel: "Diseased",
      vizNote: "🤖 This is AI-based analysis for early disease detection",
      demoTitle: "Diseases Detected",
      affectedArea: "Affected Area",
      diseaseName: "Disease",
      treatment: "Recommended Treatment",
      plantName: "Plant",
      confidence: "Confidence",
    },
    cropHealth: {
      sectionTitle: "Crop Health Overview",
      subtitle: "Live summary of your field's health status.",
      healthDistribution: "Health Distribution",
      fieldStatistics: "Field Statistics",
      lastUpdated: "Last Updated",
      totalAnalyzed: "Total Crops Monitored",
      healthy: "Healthy Crops",
      infected: "Infected Crops",
      cropsCount: "5 crops",
    },
    fieldCoverage: {
      sectionTitle: "Field Coverage",
      subtitle: "How much of your field has been scanned by the device.",
      coverage: "Field Coverage",
      totalArea: "Total Area",
      scanned: "Scanned",
      remaining: "Remaining",
      ofTotalScanned: "of total field scanned",
      activeZone: "Active Zone",
      currentlyScanning: "Currently scanning",
      remainingToScan: "Remaining to scan",
    },
    deviceStatus: {
      sectionTitle: "Device Status",
      subtitle: "Real-time information about your scanning device.",
      battery: "Battery",
      status: "Status",
      lastScan: "Last Scan",
      mode: "Field Covered",
      simBanner: "⚠️ Simulation Mode Active — No hardware connected",
      statusScanning: "Idle",
    },
    diseaseLibrary: {
      sectionTitle: "Disease Library",
      subtitle:
        "Common crop diseases — learn symptoms, prevention, and treatment.",
      symptoms: "Symptoms",
      prevention: "Prevention",
      treatment: "Treatment",
    },
    farmerGuidance: {
      sectionTitle: "Farmer Guidance",
      subtitle: "Simple, clear steps to protect your crops.",
      detected: "🚨 Disease Detected? Do This:",
      detectedSteps: [
        "Check the app for the disease name and severity.",
        "Isolate affected plants from healthy ones immediately.",
        "Contact your local agriculture officer for guidance.",
        "Follow the treatment recommendation shown in the app.",
        "Monitor affected area daily for changes.",
      ],
      pesticide: "💊 How to Apply Pesticide:",
      pesticideSteps: [
        "Wear protective gloves and a mask before mixing.",
        "Mix the correct pesticide amount with water as labeled.",
        "Spray in the early morning or late evening.",
        "Cover all leaves, especially the undersides.",
        "Wash hands and equipment thoroughly after use.",
      ],
      prevention: "🛡️ Prevent Disease Spread:",
      preventionTips: [
        "Remove and burn infected leaves and plants.",
        "Keep field clean — remove weeds regularly.",
        "Ensure proper water drainage to avoid root rot.",
        "Rotate crops each season to break disease cycles.",
        "Use disease-resistant seed varieties when possible.",
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
      tagline: "AI-powered early disease detection for better harvests.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      contact:
        "📞 +91 98765 43210 | ✉️ help@smartcrop.ag | 📍 Hyderabad, Telangana, India",
      copyright: `© ${new Date().getFullYear()}. Built with love using caffeine.ai`,
    },
    diseases: {
      tomato: {
        plant: "Tomato",
        disease: "Leaf Spot",
        description: "Circular brown spots on leaves.",
        treatment: "Fungicide spray",
        symptoms: "Circular brown spots on leaves.",
        prevention: "Rotate crops; avoid overhead watering.",
      },
      wheat: {
        plant: "Wheat",
        disease: "Stem Rust",
        description:
          "Orange-brown pustules on stems and leaves, powdery spores.",
        treatment:
          "Apply Propiconazole or Tebuconazole fungicide at first sign",
        symptoms: "Orange-brown pustules on stems and leaves, powdery spores.",
        prevention: "Plant rust-resistant varieties, monitor early in season.",
      },
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
      heading: "మీ పంటలను సమయానికి రక్షించండి",
      subheading:
        "మా స్మార్ట్ పరికరం హై-రెజల్యూషన్ కెమెరా మరియు సెన్సర్లను ఉపయోగించి మీ పొలాన్ని స్కాన్ చేసి పంట వ్యాధులను ముందస్తుగా గుర్తిస్తుంది.",
      viewDetections: "వ్యాధులు చూడండి",
      feature1Title: "ముందస్తు నిర్ధారణ",
      feature1Desc: "వ్యాధులు వ్యాపించే ముందే గుర్తించండి.",
      feature2Title: "తక్కువ ఖర్చు",
      feature2Desc: "ప్రతి రైతుకు అందుబాటులో ఉండే AI విశ్లేషణ.",
      feature3Title: "రైతుకు అనుకూలం",
      feature3Desc: "పొలంలో సులభంగా వాడగలిగే సరళమైన ఇంటర్ఫేస్.",
    },
    detection: {
      sectionTitle: "వ్యాధి నిర్ధారణలు",
      subtitle: "స్మార్ట్ పరికరం ద్వారా మీ పొలంలో కనుగొన్న వ్యాధి హెచ్చరికలు.",
      viewAnalysis: "AI ఆకు విశ్లేషణ చూడండి",
      hideAnalysis: "విశ్లేషణ దాచండి",
      vizTitle: "AI ఆధారిత ఆకు ఆరోగ్య దృశ్యీకరణ",
      originalImg: "అసలు ఆకు",
      processedImg: "మల్టీస్పెక్ట్రల్ విశ్లేషణ",
      legendDiseased: "రోగగ్రస్త / ఒత్తిడి ప్రాంతాలు",
      legendHealthy: "ఆరోగ్యకరమైన ప్రాంతాలు",
      healthyLabel: "ఆరోగ్యకరమైన",
      diseasedLabel: "రోగగ్రస్త",
      vizNote: "🤖 ఇది ముందస్తు వ్యాధి నిర్ధారణ కోసం AI ఆధారిత విశ్లేషణ",
      demoTitle: "గుర్తించిన వ్యాధులు",
      affectedArea: "ప్రభావిత ప్రాంతం",
      diseaseName: "వ్యాధి",
      treatment: "సిఫార్సు చికిత్స",
      plantName: "మొక్క",
      confidence: "నమ్మకం",
    },
    cropHealth: {
      sectionTitle: "పంట ఆరోగ్య అవలోకనం",
      subtitle: "మీ పొలం యొక్క ఆరోగ్య స్థితి యొక్క లైవ్ సారాంశం.",
      healthDistribution: "ఆరోగ్య పంపిణీ",
      fieldStatistics: "పొలం గణాంకాలు",
      lastUpdated: "చివరగా నవీకరించబడింది",
      totalAnalyzed: "మొత్తం పర్యవేక్షించిన పంటలు",
      healthy: "ఆరోగ్యకరమైన పంటలు",
      infected: "సోకిన పంటలు",
      cropsCount: "5 పంటలు",
    },
    fieldCoverage: {
      sectionTitle: "పొలం కవరేజ్",
      subtitle: "పరికరం ద్వారా మీ పొలం ఎంత స్కాన్ చేయబడింది.",
      coverage: "పొలం కవరేజ్",
      totalArea: "మొత్తం విస్తీర్ణం",
      scanned: "స్కాన్ చేయబడింది",
      remaining: "మిగిలింది",
      ofTotalScanned: "మొత్తం పొలంలో స్కాన్ చేయబడింది",
      activeZone: "క్రియాశీల మండలం",
      currentlyScanning: "ప్రస్తుతం స్కాన్ అవుతోంది",
      remainingToScan: "స్కాన్ చేయడానికి మిగిలింది",
    },
    deviceStatus: {
      sectionTitle: "పరికర స్థితి",
      subtitle: "మీ స్కానింగ్ పరికరం గురించి రియల్-టైమ్ సమాచారం.",
      battery: "బ్యాటరీ",
      status: "స్థితి",
      lastScan: "చివరి స్కాన్",
      mode: "పొలం కవర్",
      simBanner: "⚠️ సిమ్యులేషన్ మోడ్ సక్రియంగా ఉంది",
      statusScanning: "నిష్క్రియ",
    },
    diseaseLibrary: {
      sectionTitle: "వ్యాధుల లైబ్రరీ",
      subtitle: "సాధారణ పంట వ్యాధులు — లక్షణాలు, నివారణ మరియు చికిత్స తెలుసుకోండి.",
      symptoms: "లక్షణాలు",
      prevention: "నివారణ",
      treatment: "చికిత్స",
    },
    farmerGuidance: {
      sectionTitle: "రైతు మార్గదర్శకత",
      subtitle: "మీ పంటలను రక్షించడానికి సరళమైన, స్పష్టమైన దశలు.",
      detected: "🚨 వ్యాధి కనుగొనబడిందా? ఇలా చేయండి:",
      detectedSteps: [
        "అప్‌లో వ్యాధి పేరు మరియు తీవ్రత చూడండి.",
        "వెంటనే ఆరోగ్యకరమైన వాటి నుండి సోకిన మొక్కలను వేరు చేయండి.",
        "స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
        "అప్‌లో చూపించిన చికిత్సను అనుసరించండి.",
        "ప్రభావిత ప్రాంతాన్ని రోజూ పర్యవేక్షించండి.",
      ],
      pesticide: "💊 పురుగుమందు ఎలా వాడాలి:",
      pesticideSteps: [
        "కలపడానికి ముందు రక్షణ చేతి తొడుగులు మరియు మాస్క్ ధరించండి.",
        "లేబుల్‌లో చూపిన సరైన మోతాదు నీటితో కలపండి.",
        "ఉదయం పెందరాళే లేదా సాయంత్రం స్ప్రే చేయండి.",
        "అన్ని ఆకులు, ముఖ్యంగా అడుగు భాగం కప్పండి.",
        "వాడిన తర్వాత చేతులు మరియు పరికరాలు బాగా కడుక్కోండి.",
      ],
      prevention: "🛡️ వ్యాధి వ్యాపించకుండా నివారించండి:",
      preventionTips: [
        "సోకిన ఆకులు మరియు మొక్కలు తొలగించి కాల్చండి.",
        "పొలాన్ని శుభ్రంగా ఉంచండి — కలుపు తీయండి.",
        "మూల కుళ్ళు నివారించడానికి సరైన నీటి వ్యవస్థ ఉండాలి.",
        "వ్యాధి చక్రాలు తెంచడానికి ప్రతి సీజన్ పంటలు మార్చండి.",
        "సాధ్యమైతే వ్యాధి-నిరోధక విత్తన రకాలు వాడండి.",
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
      quickLinks: "త్వరిత లింకులు",
      contactUs: "మమ్మల్ని సంప్రదించండి",
      contact:
        "📞 +91 98765 43210 | ✉️ help@smartcrop.ag | 📍 హైదరాబాద్, తెలంగాణ, భారతదేశం",
      copyright: `© ${new Date().getFullYear()}. caffeine.ai తో నిర్మించబడింది`,
    },
    diseases: {
      tomato: {
        plant: "టమాటా",
        disease: "ఆకు మచ్చ వ్యాధి",
        description: "ఆకులపై గుండ్రని గోధుమ రంగు మచ్చలు.",
        treatment: "శిలీంద్రనాశని స్ప్రే చేయండి",
        symptoms: "ఆకులపై గుండ్రని గోధుమ రంగు మచ్చలు.",
        prevention: "పంటలు మార్చండి; తలపై నీళ్లు పడకుండా చూడండి.",
      },
      wheat: {
        plant: "గోధుమ",
        disease: "కాండం తుప్పు వ్యాధి",
        description: "కాండాలు మరియు ఆకులపై నారింజ-గోధుమ పస్టుల్స్, పొడి బీజాలు.",
        treatment: "మొదటి సంకేతం వద్దే ప్రొపికొనజోల్ లేదా టెబుకొనజోల్ శిలీంద్రనాశని వాడండి",
        symptoms: "కాండాలు మరియు ఆకులపై నారింజ-గోధుమ పస్టుల్స్, పొడి బీజాలు.",
        prevention: "తుప్పు-నిరోధక రకాలు నాటండి, సీజన్ మొదట్లో పర్యవేక్షించండి.",
      },
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
      heading: "अपनी फसलें समय पर बचाएं",
      subheading:
        "हमारा स्मार्ट डिवाइस हाई-रेजोल्यूशन कैमरा और सेंसर से खेत स्कैन करके फसल रोग जल्दी पहचानता है।",
      viewDetections: "रोग देखें",
      feature1Title: "प्रारंभिक पहचान",
      feature1Desc: "रोग फैलने से पहले उसे पहचानें।",
      feature2Title: "कम लागत",
      feature2Desc: "हर किसान के लिए सुलभ AI विश्लेषण।",
      feature3Title: "किसान-अनुकूल",
      feature3Desc: "खेत में आसानी से उपयोग के लिए सरल इंटरफेस।",
    },
    detection: {
      sectionTitle: "रोग पहचानें",
      subtitle: "स्मार्ट डिवाइस द्वारा आपके खेत में पाए गए रोग अलर्ट।",
      viewAnalysis: "AI पत्ती विश्लेषण देखें",
      hideAnalysis: "विश्लेषण छुपाएं",
      vizTitle: "AI-आधारित पत्ती स्वास्थ्य विज़ुअलाइज़ेशन",
      originalImg: "मूल पत्ती",
      processedImg: "मल्टीस्पेक्ट्रल विश्लेषण",
      legendDiseased: "रोगग्रस्त / तनावग्रस्त क्षेत्र",
      legendHealthy: "स्वस्थ क्षेत्र",
      healthyLabel: "स्वस्थ",
      diseasedLabel: "रोगग्रस्त",
      vizNote: "🤖 यह प्रारंभिक रोग पहचान के लिए AI-आधारित विश्लेषण है",
      demoTitle: "पहचाने गए रोग",
      affectedArea: "प्रभावित क्षेत्र",
      diseaseName: "रोग",
      treatment: "अनुशंसित उपचार",
      plantName: "पौधा",
      confidence: "विश्वास",
    },
    cropHealth: {
      sectionTitle: "फसल स्वास्थ्य अवलोकन",
      subtitle: "आपके खेत की स्वास्थ्य स्थिति का लाइव सारांश।",
      healthDistribution: "स्वास्थ्य वितरण",
      fieldStatistics: "खेत के आँकड़े",
      lastUpdated: "अंतिम अपडेट",
      totalAnalyzed: "कुल निगरानी फसलें",
      healthy: "स्वस्थ फसलें",
      infected: "संक्रमित फसलें",
      cropsCount: "5 फसलें",
    },
    fieldCoverage: {
      sectionTitle: "खेत कवरेज",
      subtitle: "डिवाइस द्वारा आपका खेत कितना स्कैन किया गया है।",
      coverage: "खेत कवरेज",
      totalArea: "कुल क्षेत्रफल",
      scanned: "स्कैन किया",
      remaining: "शेष",
      ofTotalScanned: "कुल खेत स्कैन किया गया",
      activeZone: "सक्रिय क्षेत्र",
      currentlyScanning: "अभी स्कैन हो रहा है",
      remainingToScan: "स्कैन करना बाकी है",
    },
    deviceStatus: {
      sectionTitle: "डिवाइस स्थिति",
      subtitle: "आपके स्कैनिंग डिवाइस के बारे में रियल-टाइम जानकारी।",
      battery: "बैटरी",
      status: "स्थिति",
      lastScan: "अंतिम स्कैन",
      mode: "खेत कवर",
      simBanner: "⚠️ सिमुलेशन मोड सक्रिय",
      statusScanning: "निष्क्रिय",
    },
    diseaseLibrary: {
      sectionTitle: "रोग पुस्तकालय",
      subtitle: "सामान्य फसल रोग — लक्षण, रोकथाम और उपचार जानें।",
      symptoms: "लक्षण",
      prevention: "रोकथाम",
      treatment: "उपचार",
    },
    farmerGuidance: {
      sectionTitle: "किसान मार्गदर्शन",
      subtitle: "अपनी फसलों की रक्षा के लिए सरल, स्पष्ट कदम।",
      detected: "🚨 रोग पाया? यह करें:",
      detectedSteps: [
        "ऐप में रोग का नाम और गंभीरता जांचें।",
        "तुरंत संक्रमित पौधों को स्वस्थ पौधों से अलग करें।",
        "स्थानीय कृषि अधिकारी से संपर्क करें।",
        "ऐप में दिखाए गए उपचार का पालन करें।",
        "प्रभावित क्षेत्र की रोज निगरानी करें।",
      ],
      pesticide: "💊 कीटनाशक कैसे लगाएं:",
      pesticideSteps: [
        "मिलाने से पहले सुरक्षात्मक दस्ताने और मास्क पहनें।",
        "लेबल के अनुसार सही मात्रा पानी में मिलाएं।",
        "सुबह जल्दी या शाम को स्प्रे करें।",
        "सभी पत्तियां, विशेषकर नीचे की तरफ ढकें।",
        "उपयोग के बाद हाथ और उपकरण अच्छी तरह धोएं।",
      ],
      prevention: "🛡️ रोग फैलने से रोकें:",
      preventionTips: [
        "संक्रमित पत्तियां और पौधे हटाकर जला दें।",
        "खेत साफ रखें — नियमित रूप से खरपतवार हटाएं।",
        "जड़ सड़न से बचने के लिए उचित जल निकासी सुनिश्चित करें।",
        "रोग चक्र तोड़ने के लिए हर मौसम फसल बदलें।",
        "जब संभव हो तो रोग-प्रतिरोधी बीज किस्में उपयोग करें।",
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
      quickLinks: "त्वरित लिंक",
      contactUs: "हमसे संपर्क करें",
      contact:
        "📞 +91 98765 43210 | ✉️ help@smartcrop.ag | 📍 हैदराबाद, तेलंगाना, भारत",
      copyright: `© ${new Date().getFullYear()}. caffeine.ai के साथ बनाया गया`,
    },
    diseases: {
      tomato: {
        plant: "टमाटर",
        disease: "पत्ती धब्बा रोग",
        description: "पत्तियों पर गोल भूरे धब्बे।",
        treatment: "फफूंदनाशक का छिड़काव करें",
        symptoms: "पत्तियों पर गोल भूरे धब्बे।",
        prevention: "फसल बदलें; पत्तियों पर पानी न पड़ने दें।",
      },
      wheat: {
        plant: "गेहूं",
        disease: "तना रतुआ रोग",
        description: "तनों और पत्तियों पर नारंगी-भूरे फफोले, पाउडरी बीजाणु।",
        treatment: "पहले लक्षण पर प्रोपिकोनाज़ोल या टेबुकोनाज़ोल फफूंदनाशक लगाएं",
        symptoms: "तनों और पत्तियों पर नारंगी-भूरे फफोले, पाउडरी बीजाणु।",
        prevention: "रतुआ-रोधी किस्में लगाएं, मौसम की शुरुआत में निगरानी करें।",
      },
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
