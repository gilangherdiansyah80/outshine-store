import { PackageX } from "lucide-react";
import OrderCardWeb, { type OrderCardWebProps } from "./OrderCardWeb";

interface OrderListProps {
  orders: OrderCardWebProps["order"][];
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 p-16 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <PackageX size={48} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-black text-[#0F172A]">Belum Ada Pesanan</h3>
        <p className="text-slate-400 mt-2 max-w-sm">
          Anda belum memiliki pesanan dengan status ini. Mari temukan produk
          impian Anda!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-6 w-full">
        {orders.map((order) => (
          <OrderCardWeb key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
