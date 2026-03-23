import CropHealthSection from "./components/CropHealthSection";
import DeviceStatusSection from "./components/DeviceStatusSection";
import DiseaseDetectionSection from "./components/DiseaseDetectionSection";
import DiseaseLibrarySection from "./components/DiseaseLibrarySection";
import FarmerGuidanceSection from "./components/FarmerGuidanceSection";
import FeedbackChatbox from "./components/FeedbackChatbox";
import FieldCoverageSection from "./components/FieldCoverageSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HomeSection />
          <DiseaseDetectionSection />
          <CropHealthSection />
          <FieldCoverageSection />
          <DeviceStatusSection />
          <DiseaseLibrarySection />
          <FarmerGuidanceSection />
        </main>
        <Footer />
        <FeedbackChatbox />
      </div>
    </LanguageProvider>
  );
}
