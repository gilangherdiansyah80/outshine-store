import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface DataNotFoundProps {
  title?: string;
  description?: string;
  resetLabel?: string;
  onReset?: () => void;
  className?: string;
}

const DataNotFound: React.FC<DataNotFoundProps> = ({
  title = "No results found",
  description = "We couldn't find what you're looking for. Please try adjusting your filters or search terms.",
  resetLabel = "Clear All Filters",
  onReset,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-500",
        className
      )}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-150" />
        <div className="relative w-24 h-24 bg-white border border-gray-100 rounded-3xl shadow-xl flex items-center justify-center">
          <Search size={40} className="text-gray-300 stroke-[1.5]" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 border-4 border-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed mb-8">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 active:scale-95 transition-all"
        >
          <RotateCcw size={16} />
          {resetLabel}
        </button>
      )}
    </div>
  );
};

export default DataNotFound;
