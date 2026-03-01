import { Check, ChevronDown, RotateCcw, Star } from "lucide-react";
import { cn } from "@outshine/lib/utils";
import { useGetCategory } from "@/services/Category/useGetCategory";
import { useFilterSortStore } from "@outshine/store/filterSortStore";

// const COLORS = [
//   { name: "Black", class: "bg-black" },
//   { name: "White", class: "bg-white border-gray-200" },
//   { name: "Red", class: "bg-red-500" },
//   { name: "Blue", class: "bg-blue-500" },
//   { name: "Green", class: "bg-green-500" },
//   { name: "Yellow", class: "bg-yellow-400" },
// ];

const FilterSidebar = ({ className }: { className?: string }) => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const {
    selectedCategories,
    selectedRating,
    toggleCategory,
    setRating,
    setMaxPrice,
    maxPrice,
    clearFilters,
  } = useFilterSortStore();

  const currentMax = maxPrice || 1000000;

  return (
    <aside
      className={cn(
        "w-64 flex flex-col gap-8 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm h-fit sticky top-28",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#0F172A]">Filter</h2>
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#2563EB] transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-extrabold text-[#0F172A] uppercase tracking-wider">
            Kategori
          </h3>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                selectedCategories.length === 0
                  ? "bg-[#2563EB] border-[#2563EB]"
                  : "border-gray-200 group-hover:border-[#2563EB]",
              )}
            >
              {selectedCategories.length === 0 && (
                <Check size={12} className="text-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedCategories.length === 0}
              onChange={() => clearFilters()}
            />
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                selectedCategories.length === 0
                  ? "text-[#0F172A] font-bold"
                  : "text-gray-500 hover:text-[#2563EB]",
              )}
            >
              Semua Produk
            </span>
          </label>
          {!categoriesLoading &&
            categories?.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                    selectedCategories.includes(category.name)
                      ? "bg-[#2563EB] border-[#2563EB]"
                      : "border-gray-200 group-hover:border-[#2563EB]",
                  )}
                >
                  {selectedCategories.includes(category.name) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => toggleCategory(category.name)}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    selectedCategories.includes(category.name)
                      ? "text-[#0F172A] font-bold"
                      : "text-gray-500 hover:text-[#2563EB]",
                  )}
                >
                  {category.name}
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-extrabold text-[#0F172A] uppercase tracking-wider">
          Rentang Harga
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={currentMax}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
          />
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
              <span className="text-[10px] text-gray-400 block p-0">Min</span>
              <span className="text-xs font-extrabold text-[#0F172A]">
                Rp 0
              </span>
            </div>
            <div className="w-2 h-px bg-gray-200" />
            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
              <span className="text-[10px] text-gray-400 block p-0">Max</span>
              <span className="text-xs font-extrabold text-[#0F172A]">
                Rp {new Intl.NumberFormat("id-ID").format(currentMax)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-extrabold text-[#0F172A] uppercase tracking-wider">
          Rating
        </h3>
        <div className="flex flex-col gap-3">
          {[5, 4].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                  selectedRating === rating
                    ? "bg-[#2563EB] border-[#2563EB]"
                    : "border-gray-200 group-hover:border-[#2563EB]",
                )}
              >
                {selectedRating === rating && (
                  <Check size={12} className="text-white" />
                )}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={selectedRating === rating}
                onChange={() =>
                  setRating(selectedRating === rating ? null : rating)
                }
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      "transition-colors",
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200",
                    )}
                  />
                ))}
                <span className="text-xs font-bold text-gray-400 ml-1">
                  & Up
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[10px] text-gray-400 text-center italic">
          Filter diterapkan secara otomatis
        </p>
      </div>
    </aside>
  );
};

export default FilterSidebar;
