
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bus,
  Users,
  FileText,
  LogOut,
  MoonStar,
  Sun,
  Search,
  Download,
  Clock,
  Phone,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BusMap from "@/components/BusMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

// Mock data for students
const generateStudentData = () => {
  const names = [
    "Emma Johnson",
    "Liam Smith",
    "Olivia Williams",
    "Noah Brown",
    "Ava Jones",
    "Sophia Garcia",
    "Jackson Miller",
    "Isabella Davis",
    "Lucas Rodriguez",
    "Mia Martinez",
    "Aiden Anderson",
    "Harper Thomas",
    "Ethan Taylor",
    "Amelia Moore",
    "Mason Jackson",
  ];

  return names.map((name, index) => {
    const busNumber = ["B42", "B17", "B23", "B08"][index % 4];
    const route = [
      "North Campus",
      "South Campus",
      "East Campus",
      "West Campus",
    ][index % 4];
    const attendanceStatus = Math.random() > 0.2 ? "Present" : "Absent";

    return {
      id: (1000 + index).toString(),
      name,
      enrollmentNumber: (20230000 + index * 97).toString(),
      busNumber,
      route,
      phone: `+1 (555) ${100 + index * 41}-${1000 + index * 23}`.substring(0, 16),
      attendance: attendanceStatus,
    };
  });
};

// Mock data for buses
const generateBusData = () => {
  return [
    {
      id: "B42",
      route: "North Campus",
      driver: "John Smith",
      conductor: "Michael Brown",
      phone: "+1 (555) 987-6543",
      status: "On Time",
      studentsCount: 38,
      location: { lat: 34.052, lng: -118.243 },
    },
    {
      id: "B17",
      route: "South Campus",
      driver: "Robert Johnson",
      conductor: "David Wilson",
      phone: "+1 (555) 456-7890",
      status: "Delayed",
      studentsCount: 42,
      location: { lat: 34.049, lng: -118.245 },
    },
    {
      id: "B23",
      route: "East Campus",
      driver: "James Davis",
      conductor: "Thomas Anderson",
      phone: "+1 (555) 123-4567",
      status: "On Time",
      studentsCount: 35,
      location: { lat: 34.055, lng: -118.240 },
    },
    {
      id: "B08",
      route: "West Campus",
      driver: "William Taylor",
      conductor: "Christopher Lee",
      phone: "+1 (555) 789-0123",
      status: "On Time",
      studentsCount: 40,
      location: { lat: 34.050, lng: -118.248 },
    },
  ];
};

const students = generateStudentData();
const buses = generateBusData();

const FacultyDashboard = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Student attendance report has been downloaded.",
    });
  };

  // Filter students based on search query and selected bus
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollmentNumber.includes(searchQuery) ||
      student.busNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBus = selectedBus
      ? student.busNumber === selectedBus
      : true;

    return matchesSearch && matchesBus;
  });

  // Calculate stats
  const presentStudents = students.filter(
    (student) => student.attendance === "Present"
  ).length;
  const absentStudents = students.length - presentStudents;
  const activeBuses = buses.length;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-6 w-6 text-bustrackr-green" />
            <span className="text-xl font-semibold">BusTrackr Faculty</span>
          </div>
          <div className="hidden space-x-1 md:flex">
            <button
              onClick={() => setActiveView("students")}
              className={`nav-link px-3 py-2 ${
                activeView === "students" ? "active" : ""
              }`}
            >
              <Users className="mr-1 inline-block h-4 w-4" />
              Students
            </button>
            <button
              onClick={() => setActiveView("buses")}
              className={`nav-link px-3 py-2 ${
                activeView === "buses" ? "active" : ""
              }`}
            >
              <Bus className="mr-1 inline-block h-4 w-4" />
              Buses
            </button>
            <button
              onClick={() => setActiveView("reports")}
              className={`nav-link px-3 py-2 ${
                activeView === "reports" ? "active" : ""
              }`}
            >
              <FileText className="mr-1 inline-block h-4 w-4" />
              Reports
            </button>
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
          <div className="grid grid-cols-3 divide-x">
            <button
              onClick={() => setActiveView("students")}
              className={`flex flex-col items-center p-2 ${
                activeView === "students" ? "text-bustrackr-green" : "text-muted-foreground"
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Students</span>
            </button>
            <button
              onClick={() => setActiveView("buses")}
              className={`flex flex-col items-center p-2 ${
                activeView === "buses" ? "text-bustrackr-green" : "text-muted-foreground"
              }`}
            >
              <Bus className="h-5 w-5" />
              <span className="text-xs">Buses</span>
            </button>
            <button
              onClick={() => setActiveView("reports")}
              className={`flex flex-col items-center p-2 ${
                activeView === "reports" ? "text-bustrackr-green" : "text-muted-foreground"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Reports</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {activeView === "students" && "Students Management"}
              {activeView === "buses" && "Bus Overview"}
              {activeView === "reports" && "Reports"}
            </h1>
            <p className="text-muted-foreground">
              {activeView === "students" && "View and manage student information"}
              {activeView === "buses" && "Track all buses in real-time"}
              {activeView === "reports" && "Generate and download reports"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="bus-card flex items-center space-x-4">
              <div className="rounded-full bg-bustrackr-blue/10 p-3">
                <Users className="h-6 w-6 text-bustrackr-blue" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Total Students
                </h3>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
            <div className="bus-card flex items-center space-x-4">
              <div className="rounded-full bg-bustrackr-green/10 p-3">
                <Bus className="h-6 w-6 text-bustrackr-green" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Buses Active
                </h3>
                <p className="text-2xl font-bold">{activeBuses}</p>
              </div>
            </div>
            <div className="bus-card flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Present Today
                </h3>
                <p className="text-2xl font-bold">{presentStudents}</p>
              </div>
            </div>
            <div className="bus-card flex items-center space-x-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Absent Today
                </h3>
                <p className="text-2xl font-bold">{absentStudents}</p>
              </div>
            </div>
          </div>

          {/* Students View */}
          {activeView === "students" && (
            <>
              <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or bus..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Filter by Bus:</label>
                    <select
                      className="rounded-md border bg-background px-2 py-1"
                      value={selectedBus || ""}
                      onChange={(e) => setSelectedBus(e.target.value || null)}
                    >
                      <option value="">All Buses</option>
                      {buses.map((bus) => (
                        <option key={bus.id} value={bus.id}>
                          {bus.id} - {bus.route}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={handleDownloadReport}
                    className="bg-bustrackr-green hover:bg-green-600"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>

              <div className="bus-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Enrollment #</th>
                        <th className="px-4 py-3 text-left">Bus #</th>
                        <th className="px-4 py-3 text-left">Route</th>
                        <th className="px-4 py-3 text-left">Phone</th>
                        <th className="px-4 py-3 text-left">Today's Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <tr key={student.id} className="border-b">
                            <td className="px-4 py-3">{student.name}</td>
                            <td className="px-4 py-3">{student.enrollmentNumber}</td>
                            <td className="px-4 py-3">{student.busNumber}</td>
                            <td className="px-4 py-3">{student.route}</td>
                            <td className="px-4 py-3">
                              <a
                                href={`tel:${student.phone}`}
                                className="flex items-center text-bustrackr-blue hover:underline"
                              >
                                <Phone className="mr-1 h-4 w-4" />
                                {student.phone}
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  student.attendance === "Present"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }`}
                              >
                                {student.attendance}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-8 text-center text-muted-foreground"
                          >
                            No students found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Buses View */}
          {activeView === "buses" && (
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="mb-6 justify-start">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="bus-card h-[calc(100vh-300px)] min-h-[400px]">
                      <BusMap />
                    </div>
                  </div>
                  <div>
                    <div className="bus-card">
                      <h3 className="mb-4 text-xl font-semibold">Bus Status</h3>
                      <div className="space-y-4">
                        {buses.map((bus) => (
                          <div
                            key={bus.id}
                            className={`rounded-lg border p-3 transition-all hover:bg-muted/50 ${
                              bus.status === "Delayed"
                                ? "border-orange-300 dark:border-orange-800"
                                : "border-green-300 dark:border-green-800"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Bus className="h-5 w-5 text-bustrackr-blue" />
                                <span className="font-medium">
                                  {bus.id} - {bus.route}
                                </span>
                              </div>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  bus.status === "Delayed"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                }`}
                              >
                                {bus.status}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <span>{bus.studentsCount} Students</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="mr-2 h-4 w-4" />
                                <a
                                  href={`tel:${bus.phone}`}
                                  className="text-bustrackr-blue hover:underline"
                                >
                                  {bus.conductor}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="list" className="mt-0">
                <div className="bus-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left">Bus #</th>
                          <th className="px-4 py-3 text-left">Route</th>
                          <th className="px-4 py-3 text-left">Driver</th>
                          <th className="px-4 py-3 text-left">Conductor</th>
                          <th className="px-4 py-3 text-left">Phone</th>
                          <th className="px-4 py-3 text-left">Students</th>
                          <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buses.map((bus) => (
                          <tr key={bus.id} className="border-b">
                            <td className="px-4 py-3">{bus.id}</td>
                            <td className="px-4 py-3">{bus.route}</td>
                            <td className="px-4 py-3">{bus.driver}</td>
                            <td className="px-4 py-3">{bus.conductor}</td>
                            <td className="px-4 py-3">
                              <a
                                href={`tel:${bus.phone}`}
                                className="flex items-center text-bustrackr-blue hover:underline"
                              >
                                <Phone className="mr-1 h-4 w-4" />
                                {bus.phone}
                              </a>
                            </td>
                            <td className="px-4 py-3">{bus.studentsCount}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  bus.status === "Delayed"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                }`}
                              >
                                {bus.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Reports View */}
          {activeView === "reports" && (
            <div className="bus-card">
              <h3 className="mb-4 text-xl font-semibold">Generate Reports</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-medium">Report Type</label>
                    <select className="w-full rounded-md border bg-background px-4 py-2">
                      <option>Daily Attendance Report</option>
                      <option>Weekly Attendance Summary</option>
                      <option>Monthly Attendance Analysis</option>
                      <option>Bus Usage Statistics</option>
                      <option>Student Transportation Data</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Bus Filter</label>
                    <select className="w-full rounded-md border bg-background px-4 py-2">
                      <option>All Buses</option>
                      {buses.map((bus) => (
                        <option key={bus.id}>
                          {bus.id} - {bus.route}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Format</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="format"
                          className="mr-2"
                          defaultChecked
                        />
                        <span>CSV</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" className="mr-2" />
                        <span>PDF</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" className="mr-2" />
                        <span>Excel</span>
                      </label>
                    </div>
                  </div>
                  <Button
                    className="bg-bustrackr-green hover:bg-green-600"
                    onClick={handleDownloadReport}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
                <div className="rounded-xl border bg-muted p-4">
                  <h4 className="mb-2 text-lg font-medium">Recent Reports</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Attendance Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on April 11, 2023
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Summary Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on April 8, 2023
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bus Usage Statistics</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on April 5, 2023
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Monthly Attendance Analysis</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on March 31, 2023
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FacultyDashboard;
