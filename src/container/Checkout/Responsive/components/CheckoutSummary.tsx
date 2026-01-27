import { formatIDR } from "@/lib/utils";

interface CheckoutSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
}

const CheckoutSummary = ({
  subtotal,
  discount,
  total,
}: CheckoutSummaryProps) => {
  return (
    <section className="bg-[#151B28] rounded-3xl p-6 border border-white/5 space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 font-bold">Price</span>
        <span className="text-white font-bold">{formatIDR(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-bold">Discount</span>
          <span className="text-green-500 font-bold">
            -{formatIDR(discount)}
          </span>
        </div>
      )}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 font-bold">Shipping</span>
        <span className="text-red-500 font-bold text-xs text-right">
          Harga Belum Termasuk Pengiriman
        </span>
      </div>
      <div className="h-px bg-white/5 my-2" />
      <div className="flex justify-between items-center">
        <span className="text-white font-extrabold text-xl">Total</span>
        <span className="text-blue-500 font-extrabold text-2xl tracking-tight">
          {formatIDR(total)}
        </span>
      </div>
    </section>
  );
};

export default CheckoutSummary;
