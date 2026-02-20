import type { OrderItem } from "@/services/Order/useGetDetailOrder";
import { formatIDR } from "@/lib/utils";

interface DetailItemsWebProps {
  items: OrderItem[];
  orderId: string;
}

export default function DetailItemsWeb({
  items,
  orderId,
}: DetailItemsWebProps) {
  // Use part of order ID as a dummy tracking number to match mockup
  const dummyResi = `JNE${orderId.replace(/[^0-9]/g, "").substring(0, 9)}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <h3 className="font-bold text-[#0F172A]">
          Daftar Produk ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </h3>
        <p className="text-sm font-bold text-slate-500">
          Resi: <span className="text-[#0F172A]">{dummyResi}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-6 items-start">
            <div className="w-24 h-24 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between h-24 py-1">
              <div>
                <h4 className="font-bold text-[#0F172A] text-base">
                  {item.productName}
                </h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  VARIAN: Hitam, SIZE {item.sizeName}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <p className="text-sm text-slate-500">
                  {item.quantity} x {formatIDR(Number(item.price))}
                </p>
                <p className="text-lg font-bold text-[#0F172A]">
                  {formatIDR(Number(item.price) * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
