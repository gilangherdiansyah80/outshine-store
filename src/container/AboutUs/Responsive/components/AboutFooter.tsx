import { MapPin } from "lucide-react";

const AboutFooter = () => {
  return (
    <div className="text-center pt-4 pb-8 space-y-2">
      <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
        <MapPin size={12} />
        <span>Sidoarjo, Indonesia</span>
      </div>
      <p className="text-[10px] text-gray-600">
        © 2026 Outshine Store. All rights reserved.
      </p>
    </div>
  );
};

export default AboutFooter;
