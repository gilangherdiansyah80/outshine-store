import { Trash2, ShoppingCart, Star } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface WishlistItemCardWebProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistItemCardWeb({
  id,
  name,
  price,
  image,
  category,
  rating = 4.5,
  onRemove,
  onAddToCart,
}: WishlistItemCardWebProps) {
  return (
    <div className="group bg-white rounded-4xl border-2 border-slate-50 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Actions Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onRemove(id)}
            className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-[#0F172A] shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#2563EB] transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1.5">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-500">{rating}</span>
            </div>
          </div>
          <p className="text-lg font-black text-[#0F172A] tracking-tight">
            {formatIDR(price)}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(id)}
          className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-slate-800 shadow-xl shadow-slate-100 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
