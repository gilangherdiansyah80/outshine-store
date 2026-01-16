import { cn } from "@outshine/lib/utils";
import Image from "@outshine/ui/Image/Image";
import { PlusIcon } from "@programmer-molor/my-icons";
import type { TrendingProductItem } from "@outshine/services/Home/useGetTrendingProducts";

interface CardProductTrendingProps {
  product: TrendingProductItem;
  onAddToCart?: () => void;
  onClick?: () => void;
  className?: string;
}

/**
 * Product card for trending section with NEW/SALE badges
 */
const CardProductTrending = ({
  product,
  onAddToCart,
  onClick,
  className,
}: CardProductTrendingProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(product.originalPrice)
    : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white cursor-pointer",
        "transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Product Image */}
        <Image
          src={product.imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          containerClassName="h-full w-full"
        />

        {/* NEW Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10 bg-[#0F172A] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            NEW
          </div>
        )}

        {/* SALE Badge */}
        {product.isSale && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            SALE
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full",
            "bg-[#0F172A] shadow-md",
            "transition-all duration-300 hover:bg-[#0d3380] hover:scale-110"
          )}
          aria-label="Add to cart"
        >
          <PlusIcon size={18} color="#ffffff" />
        </button>
      </div>

      {/* Content - Dark Background */}
      <div className="flex flex-col gap-0.5 p-3 bg-[#5D5D5D]">
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-white line-clamp-1 leading-tight">
          {product.name}
        </h3>

        {/* Variant */}
        <p className="text-xs text-gray-400">{product.variant}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-[#0F172A]">
            {product.currency}
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs text-gray-500 line-through">
              {product.currency}
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProductTrending;
