import { cn } from "@outshine/lib/utils";
import Image from "@outshine/ui/Image/Image";
import { HeartIcon } from "@programmer-molor/my-icons";
import { useState } from "react";
import Badge from "@outshine/ui/Badge/Badge";

export interface CardProductProps {
  /** Product image URL */
  imageSrc: string;
  /** Product name/title */
  name: string;
  /** Product price */
  price: number;
  /** Original price for discount calculation/display */
  originalPrice?: number;
  /** Currency symbol (default: $) */
  currency?: string;
  /** Whether product is new */
  isNew?: boolean;
  /** Discount percentage or label (e.g. "SALE") */
  discount?: number | string;
  /** Whether the product is in wishlist */
  isWishlisted?: boolean;
  /** Callback when wishlist button is clicked */
  onWishlistClick?: () => void;
  /** Callback when add to cart button is clicked (optional, shows button if provided) */
  onAddToCart?: () => void;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Aspect ratio of the card image */
  aspectRatio?: "square" | "portrait";
}

/**
 * Unified Product Card Component
 * Supports both Home Page (Square, Bold) and Product Grid (Portrait, Clean) styles.
 */
const CardProduct = ({
  imageSrc,
  name,
  price,
  originalPrice,
  currency = "$",
  isNew,
  discount,
  isWishlisted = false,
  onWishlistClick,
  // onAddToCart,
  onClick,
  className,
  aspectRatio = "portrait",
}: CardProductProps) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
    onWishlistClick?.();
  };

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   onAddToCart?.();
  // };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(originalPrice)
    : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-3 cursor-pointer",
        className
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800",
          aspectRatio === "square" ? "aspect-square" : "aspect-3/4"
        )}
      >
        <Image
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          containerClassName="h-full w-full"
        />

        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isNew && <Badge variant="dark">NEW</Badge>}
          {discount && (
            <Badge variant="danger">
              {typeof discount === "number" ? `-${discount}%` : discount}
            </Badge>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full",
            "bg-white/20 backdrop-blur-md shadow-sm",
            "transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
          )}
        >
          <HeartIcon
            size={18}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-red-500 text-red-500" : "text-white"
            )}
            color={wishlisted ? "#ef4444" : "#ffffff"}
          />
        </button>

        {/* Add to Cart Button (Bottom Right) - Only if handler provided */}
        {/* {onAddToCart && (
          <button
            onClick={handleAddToCart}
            className={cn(
              "absolute bottom-2 right-2 h-9 w-9 flex items-center justify-center rounded-full",
              "bg-[#0A2665] text-white shadow-lg",
              "transition-all duration-300 transform translate-y-12 opacity-0",
              "group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#0F358E]"
            )}
          >
            <PlusIcon size={18} color="#ffffff" />
          </button>
        )} */}
      </div>

      {/* Content Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#3B82F6]">
            {currency}
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs text-gray-500 line-through dark:text-gray-400">
              {currency}
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
