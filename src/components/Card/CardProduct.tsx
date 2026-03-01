import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import Image from "@outshine/ui/Image/Image";
import { HeartIcon } from "@programmer-molor/my-icons";
import Badge from "@outshine/ui/Badge/Badge";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useAuth } from "@/lib/auth";
import { usePostWishlists } from "@/services/WishLists/usePostWishlists";
import { useDeleteWishlists } from "@/services/WishLists/useDeleteWishlists";
import { Star } from "lucide-react";

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
  /** Average rating */
  rating?: number;
  /** Layout orientation */
  layout?: "grid" | "list";
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
  onClick,
  className,
  aspectRatio = "portrait",
  rating,
  id, // Need ID for wishlist
  layout = "grid",
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
        "group relative flex gap-3 cursor-pointer",
        layout === "grid"
          ? "flex-col"
          : "flex-row bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#2563EB] hover:shadow-lg transition-all",
        className,
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0",
          layout === "grid"
            ? aspectRatio === "square"
              ? "aspect-square w-full"
              : "aspect-3/4 w-full"
            : "w-32 h-32 md:w-40 md:h-40",
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
            layout === "list" && "hidden", // Move to end for list view for better design
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
      </div>

      {/* Content Info */}
      <div
        className={cn(
          "flex flex-col flex-1",
          layout === "grid" ? "gap-1" : "gap-2 py-2",
        )}
      >
        <h3
          className={cn(
            "font-semibold text-gray-500 truncate",
            layout === "grid" ? "text-sm" : "text-lg text-[#0F172A]",
          )}
        >
          {name}
        </h3>

        <div
          className={cn(
            "flex justify-between",
            layout === "grid" ? "flex-row" : "flex-col gap-4",
          )}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-bold text-[#0F172A]",
                  layout === "grid" ? "text-sm" : "text-xl",
                )}
              >
                {currency}
                {formattedPrice}
              </span>
              {formattedOriginalPrice &&
                formattedOriginalPrice !== formattedPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {currency}
                    {formattedOriginalPrice}
                  </span>
                )}
            </div>
            {layout === "list" && (
              <p className="text-sm text-gray-400 line-clamp-2 max-w-xl">
                Dapatkan produk kualitas terbaik dengan harga terjangkau hanya
                di Outshine Store.
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {rating !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1",
                  layout === "grid" ? "-mt-12" : "",
                )}
              >
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-600">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}

            {layout === "list" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWishlistClick}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200",
                    "transition-all duration-200 hover:bg-gray-50 active:scale-95",
                  )}
                >
                  <HeartIcon
                    size={20}
                    className={cn(
                      "transition-colors",
                      wishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400",
                    )}
                    color={wishlisted ? "#ef4444" : "#9ca3af"}
                  />
                </button>
                <button
                  onClick={onClick}
                  className="bg-[#0F172A] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#1e293b] transition-all"
                >
                  Detail
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
