import { ArrowUpDown, Check } from "lucide-react";
import { useFilterSortStore } from "@outshine/store/filterSortStore";
import type { SortOption } from "@outshine/store/filterSortStore";
import { cn } from "@outshine/lib/utils";
import { useState } from "react";

interface ProductSortBarProps {
  totalProducts?: number;
}

const ProductSortBar = ({ totalProducts = 0 }: ProductSortBarProps) => {
  const { sortOption, setSortOption } = useFilterSortStore();
  const [isOpen, setIsOpen] = useState(false);

  const options: SortOption[] = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
  ];

  return (
    <div className="flex items-center justify-between py-2 relative">
      <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
        {totalProducts} PRODUCTS
      </span>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs text-[#0F172A] font-bold transition-opacity active:opacity-70"
        >
          <ArrowUpDown size={14} className="text-[#0F172A]" />
          Sort: <span className="text-[#1E40AF]">{sortOption}</span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-1.5">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortOption(opt);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-colors",
                      sortOption === opt
                        ? "bg-[#1E40AF]/5 text-[#1E40AF]"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {opt}
                    {sortOption === opt && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSortBar;
