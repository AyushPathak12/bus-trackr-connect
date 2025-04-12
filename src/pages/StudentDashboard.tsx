
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bus, 
  Map, 
  Bell, 
  Calendar, 
  Phone, 
  Info, 
  LogOut, 
  MoonStar, 
  Sun, 
  BellOff, 
  QrCode,
  Clock,
  CheckCircle
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import BusMap from "@/components/BusMap";
import Footer from "@/components/Footer";

// Mock data
const busData = {
  busNumber: "B42",
  routeName: "North Campus Express",
  driverName: "John Smith",
  conductorPhone: "+1 (555) 987-6543",
};

const generateAttendanceData = () => {
  const today = new Date();
  const data = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const status = Math.random() > 0.2 ? "present" : "absent";
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      status,
    });
  }
  return data;
};

const StudentDashboard = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("track");
  const [eta, setEta] = useState(300); // ETA in seconds
  const [notifications, setNotifications] = useState(true);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [scanningStatus, setScanningStatus] = useState("ready"); // ready, scanning, success
  const attendanceData = generateAttendanceData();

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 0) return 300;
        if (prev === 180 && notifications) {
          // 3 minutes notification
          new Audio("/notification.mp3").play().catch(() => {
            console.log("Notification sound blocked. Require user interaction.");
          });
          toast({
            title: "Bus Arriving Soon!",
            description: "Your bus will arrive in 3 minutes.",
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [notifications, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleQrScan = () => {
    setQrScannerOpen(true);
    setScanningStatus("ready");
  };

  const simulateScan = () => {
    setScanningStatus("scanning");
    
    // Simulate scanning
    setTimeout(() => {
      setScanningStatus("success");
      
      // Close after success message
      setTimeout(() => {
        setQrScannerOpen(false);
        toast({
          title: "Success!",
          description: `Attendance marked for ${new Date().toLocaleDateString()}`,
        });
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-6 w-6 text-bustrackr-blue" />
            <span className="text-xl font-semibold">BusTrackr</span>
          </div>
          <div className="hidden space-x-1 md:flex">
            <button
              onClick={() => setActiveTab("track")}
              className={`nav-link px-3 py-2 ${
                activeTab === "track" ? "active" : ""
              }`}
            >
              <Map className="mr-1 inline-block h-4 w-4" />
              Track Bus
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`nav-link px-3 py-2 ${
                activeTab === "attendance" ? "active" : ""
              }`}
            >
              <Calendar className="mr-1 inline-block h-4 w-4" />
              Attendance
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`nav-link px-3 py-2 ${
                activeTab === "info" ? "active" : ""
              }`}
            >
              <Info className="mr-1 inline-block h-4 w-4" />
              Bus Info
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`nav-link px-3 py-2 ${
                activeTab === "contact" ? "active" : ""
              }`}
            >
              <Phone className="mr-1 inline-block h-4 w-4" />
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setNotifications(!notifications)}
              className="rounded-full p-2 hover:bg-muted"
              aria-label="Toggle notifications"
            >
              {notifications ? (
                <Bell className="h-5 w-5 text-bustrackr-blue" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Mobile navigation */}
        <div className="border-t md:hidden">
          <div className="grid grid-cols-4 divide-x">
            <button
              onClick={() => setActiveTab("track")}
              className={`flex flex-col items-center p-2 ${
                activeTab === "track" ? "text-bustrackr-blue" : "text-muted-foreground"
              }`}
            >
              <Map className="h-5 w-5" />
              <span className="text-xs">Track</span>
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`flex flex-col items-center p-2 ${
                activeTab === "attendance" ? "text-bustrackr-blue" : "text-muted-foreground"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Attendance</span>
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex flex-col items-center p-2 ${
                activeTab === "info" ? "text-bustrackr-blue" : "text-muted-foreground"
              }`}
            >
              <Info className="h-5 w-5" />
              <span className="text-xs">Info</span>
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex flex-col items-center p-2 ${
                activeTab === "contact" ? "text-bustrackr-blue" : "text-muted-foreground"
              }`}
            >
              <Phone className="h-5 w-5" />
              <span className="text-xs">Contact</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {activeTab === "track" && "Track Your Bus"}
              {activeTab === "attendance" && "Your Attendance"}
              {activeTab === "info" && "Bus Information"}
              {activeTab === "contact" && "Contact Support"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "track" && "See where your bus is in real-time"}
              {activeTab === "attendance" && "View your attendance history"}
              {activeTab === "info" && "Details about your assigned bus"}
              {activeTab === "contact" && "Get in touch with support"}
            </p>
          </div>

          {/* Track Bus Tab */}
          {activeTab === "track" && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="bus-card h-[calc(100vh-300px)] min-h-[400px] overflow-hidden">
                  <BusMap />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bus-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Estimated Arrival</h3>
                    <Clock className="h-6 w-6 text-bustrackr-blue" />
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="stroke-muted"
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          strokeWidth="8"
                        />
                        <circle
                          className="stroke-bustrackr-blue animate-pulse-light"
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={283 * (1 - eta / 300)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{formatTime(eta)}</span>
                        <span className="text-sm text-muted-foreground">minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bus-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Bus Details</h3>
                    <Bus className="h-6 w-6 text-bustrackr-blue" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Bus Number</span>
                      <p className="font-medium">{busData.busNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Route</span>
                      <p className="font-medium">{busData.routeName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Driver</span>
                      <p className="font-medium">{busData.driverName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Conductor</span>
                      <p className="font-medium">
                        <a
                          href={`tel:${busData.conductorPhone}`}
                          className="flex items-center text-bustrackr-blue hover:underline"
                        >
                          <Phone className="mr-1 h-4 w-4" />
                          {busData.conductorPhone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleQrScan}
                  className="w-full bg-bustrackr-green hover:bg-green-600"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div className="bus-card overflow-hidden">
              <h3 className="mb-4 text-xl font-semibold">Attendance History</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Date</th>
                      <th className="py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((day, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{day.date}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              day.status === "present"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {day.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bus Info Tab */}
          {activeTab === "info" && (
            <div className="bus-card">
              <h3 className="mb-4 text-xl font-semibold">Bus Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-lg font-medium">Bus Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Bus Number</span>
                      <p className="font-medium">{busData.busNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Route</span>
                      <p className="font-medium">{busData.routeName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Driver</span>
                      <p className="font-medium">{busData.driverName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Conductor</span>
                      <p className="font-medium">
                        <a
                          href={`tel:${busData.conductorPhone}`}
                          className="flex items-center text-bustrackr-blue hover:underline"
                        >
                          <Phone className="mr-1 h-4 w-4" />
                          {busData.conductorPhone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-medium">Schedule</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Pickup Time (Morning)</span>
                      <p className="font-medium">7:30 AM</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Arrival Time (Morning)</span>
                      <p className="font-medium">8:15 AM</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Departure Time (Evening)</span>
                      <p className="font-medium">4:30 PM</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Drop-off Time (Evening)</span>
                      <p className="font-medium">5:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="bus-card">
              <h3 className="mb-4 text-xl font-semibold">Contact Support</h3>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-medium">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="w-full rounded-md border bg-background px-4 py-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-medium">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="w-full rounded-md border bg-background px-4 py-2"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="font-medium">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="w-full rounded-md border bg-background px-4 py-2"
                    placeholder="Subject of your message"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-medium">Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full rounded-md border bg-background px-4 py-2"
                    placeholder="Your message"
                  />
                </div>
                <Button className="bg-bustrackr-blue hover:bg-blue-600">
                  Send Message
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* QR Scanner Modal */}
      <Dialog open={qrScannerOpen} onOpenChange={setQrScannerOpen}>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            qrScannerOpen ? "visible" : "invisible"
          }`}
        >
          <div className="fixed inset-0 bg-black/50" onClick={() => setQrScannerOpen(false)} />
          <div className="fixed z-50 grid w-full max-w-md scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg animate-fade-in rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">QR Scanner</h2>
              {scanningStatus === "ready" && (
                <p className="mt-2 text-muted-foreground">
                  Scan the QR code on your bus to mark attendance
                </p>
              )}
              {scanningStatus === "scanning" && (
                <p className="mt-2 text-muted-foreground">
                  Scanning...
                </p>
              )}
              {scanningStatus === "success" && (
                <p className="mt-2 text-green-600 flex justify-center items-center">
                  <CheckCircle className="mr-1 h-5 w-5" />
                  Attendance marked successfully!
                </p>
              )}
            </div>

            <div className="mx-auto h-64 w-64 overflow-hidden rounded-md border-2 border-dashed border-muted-foreground bg-muted p-2">
              {scanningStatus === "ready" && (
                <div
                  className="flex h-full w-full cursor-pointer items-center justify-center bg-black/5"
                  onClick={simulateScan}
                >
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
              {scanningStatus === "scanning" && (
                <div className="flex h-full w-full items-center justify-center bg-black/10">
                  <div className="h-full w-full">
                    <div className="h-1 w-full animate-pulse bg-bustrackr-blue" />
                    <div className="flex h-[calc(100%-4px)] items-center justify-center">
                      <QrCode className="h-24 w-24 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                </div>
              )}
              {scanningStatus === "success" && (
                <div className="flex h-full w-full items-center justify-center bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-24 w-24 text-green-600" />
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setQrScannerOpen(false)}
              >
                Close
              </Button>
              {scanningStatus === "ready" && (
                <Button
                  className="bg-bustrackr-blue hover:bg-blue-600"
                  onClick={simulateScan}
                >
                  Scan Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
