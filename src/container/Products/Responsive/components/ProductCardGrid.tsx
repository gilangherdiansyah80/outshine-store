import { Heart } from "lucide-react";
import type { ProductItem } from "@/services/Products/useGetProducts";
import Image from "@outshine/ui/Image/Image";

interface ProductCardGridProps {
  product: ProductItem;
}

const ProductCardGrid = ({ product }: ProductCardGridProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Image Container with Badges */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F1F5F9]">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Heart size={18} className="text-white" />
        </button>

        {/* Badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {product.isNew && (
            <span className="bg-[#1E1B4B] text-white text-[10px] font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.discount && (
            <span className="bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-white truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#3B82F6]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardGrid;
