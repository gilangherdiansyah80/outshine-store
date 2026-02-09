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
  { id: "under-100000", label: "Di bawah Rp. 100.000", min: 0, max: 100000 },
  {
    id: "100000-150000",
    label: "Rp. 100.000 - Rp. 150.000",
    min: 100000,
    max: 150000,
  },
  {
    id: "150000-200000",
    label: "Rp. 150.000 - Rp. 200.000",
    min: 150000,
    max: 200000,
  },
  {
    id: "above-200000",
    label: "Di atas Rp. 200.000",
    min: 200000,
    max: Infinity,
  },
] as const;

export type PriceRangeRecord = (typeof PRICE_RANGES)[number];

interface FilterSortState {
  selectedCategories: string[];
  selectedPriceRange: string | null; // ID of the price range
  selectedRating: number | null;
  sortOption: SortOption;

  toggleCategory: (category: string) => void;
  setPriceRange: (rangeId: string | null) => void;
  setRating: (rating: number | null) => void;
  setSortOption: (option: SortOption) => void;
  clearFilters: () => void;
}

export const useFilterSortStore = create<FilterSortState>((set) => ({
  selectedCategories: [],
  selectedPriceRange: null,
  selectedRating: null,
  sortOption: "Recommended",

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((cat) => cat !== category)
        : [...state.selectedCategories, category],
    })),

  setPriceRange: (rangeId) => set({ selectedPriceRange: rangeId }),

  setRating: (rating) => set({ selectedRating: rating }),

  setSortOption: (option) => set({ sortOption: option }),

  clearFilters: () =>
    set({
      selectedCategories: [],
      selectedPriceRange: null,
      selectedRating: null,
      sortOption: "Recommended",
    }),
}));
