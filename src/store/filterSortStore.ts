import { create } from "zustand";

export const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const PRICE_RANGES = [
  { id: "all", label: "Semua Harga", min: 0, max: Infinity },
  { id: "under-50", label: "Di bawah $50", min: 0, max: 50 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
  { id: "above-200", label: "Di atas $200", min: 200, max: Infinity },
] as const;

export type PriceRangeRecord = (typeof PRICE_RANGES)[number];

interface FilterSortState {
  selectedSizes: string[];
  selectedColors: string[];
  selectedCategories: string[];
  selectedPriceRange: string; // ID of the price range
  sortOption: SortOption;

  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  toggleCategory: (category: string) => void;
  setPriceRange: (rangeId: string) => void;
  setSortOption: (option: SortOption) => void;
  clearFilters: () => void;
}

export const useFilterSortStore = create<FilterSortState>((set) => ({
  selectedSizes: [],
  selectedColors: [],
  selectedCategories: [],
  selectedPriceRange: "all",
  sortOption: "Recommended",

  toggleSize: (size) =>
    set((state) => ({
      selectedSizes: state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size],
    })),

  toggleColor: (color) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(color)
        ? state.selectedColors.filter((c) => c !== color)
        : [...state.selectedColors, color],
    })),

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((cat) => cat !== category)
        : [...state.selectedCategories, category],
    })),

  setPriceRange: (rangeId) => set({ selectedPriceRange: rangeId }),

  setSortOption: (option) => set({ sortOption: option }),

  clearFilters: () =>
    set({
      selectedSizes: [],
      selectedColors: [],
      selectedCategories: [],
      selectedPriceRange: "all",
      sortOption: "Recommended",
    }),
}));
