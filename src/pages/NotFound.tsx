
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute -right-4 -top-4 animate-pulse rounded-full bg-bustrackr-blue p-2">
              <span className="text-white">?</span>
            </div>
            <Bus className="h-24 w-24 text-bustrackr-blue md:h-32 md:w-32" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold md:text-6xl">404</h1>
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
          Oops! Bus Not Found
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Looks like this bus route doesn't exist. Let's get you back on track!
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild className="bg-bustrackr-blue hover:bg-blue-600">
            <Link to="/">Return Home</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
