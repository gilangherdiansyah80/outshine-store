import { useState } from "react";
import { cn } from "@outshine/lib/utils";
import Image from "@outshine/ui/Image/Image";
import { HeartIcon } from "@programmer-molor/my-icons";

export interface CardProductProps {
  /** Product image URL */
  imageSrc: string;
  /** Product name/title */
  name: string;
  /** Product price */
  price: number;
  /** Currency symbol (default: $) */
  currency?: string;
  /** Whether the product is in wishlist */
  isWishlisted?: boolean;
  /** Callback when wishlist button is clicked */
  onWishlistClick?: () => void;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * A product card component displaying:
 * - Product image with gradient background
 * - Wishlist heart icon
 * - Product name
 * - Price
 */
const CardProduct = ({
  imageSrc,
  name,
  price,
  currency = "$",
  isWishlisted = false,
  onWishlistClick,
  onClick,
  className,
}: CardProductProps) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
    onWishlistClick?.();
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A2665] cursor-pointer",
        "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
        {/* Product Image */}
        <Image
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          containerClassName="h-full w-full"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full",
            "bg-white/80 backdrop-blur-sm shadow-md",
            "transition-all duration-300 hover:bg-white hover:scale-110",
            wishlisted && "bg-red-50"
          )}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon size={20} color={wishlisted ? "#ef4444" : "#9ca3af"} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-4">
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Price */}
        <p className="text-sm font-medium text-blue-400">
          {currency}
          {formattedPrice}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
