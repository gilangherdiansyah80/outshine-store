import FilterBar from "../components/FilterBar";
import ProductSortBar from "../components/ProductSortBar";
import ProductCardGrid from "../components/ProductCardGrid";
import { useGetProducts } from "@/services/Products/useGetProducts";

const ProductsScreen = () => {
  const { products, isLoading } = useGetProducts();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="px-4 pt-4 pb-24">
        {/* Title Section */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold">Winter Collection</h1>
        </div>

        {/* Filter Bar */}
        <div className="mb-4">
          <FilterBar onFilterClick={() => console.log("Filter clicked")} />
        </div>

        {/* Sort Bar */}
        <div className="mb-4">
          <ProductSortBar
            totalProducts={128}
            onSortClick={() => console.log("Sort clicked")}
          />
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 aspect-[3/4] rounded-xl mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {products?.map((product) => (
              <ProductCardGrid key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;
