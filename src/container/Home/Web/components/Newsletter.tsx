import { cn } from "@outshine/lib/utils";
import { ShieldCheck } from "lucide-react";

const Newsletter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl bg-[#0F172A]",
        className,
      )}
    >
      {/* Text Content */}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-base">
          Diproses dengan Standar Outshine
        </span>
        <span className="text-gray-300 text-sm">Rapi • Teliti • Terjaga</span>
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/20">
        <ShieldCheck size={28} className="text-yellow-500" />
      </div>
    </div>
  );
};

export default Newsletter;
