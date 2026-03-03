import Hero from "./components/Hero";
import PopularCategories from "./components/PopularCategories";
import TrendingProducts from "./components/TrendingProducts";
import Newsletter from "./components/Newsletter";

export default function HomeWeb() {
  return (
    <main className="bg-white min-h-screen pt-5 pb-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-10">
        {/* Hero Section */}
        <Hero />

        {/* Popular Categories */}
        <PopularCategories />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </main>
  );
}
