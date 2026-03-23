import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { type Language, useLanguage } from "../contexts/LanguageContext";

export default function FeedbackChatbox() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [feedbackLang, setFeedbackLang] = useState<Language>("en");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const placeholders: Record<Language, string> = {
    en: "Tell us your problem or suggestion to improve this system",
    te: "ఈ వ్యవస్థను మెరుగుపరచడానికి మీ సమస్య లేదా సూచన చెప్పండి",
    hi: "इस प्रणाली को बेहतर बनाने के लिए अपनी समस्या या सुझाव बताएं",
  };

  const thankYous: Record<Language, string> = {
    en: "Thank you for your feedback. We will improve the system.",
    te: "మీ అభిప్రాయానికి ధన్యవాదాలు. మేము వ్యవస్థను మెరుగుపరుస్తాము.",
    hi: "आपकी प्रतिक्रिया के लिए धन्यवाद। हम प्रणाली को बेहतर बनाएंगे।",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
    setName("");
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          data-ocid="feedback.dialog"
          className="absolute bottom-16 right-0 w-80 md:w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
        >
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <span className="text-white font-bold text-base">
              💬 {t.feedback.title}
            </span>
            <button
              type="button"
              data-ocid="feedback.close_button"
              onClick={handleClose}
              className="text-white hover:text-green-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            {submitted ? (
              <div
                data-ocid="feedback.success_state"
                className="py-6 text-center"
              >
                <div className="text-4xl mb-3">✅</div>
                <p className="text-foreground font-semibold text-base leading-relaxed">
                  {thankYous[feedbackLang]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.feedback.namePlaceholder}
                  data-ocid="feedback.input"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={feedbackLang}
                  onChange={(e) => setFeedbackLang(e.target.value as Language)}
                  data-ocid="feedback.select"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={placeholders[feedbackLang]}
                  rows={4}
                  required
                  data-ocid="feedback.textarea"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  type="submit"
                  data-ocid="feedback.submit_button"
                  className="w-full bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white font-bold py-3 rounded-xl transition-colors text-base"
                >
                  {t.feedback.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        data-ocid="feedback.open_modal_button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-primary hover:bg-[oklch(0.45_0.17_145)] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Open feedback"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
