import { X, RotateCcw, ChevronRight, Check, Star } from "lucide-react";
import {
  useFilterSortStore,
  PRICE_RANGES,
} from "@outshine/store/filterSortStore";
import { cn } from "@outshine/lib/utils";
import { useResponsiveNavigation } from "@outshine/hooks/use-responsive-navigation";
import { useSearchStore } from "@outshine/store/searchStore";
import { useGetCategory } from "@/services/Category/useGetCategory";

const FilterScreen = () => {
  const {
    selectedCategories,
    selectedPriceRange,
    selectedRating,
    toggleCategory,
    setPriceRange,
    setRating,
    clearFilters,
  } = useFilterSortStore();
  const { setSearchQuery } = useSearchStore();

  const handleReset = () => {
    clearFilters();
    setSearchQuery("");
  };

  const { pop, popToTop } = useResponsiveNavigation();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategory();

  const ratingOptions = [
    { value: 5, label: "5" },
    { value: 4, label: "4" },
    { value: 3, label: "3" },
    { value: 2, label: "2" },
    { value: 1, label: "1" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => pop()} className="p-1 cursor-pointer">
          <X size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Filter</h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[#0F172A] font-bold text-sm cursor-pointer"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 space-y-8 pb-32 overflow-y-auto">
        {/* Kategori Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Kategori</h2>
            <span className="text-[10px] font-bold text-[#0F172A] border border-[#0F172A] px-2.5 py-1 rounded-full uppercase tracking-wider">
              PILIH SATU
            </span>
          </div>

          <div className="space-y-3">
            {isCategoriesLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F172A]"></div>
              </div>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.name)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 cursor-pointer",
                    selectedCategories.includes(cat.name)
                      ? "bg-[#0F172A] text-white shadow-lg border-transparent"
                      : "bg-white text-gray-700 border border-gray-100 shadow-sm hover:border-[#0F172A]",
                  )}
                >
                  <span className="font-bold text-[15px]">{cat.name}</span>
                  <ChevronRight
                    size={18}
                    className={cn(
                      "transition-colors",
                      selectedCategories.includes(cat.name)
                        ? "text-white"
                        : "text-gray-400",
                    )}
                  />
                </button>
              ))
            )}
          </div>
        </section>

        {/* Harga Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Rentang Harga</h2>
            <span className="text-[10px] font-bold text-[#0F172A] border border-[#0F172A] px-2.5 py-1 rounded-full uppercase tracking-wider">
              PILIH SATU
            </span>
          </div>

          <div className="space-y-3">
            {PRICE_RANGES.map(
              (range) =>
                range.id !== "all" && (
                  <button
                    key={range.id}
                    onClick={() =>
                      setPriceRange(
                        selectedPriceRange === range.id ? null : range.id,
                      )
                    }
                    className={cn(
                      "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                      selectedPriceRange === range.id
                        ? "bg-[#0F172A] text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-[#0F172A]",
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                        selectedPriceRange === range.id
                          ? "border-white/30 bg-white/20"
                          : "border-gray-200",
                      )}
                    >
                      {selectedPriceRange === range.id && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="font-bold text-[15px]">{range.label}</span>
                  </button>
                ),
            )}
          </div>
        </section>

        {/* Rating Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Rating</h2>
            <span className="text-[10px] font-bold text-[#0F172A] border border-[#0F172A] px-2.5 py-1 rounded-full uppercase tracking-wider">
              PILIH SATU
            </span>
          </div>

          <div className="space-y-3">
            {ratingOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setRating(selectedRating === opt.value ? null : opt.value)
                }
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                  selectedRating === opt.value
                    ? "bg-[#0F172A] text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-[#0F172A]",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                    selectedRating === opt.value
                      ? "border-white/30 bg-white/20"
                      : "border-gray-200",
                  )}
                >
                  {selectedRating === opt.value && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Star
                    size={16}
                    className={cn(
                      "transition-colors",
                      selectedRating === opt.value
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200",
                    )}
                  />
                  <span className="font-bold text-[15px]">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Fixed Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md border-t border-gray-100 z-10">
        <button
          onClick={() => popToTop()}
          className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all cursor-pointer"
        >
          Tampilkan Hasil
        </button>
      </footer>
    </div>
  );
};

export default FilterScreen;
