import { MapPin, Navigation } from "lucide-react";

const AboutLocation = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Visit Our Studio</h3>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 border border-white/10">
        {/* Map Background Placeholder */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-118.2325,34.0345,14,0/600x400@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazl5bSJ9')] bg-cover bg-center grayscale opacity-50" />

        {/* Simple grid pattern as fallback for map look */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="p-2 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50">
            <MapPin className="w-6 h-6 text-white fill-current" />
          </div>
        </div>

        {/* Address Badge */}
        <div className="absolute bottom-4 left-4 bg-[#1F2430] py-2 px-3 rounded-lg border border-white/10 shadow-xl">
          <span className="text-xs font-semibold text-white">
            742 Arts District, LA
          </span>
        </div>
      </div>

      <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/40">
        <Navigation className="w-4 h-4 fill-current" />
        Get Directions
      </button>
    </div>
  );
};

export default AboutLocation;
