import type { CartItem } from "@/store/cartStore";

interface CheckoutItemsProps {
  items: CartItem[];
}

const CheckoutItems = ({ items }: CheckoutItemsProps) => {
  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Your Items
        </h2>
        <span className="text-xs font-bold text-blue-500">
          {items.length} Items
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="bg-[#151B28] rounded-3xl p-4 border border-white/5 flex gap-4"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-bold text-white text-sm line-clamp-1">
                {item.name}
              </h3>
              <p className="text-[10px] font-bold text-gray-500 mt-0.5">
                {item.color} • Size {item.size}
              </p>
              <span className="text-sm font-bold text-white mt-1">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckoutItems;
