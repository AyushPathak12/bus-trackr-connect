
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Bus,
  QrCode,
  MapPin,
  Bell,
  Clock,
  HelpCircle,
  MoonStar,
  Sun,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Footer from "@/components/Footer";

const Help = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my bus?",
      answer:
        "After logging in, go to the Student Dashboard and select the 'Track Bus' tab. You'll see a map showing your bus location and an estimated time of arrival. The information updates every 30 seconds automatically.",
      icon: <MapPin className="h-5 w-5 text-bustrackr-blue" />,
    },
    {
      question: "What if my QR code doesn't scan?",
      answer:
        "If your QR code doesn't scan, try adjusting the lighting conditions or cleaning your camera lens. If the problem persists, you can manually mark your attendance by contacting your bus conductor or faculty administrator.",
      icon: <QrCode className="h-5 w-5 text-bustrackr-blue" />,
    },
    {
      question: "How do I receive notifications?",
      answer:
        "You can toggle notifications on/off using the bell icon in the top navigation bar. When enabled, you'll receive notifications when your bus is 3 minutes away and for other important updates.",
      icon: <Bell className="h-5 w-5 text-bustrackr-blue" />,
    },
    {
      question: "Why is my ETA not updating?",
      answer:
        "The ETA updates every 30 seconds. If it's not updating, check your internet connection. If the problem persists, try refreshing the page or logging out and logging back in.",
      icon: <Clock className="h-5 w-5 text-bustrackr-blue" />,
    },
    {
      question: "How do I view my attendance history?",
      answer:
        "Go to the Student Dashboard and select the 'Attendance' tab. You'll see a table showing your attendance history for the past 30 days with present days marked in green and absent days in red.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-bustrackr-blue"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      ),
    },
    {
      question: "What if I'm assigned to the wrong bus?",
      answer:
        "If you believe you're assigned to the wrong bus, please contact your faculty administrator or use the 'Contact' tab in the Student Dashboard to send a message to support.",
      icon: <Bus className="h-5 w-5 text-bustrackr-blue" />,
    },
    {
      question: "Can I use BusTrackr on my mobile device?",
      answer:
        "Yes, BusTrackr is fully responsive and works on all mobile devices with a browser. For the best experience, we recommend using the latest version of Chrome, Firefox, or Safari.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-bustrackr-blue"
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page. You'll receive instructions to reset your password via your registered email address.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-bustrackr-blue"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-6 w-6 text-bustrackr-blue" />
            <span className="text-xl font-semibold">BusTrackr</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <MoonStar className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg border px-3 py-1 text-sm font-medium hover:bg-muted"
            >
              Go Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-bustrackr-blue/10 p-4">
                <HelpCircle className="h-12 w-12 text-bustrackr-blue" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold">Help Center</h1>
            <p className="mb-12 text-xl text-muted-foreground">
              Find answers to commonly asked questions about using BusTrackr
            </p>

            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-background transition-all"
                  >
                    <button
                      className="flex w-full items-center justify-between p-4 text-left font-medium"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {faq.icon}
                        </div>
                        <span>{faq.question}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="border-t p-4 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Still have questions?
              </h2>
              <p className="mb-6 text-muted-foreground">
                If you can't find the answer you're looking for, please reach out
                to our support team.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="login-button bg-bustrackr-blue"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
