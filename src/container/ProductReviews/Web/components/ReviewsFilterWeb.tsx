import { ChevronDown } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface ReviewsFilterWebProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
}

export default function ReviewsFilterWeb({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
}: ReviewsFilterWebProps) {
  const filters = [
    { id: "all", label: "Semua Ulasan" },
    { id: "photo", label: "Dengan Foto" },
    { id: "rating-5", label: "Rating 5 ★" },
    { id: "rating-4", label: "Rating 4 ★" },
    { id: "rating-1-3", label: "Rating 1-3 ★" },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-2",
              activeFilter === filter.id
                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-md shadow-blue-100"
                : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 pr-2">
        <span className="text-xs font-bold text-gray-400">Urutkan:</span>
        <div className="relative group">
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white border-2 border-gray-100 rounded-xl px-5 py-2.5 pr-10 text-xs font-bold text-[#0F172A] cursor-pointer hover:border-gray-200 transition-all outline-none focus:border-[#2563EB]"
          >
            <option value="newest">Terbaru</option>
            <option value="highest">Rating Tertinggi</option>
            <option value="lowest">Rating Terendah</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#0F172A]"
          />
        </div>
      </div>
    </div>
  );
}
