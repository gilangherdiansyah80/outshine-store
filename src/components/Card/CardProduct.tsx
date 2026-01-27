import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import Image from "@outshine/ui/Image/Image";
import { HeartIcon } from "@programmer-molor/my-icons";
import Badge from "@outshine/ui/Badge/Badge";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useAuth } from "@/lib/auth";
import { usePostWishlists } from "@/services/WishLists/usePostWishlists";
import { useDeleteWishlists } from "@/services/WishLists/useDeleteWishlists";
import { FolderPlus } from "lucide-react";

export interface CardProductProps {
  /** Product image URL */
  imageSrc: string;
  /** Product name/title */
  name: string;
  /** Product price (number for formatting, or pre-formatted string) */
  price: number | string;
  /** Original price for discount calculation/display */
  originalPrice?: number | string;
  /** Currency symbol (default: $, ignored if price is pre-formatted string) */
  currency?: string;
  /** Whether product is new */
  isNew?: boolean;
  /** Whether product is Pre-Order */
  isPo?: boolean;
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
  /** Callback to add to collection */
  onAddToCollection?: () => void;
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
  currency = "",
  isNew,
  isPo,
  discount,
  onWishlistClick,
  onAddToCollection,
  onClick,
  className,
  aspectRatio = "portrait",
  id, // Need ID for wishlist
}: CardProductProps & { id?: string }) => {
  const { trigger: addToWishlist } = usePostWishlists();
  const { trigger: removeFromWishlist } = useDeleteWishlists();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const wishlisted = id ? isInWishlist(id) : false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/outshine/welcome", { state: { from: location } });
      return;
    }

    if (id) {
      // Trigger API call based on current state
      if (wishlisted) {
        removeFromWishlist({ productId: id });
      } else {
        addToWishlist({ productId: id });
      }

      toggleItem({
        id,
        name,
        price: typeof price === "number" ? price : 0,
        originalPrice:
          typeof originalPrice === "number" ? originalPrice : undefined,
        image: imageSrc,
        isNew,
        discount,
      });
    }
    onWishlistClick?.();
  };

  // Handle both pre-formatted string and number prices
  const formattedPrice =
    typeof price === "string"
      ? price
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price);

  const formattedOriginalPrice = originalPrice
    ? typeof originalPrice === "string"
      ? originalPrice
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(originalPrice)
    : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-3 cursor-pointer",
        className,
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800",
          aspectRatio === "square" ? "aspect-square" : "aspect-3/4",
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
          {isPo && <Badge variant="primary">Pre-Order</Badge>}
          {isNew && <Badge variant="dark">NEW</Badge>}
          {isPo && <Badge variant="warning">Pre-Order</Badge>}
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
            "bg-black/50 backdrop-blur-md shadow-md border border-white/20",
            "transition-all duration-200 hover:bg-black/70 hover:scale-110 active:scale-95",
          )}
        >
          <HeartIcon
            size={18}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-red-500 text-red-500" : "text-white",
            )}
            color={wishlisted ? "#ef4444" : "#ffffff"}
          />
        </button>

        {/* Add to Collection Button (Custom for Wishlist) */}
        {onAddToCollection && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCollection();
            }}
            className={cn(
              "absolute top-12 right-2 h-8 w-8 flex items-center justify-center rounded-full",
              "bg-white/20 backdrop-blur-md shadow-sm text-white",
              "transition-all duration-200 hover:bg-white hover:text-black hover:scale-110 active:scale-95",
            )}
          >
            <FolderPlus size={16} />
          </button>
        )}
      </div>

      {/* Content Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-500 truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0F172A]">
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
