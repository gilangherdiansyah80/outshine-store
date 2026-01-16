import { cn } from "@outshine/lib/utils";
import { Heart, CheckCircle2 } from "lucide-react";
import { useWishlistStore } from "@outshine/store/wishlistStore";

interface CardWishlistProps {
  id: string;
  imageSrc: string;
  name: string;
  category: string;
  price: number;
  inStock?: boolean;
  onAddToCart?: () => void;
  onRemove?: () => void;
  onClick?: () => void;
}

const CardWishlist = ({
  id,
  imageSrc,
  name,
  category,
  price,
  inStock = true,
  onAddToCart,
  onRemove,
  onClick,
}: CardWishlistProps) => {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem({
      id,
      name,
      price,
      image: imageSrc,
      category,
    });
    onRemove?.();
  };

  return (
    <div
      className="space-y-4 group bg-[#0B0F19] p-3 rounded-4xl"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-900 border border-white/5">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              wishlisted ? "fill-red-500 text-red-500" : "text-white"
            )}
          />
        </button>
      </div>

      {/* Info and Actions */}
      <div className="flex items-start justify-between gap-4 px-2 pb-6">
        <div className="space-y-1.5 flex-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
            {category}
          </p>
          <h3 className="text-lg font-bold text-white leading-tight">{name}</h3>

          <div className="pt-1 space-y-1">
            <p className="text-xl font-bold text-blue-500">
              ${price.toFixed(2)}
            </p>
            {inStock && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock
              </div>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="px-6 h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-900/40 shrink-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardWishlist;
