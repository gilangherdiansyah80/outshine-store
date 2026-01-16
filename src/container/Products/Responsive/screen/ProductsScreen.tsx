import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductSortBar from "../components/ProductSortBar";
import CardProduct from "@/components/Card/CardProduct";
import { useGetProducts } from "@/services/Products/useGetProducts";
import Loading from "@/components/Loader/Loading";
import { useEffect, useState, useMemo } from "react";
import {
  useFilterSortStore,
  PRICE_RANGES,
} from "@outshine/store/filterSortStore";

const ProductsScreen = () => {
  const { products, isLoading: swrLoading } = useGetProducts();
  const navigate = useNavigate();
  const [minLoading, setMinLoading] = useState(true);

  const {
    selectedSizes,
    selectedColors,
    selectedCategories,
    selectedPriceRange,
    sortOption,
  } = useFilterSortStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filtering logic
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c))
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedPriceRange !== "all") {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(
          (p) => p.price >= range.min && p.price <= range.max
        );
      }
    }

    // Sorting logic
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Recommended":
      default:
        // Keep original order or implement recommendation logic
        break;
    }

    return result;
  }, [
    products,
    selectedSizes,
    selectedColors,
    selectedCategories,
    selectedPriceRange,
    sortOption,
  ]);

  const isLoading = swrLoading || minLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-4 pb-24">
        {/* Filter Bar */}
        <div className="mb-2">
          <FilterBar />
        </div>

        {/* Sort Bar */}
        <div className="mb-4">
          <ProductSortBar totalProducts={filteredAndSortedProducts.length} />
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {filteredAndSortedProducts.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                imageSrc={product.image}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                isNew={product.isNew}
                aspectRatio="portrait"
                onClick={() => navigate(`/outshine/product/${product.id}`)}
                onWishlistClick={() => console.log("Wishlist:", product.name)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 font-medium">
              No products match your filters.
            </p>
            <button
              onClick={() => useFilterSortStore.getState().clearFilters()}
              className="mt-4 text-[#1E40AF] font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;
