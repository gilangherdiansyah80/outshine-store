import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductSortBar from "../components/ProductSortBar";
import CardProduct from "@/components/Card/CardProduct"; // Updated import
import { useGetProducts } from "@/services/Products/useGetProducts";
import Loading from "@/components/Loader/Loading";
import { useEffect, useState } from "react";

const ProductsScreen = () => {
  const { products, isLoading: swrLoading } = useGetProducts();
  const navigate = useNavigate();
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = swrLoading || minLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {products?.map((product) => (
            <CardProduct
              key={product.id}
              imageSrc={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              isNew={product.isNew}
              aspectRatio="portrait"
              onClick={() => navigate(`/outshine/products/${product.id}`)}
              onWishlistClick={() => console.log("Wishlist:", product.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsScreen;
