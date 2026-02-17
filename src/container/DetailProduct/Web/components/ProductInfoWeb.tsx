import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2, Info } from "lucide-react";
import { cn } from "@outshine/lib/utils";
import Button from "@outshine/ui/Button/Button";

interface ProductInfoWebProps {
  product: {
    id: string;
    title: string;
    price: number;
    formattedDiscounted?: string;
    originalPrice?: number;
    formattedOriginal?: string;
    rating: number;
    reviewCount: number;
    description: string;
  };
}

const COLORS = [
  { name: "Midnight Black", class: "bg-black" },
  { name: "Silver Grey", class: "bg-gray-400" },
  { name: "Navy Blue", class: "bg-[#1E3A8A]" },
];

const ProductInfoWeb = ({ product }: ProductInfoWebProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Midnight Black");
  const [condition, setCondition] = useState<"new" | "refurbished">("new");

  return (
    <div className="flex flex-col gap-8 py-2">
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
          Soundmaster Series
        </h4>
        <h1 className="text-4xl font-extrabold text-[#0F172A] leading-tight font-sans">
          {product.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200",
                )}
              />
            ))}
            <span className="text-xs font-bold text-gray-400 ml-1">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">
            In Stock
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-[#2563EB]">
            {product.formattedDiscounted ||
              `Rp ${product.price.toLocaleString()}`}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through font-medium">
              {product.formattedOriginal ||
                `Rp ${product.originalPrice.toLocaleString()}`}
            </span>
          )}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Color: <span className="text-[#0F172A]">{selectedColor}</span>
          </span>
        </div>
        <div className="flex gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center p-0.5 shadow-sm",
                selectedColor === color.name
                  ? "border-[#2563EB] scale-110"
                  : "border-transparent",
              )}
            >
              <div className={cn("w-full h-full rounded-full", color.class)} />
            </button>
          ))}
        </div>
      </div>

      {/* Condition Switch */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Condition
          </span>
          <button className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 uppercase">
            <Info size={12} />
            Warranty Info
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setCondition("new")}
            className={cn(
              "py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-sm",
              condition === "new"
                ? "bg-white text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            Brand New
          </button>
          <button
            onClick={() => setCondition("refurbished")}
            className={cn(
              "py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-sm",
              condition === "refurbished"
                ? "bg-white text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            Refurbished
          </button>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Quantity
        </span>
        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl w-fit overflow-hidden p-1 shadow-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#0F172A] font-bold text-lg"
          >
            -
          </button>
          <div className="w-12 h-10 flex items-center justify-center font-black text-[#0F172A]">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#0F172A] font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4">
        <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
        <Button className="w-full bg-[#0F172A] hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-100 active:scale-[0.98] transition-all">
          Buy It Now
        </Button>
      </div>

      <div className="flex items-center justify-center gap-8 py-2">
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#EE4D2D] transition-colors group">
          <Heart size={16} className="group-hover:fill-current" />
          Add to Wishlist
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#2563EB] transition-colors">
          <Share2 size={16} />
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductInfoWeb;
