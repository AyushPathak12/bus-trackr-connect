
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FacultyLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FacultyLoginModal = ({ isOpen, onClose }: FacultyLoginModalProps) => {
  const [facultyCode, setFacultyCode] = useState("");
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
      
      // Validate login
      if (facultyCode && password) {
        toast({
          title: "Login Successful",
          description: "Welcome back to BusTrackr Faculty Portal!",
        });
        onClose();
        navigate("/faculty-dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please fill all required fields",
          variant: "destructive",
        });
      }
    }, 1000);
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
            <h2 className="text-2xl font-semibold">Faculty Login</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-muted"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facultyCode">Faculty Code (6 digits)</Label>
              <Input
                id="facultyCode"
                value={facultyCode}
                onChange={(e) => setFacultyCode(e.target.value)}
                placeholder="Enter your 6-digit faculty code"
                maxLength={6}
              />
            </div>

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
              className="w-full bg-bustrackr-green hover:bg-green-600"
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Login
                </span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => {
                toast({
                  title: "Code Recovery",
                  description: "Contact your administrator to recover your faculty code.",
                });
              }}
              className="text-bustrackr-green hover:underline"
            >
              Forgot Faculty Code?
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FacultyLoginModal;
