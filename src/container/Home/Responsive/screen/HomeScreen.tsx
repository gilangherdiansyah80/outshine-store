import HeroBanner from "../components/HeroBanner";
import CategoryChips from "../components/CategoryChips";
import TrendingSection from "../components/TrendingSection";
import ShippingBanner from "../components/ShippingBanner";

export default function HomeScreen() {
  return (
    <div className="flex flex-col gap-6 px-4 py-4 bg-white min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Chips */}
      <CategoryChips
        onCategorySelect={(category) =>
          console.log("Selected category:", category)
        }
      />

      {/* Trending Now Section */}
      <TrendingSection onViewAll={() => console.log("View all trending")} />

      {/* Shipping Banner */}
      <ShippingBanner className="mt-2" />
    </div>
  );
}
