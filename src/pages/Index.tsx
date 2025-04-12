
import { useState } from "react";
import { Bus, User, UserCog, MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import StudentLoginModal from "@/components/StudentLoginModal";
import FacultyLoginModal from "@/components/FacultyLoginModal";
import Footer from "@/components/Footer";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);

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
            <a href="#about" className="nav-link px-3 py-2">
              About
            </a>
            <a href="#features" className="nav-link px-3 py-2">
              Features
            </a>
            <a href="#contact" className="nav-link px-3 py-2">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bustrackr-blue/20 to-bustrackr-green/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
        </div>
        <div className="container relative z-10 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
            <h1 className="animate-fade-in text-4xl font-bold md:text-5xl lg:text-6xl">
              Never Miss Your{" "}
              <span className="text-bustrackr-blue">Bus</span> Again!
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Track your school bus in real-time, check attendance, and stay
              connected with BusTrackr - the ultimate bus tracking platform for
              educational institutions.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-start">
              <button
                onClick={() => setStudentModalOpen(true)}
                className="login-button student-button"
              >
                <User size={20} />
                Student Login
              </button>
              <button
                onClick={() => setFacultyModalOpen(true)}
                className="login-button faculty-button"
              >
                <UserCog size={20} />
                Faculty Login
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 animate-bounce-soft md:h-80 md:w-80">
              <div className="absolute inset-0 rotate-6 rounded-3xl bg-bustrackr-green/20 shadow-xl" />
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-bustrackr-blue/20 shadow-xl" />
              <div className="absolute inset-0 rotate-0 rounded-3xl bg-card shadow-xl">
                <div className="flex h-full flex-col items-center justify-center p-6">
                  <Bus size={80} className="mb-4 text-bustrackr-blue" />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Bus #42</h3>
                    <p className="text-bustrackr-green">Arriving in 5 min</p>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-full w-3/4 animate-pulse-light rounded-full bg-bustrackr-blue" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose BusTrackr?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bus-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bustrackr-blue/10">
                <Bus className="h-6 w-6 text-bustrackr-blue" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your bus location in real-time and get accurate ETAs to
                never miss your ride.
              </p>
            </div>
            <div className="bus-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bustrackr-green/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-bustrackr-green"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">QR Attendance</h3>
              <p className="text-muted-foreground">
                Mark your attendance easily with a quick QR code scan when
                boarding the bus.
              </p>
            </div>
            <div className="bus-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bustrackr-lightblue/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-bustrackr-blue"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Comprehensive Reports
              </h3>
              <p className="text-muted-foreground">
                Access detailed attendance reports and analytics for students and
                faculty members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">About BusTrackr</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              BusTrackr is a comprehensive bus management system designed
              specifically for educational institutions. Our platform helps
              schools and colleges streamline their transportation logistics
              while providing students with real-time tracking and convenient
              attendance marking.
            </p>
            <p className="text-lg text-muted-foreground">
              With features tailored for both students and faculty, BusTrackr
              ensures safety, punctuality, and efficient management of your
              institution's transportation system.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-muted py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Contact Us</h2>
          <div className="mx-auto max-w-lg rounded-xl bg-card p-8 shadow-sm">
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border bg-background px-4 py-2"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border bg-background px-4 py-2"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-md border bg-background px-4 py-2"
                  placeholder="Your message"
                />
              </div>
              <button
                type="button"
                className="login-button w-full bg-bustrackr-blue"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modals */}
      <StudentLoginModal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
      />
      <FacultyLoginModal
        isOpen={facultyModalOpen}
        onClose={() => setFacultyModalOpen(false)}
      />
    </div>
  );
};

export default Index;
