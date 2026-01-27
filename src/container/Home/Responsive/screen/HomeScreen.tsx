import HeroBanner from "../components/HeroBanner";
import CategoryChips from "../components/CategoryChips";
import TrendingSection from "../components/TrendingSection";
import ShippingBanner from "../components/ShippingBanner";

import { useEffect, useState } from "react";
import Loading from "@/components/Loader/Loading";
import { useFilterSortStore } from "@outshine/store/filterSortStore";
import { useAddressStore } from "@/store/addressStore";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { clearFilters, toggleCategory } = useFilterSortStore();
  const { actions } = useAddressStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset address selection when entering home
    actions.resetSelection();
  }, [actions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-4 bg-white min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Chips */}
      <CategoryChips
        onCategorySelect={(category) => {
          clearFilters();
          if (category) {
            toggleCategory(category.id);
          }
          navigate("/outshine/products");
        }}
      />

      {/* Trending Now Section */}
      <TrendingSection
        onViewAll={() => {
          clearFilters();
          navigate("/outshine/products");
        }}
      />

      {/* Shipping Banner */}
      <ShippingBanner className="mt-2" />
    </div>
  );
}
