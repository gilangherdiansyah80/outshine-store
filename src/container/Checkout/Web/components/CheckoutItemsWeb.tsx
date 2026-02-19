import { formatIDR } from "@/lib/utils";
import type { CartItem } from "@/store/cartStore";

interface CheckoutItemsWebProps {
  items: CartItem[];
}

export default function CheckoutItemsWeb({ items }: CheckoutItemsWebProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
          Your Items
        </p>
        <span className="text-[11px] font-black text-[#2563EB] uppercase tracking-widest">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-100 flex gap-4"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-black text-[#0F172A] text-sm line-clamp-1">
                {item.name}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                {item.color} • Size {item.size}
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-sm font-black text-[#0F172A]">
                  {item.formattedDiscounted || formatIDR(item.price)}
                </span>
                {item.formattedOriginal &&
                  item.formattedOriginal !== item.formattedDiscounted && (
                    <span className="text-[10px] text-slate-300 line-through font-bold">
                      {item.formattedOriginal}
                    </span>
                  )}
                <span className="text-[10px] text-slate-400 font-bold ml-auto">
                  ×{item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
