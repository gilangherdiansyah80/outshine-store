import { X, RotateCcw, ChevronRight, Check } from "lucide-react";
import {
  useFilterSortStore,
  PRICE_RANGES,
} from "@outshine/store/filterSortStore";
import { cn } from "@outshine/lib/utils";
import { useResponsiveNavigation } from "@outshine/hooks/use-responsive-navigation";

const FilterScreen = () => {
  const {
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedPriceRange,
    toggleCategory,
    toggleSize,
    toggleColor,
    setPriceRange,
    clearFilters,
  } = useFilterSortStore();

  const { pop, popToTop } = useResponsiveNavigation();

  const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "Jackets", label: "Jackets" },
    { id: "T-Shirts", label: "T-Shirts" },
    { id: "Hoodies", label: "Hoodies" },
    { id: "Pants", label: "Pants" },
    { id: "Sweaters", label: "Sweaters" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Grey", "Blue", "Navy", "Brown", "Orange"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => pop()} className="p-1 cursor-pointer">
          <X size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Filter</h1>
        <button
          onClick={clearFilters}
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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id === "all" ? "" : cat.id)}
                className={cn(
                  "w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 cursor-pointer",
                  (
                    cat.id === "all"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.id)
                  )
                    ? "bg-[#0F172A] text-white shadow-lg border-transparent"
                    : "bg-white text-gray-700 border border-gray-100 shadow-sm hover:border-[#0F172A]"
                )}
              >
                <span className="font-bold text-[15px]">{cat.label}</span>
                <ChevronRight
                  size={18}
                  className={cn(
                    "transition-colors",
                    (
                      cat.id === "all"
                        ? selectedCategories.length === 0
                        : selectedCategories.includes(cat.id)
                    )
                      ? "text-white"
                      : "text-gray-400"
                  )}
                />
              </button>
            ))}
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
            {PRICE_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => setPriceRange(range.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                  selectedPriceRange === range.id
                    ? "bg-[#0F172A] text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-[#0F172A]"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                    selectedPriceRange === range.id
                      ? "border-white/30 bg-white/20"
                      : "border-gray-200"
                  )}
                >
                  {selectedPriceRange === range.id && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <span className="font-bold text-[15px]">{range.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Ukuran Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Ukuran</h2>
            <span className="text-[10px] font-bold text-[#0F172A] border border-[#0F172A] px-2.5 py-1 rounded-full uppercase tracking-wider">
              BANYAK PILIHAN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                  selectedSizes.includes(size)
                    ? "bg-[#0F172A] text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-[#0F172A]"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                    selectedSizes.includes(size)
                      ? "border-white/30 bg-white/20"
                      : "border-gray-200"
                  )}
                >
                  {selectedSizes.includes(size) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <span className="font-bold text-[15px]">{size}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Warna Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Warna</h2>
            <span className="text-[10px] font-bold text-[#0F172A] border border-[#0F172A] px-2.5 py-1 rounded-full uppercase tracking-wider">
              BANYAK PILIHAN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300",
                  selectedColors.includes(color)
                    ? "bg-[#0F172A] text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-[#0F172A]"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                    selectedColors.includes(color)
                      ? "border-white/30 bg-white/20"
                      : "border-gray-200"
                  )}
                >
                  {selectedColors.includes(color) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <span className="font-bold text-[15px]">{color}</span>
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
