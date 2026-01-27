import { useNavigate } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import { useGetTrendingProducts } from "@outshine/services/Home/useGetTrendingProducts";
import { ChevronRightIcon } from "@programmer-molor/my-icons";
import CardProduct from "@outshine/components/Card/CardProduct";

interface TrendingSectionProps {
  onViewAll?: () => void;
  className?: string;
}

/**
 * Trending Now section with product grid
 */
const TrendingSection = ({ onViewAll, className }: TrendingSectionProps) => {
  const { data: products, isLoading } = useGetTrendingProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className={cn("", className)}>
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
        >
          View all
          <ChevronRightIcon size={16} color="#3b82f6" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            imageSrc={product.image}
            name={product.name}
            price={product.formattedPrice || product.price}
            originalPrice={
              product.formattedOriginalPrice || product.originalPrice
            }
            isNew={product.isNew}
            isPo={product.isPo}
            discount={product.discount}
            aspectRatio="square"
            onAddToCart={() => console.log("Add to cart:", product.name)}
            onClick={() => navigate(`/outshine/product/${product.id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
