import { useState, useEffect } from "react";
import { Bus } from "lucide-react";

const BusMap = () => {
  const [busPosition, setBusPosition] = useState({ x: 10, y: 50 });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading the map
    const loadTimer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);

    // Simulate bus movement
    const movementInterval = setInterval(() => {
      setBusPosition((prev) => {
        const newX = prev.x + (Math.random() * 2 - 1) * 0.5;
        const newY = prev.y + (Math.random() * 2 - 1) * 0.5;
        
        // Keep bus within bounds
        return {
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(95, newY)),
        };
      });
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(movementInterval);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-bustrackr-blue border-t-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      <div className={`absolute inset-0 ${mapLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        {/* Mock Map Background - in a real app, this would be a Google Maps component */}
        <div className="h-full w-full bg-[#F4F7F9] dark:bg-[#1A2035]">
          {/* Map Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
            {Array(36).fill(0).map((_, i) => (
              <div key={i} className="border border-muted/20" />
            ))}
          </div>
          
          {/* Map Features */}
          <div className="absolute inset-0">
            {/* Roads */}
            <div className="absolute left-0 right-0 top-1/4 h-2 bg-slate-300 dark:bg-slate-700" />
            <div className="absolute left-0 right-0 top-3/4 h-2 bg-slate-300 dark:bg-slate-700" />
            <div className="absolute bottom-0 left-1/3 top-0 w-2 bg-slate-300 dark:bg-slate-700" />
            <div className="absolute bottom-0 left-2/3 top-0 w-2 bg-slate-300 dark:bg-slate-700" />
            
            {/* Key Locations */}
            <div className="absolute left-[15%] top-1/4 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-bustrackr-lightblue/20 p-1 text-xs shadow">
              <span>School</span>
            </div>
            
            <div className="absolute left-[85%] top-3/4 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-bustrackr-lightgreen/20 p-1 text-xs shadow">
              <span>Home</span>
            </div>
            
            {/* Path Line */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d={`M ${busPosition.x}% ${busPosition.y}% L 85% 75%`}
                stroke="#64B5F6"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
            </svg>
          </div>
          
          {/* Bus Marker */}
          <div
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-1000 ease-in-out"
            style={{
              left: `${busPosition.x}%`,
              top: `${busPosition.y}%`,
            }}
          >
            <div className="animate-pulse-light rounded-full bg-bustrackr-blue/30 p-2">
              <div className="rounded-full bg-bustrackr-blue p-2">
                <Bus className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Destination Marker */}
          <div className="absolute right-[15%] top-3/4 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="animate-bounce-soft rounded-full bg-bustrackr-green p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="mt-1 rounded-md bg-card px-2 py-1 text-center text-xs shadow">
              <div className="font-semibold">Your Stop</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusMap;
