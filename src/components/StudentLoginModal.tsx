
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentLoginModal = ({ isOpen, onClose }: StudentLoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busRoute, setBusRoute] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      if (isLogin) {
        // Validate login
        if (email && enrollmentNumber && password) {
          toast({
            title: "Login Successful",
            description: "Welcome back to BusTrackr!",
          });
          onClose();
          navigate("/student-dashboard");
        } else {
          toast({
            title: "Login Failed",
            description: "Please fill all required fields",
            variant: "destructive",
          });
        }
      } else {
        // Validate registration
        if (name && email && enrollmentNumber && phone && busRoute && password) {
          toast({
            title: "Registration Successful",
            description: "Your account has been created successfully!",
          });
          setIsLogin(true);
        } else {
          toast({
            title: "Registration Failed",
            description: "Please fill all required fields",
            variant: "destructive",
          });
        }
      }
    }, 1000);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form
    setEmail("");
    setEnrollmentNumber("");
    setName("");
    setPhone("");
    setBusRoute("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="fixed z-50 grid w-full max-w-lg scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg animate-fade-in rounded-lg sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {isLogin ? "Student Login" : "Student Registration"}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-muted"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollment">Enrollment Number (10 digits)</Label>
              <Input
                id="enrollment"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                placeholder="Enter your 10-digit enrollment number"
                maxLength={10}
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="busRoute">Bus Route</Label>
                  <Input
                    id="busRoute"
                    value={busRoute}
                    onChange={(e) => setBusRoute(e.target.value)}
                    placeholder="Enter your bus route"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-bustrackr-blue hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : isLogin ? (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Login
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus size={18} />
                  Register
                </span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-bustrackr-blue hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-bustrackr-blue hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default StudentLoginModal;
