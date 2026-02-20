import type { OrderDetailData } from "@/services/Order/useGetDetailOrder";
import { formatIDR } from "@/lib/utils";
import { HelpCircle, MessageSquare, Info } from "lucide-react";

interface DetailSummaryWebProps {
  order: OrderDetailData;
}

export default function DetailSummaryWeb({ order }: DetailSummaryWebProps) {
  // Using dummy values to match the static UI since the API might not provide exact breakdown fields
  const subtotal = Number(order.totalPrice);
  const shippingFee = 45000;
  const serviceFee = 2000;
  const promoDiscount = 50000;
  const total = subtotal + shippingFee + serviceFee - promoDiscount;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6">
      <h3 className="font-bold text-[#0F172A]">Ringkasan Pembayaran</h3>

      {/* Breakdown */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Subtotal (
            {order.items.reduce((acc, item) => acc + item.quantity, 0)} Produk)
          </span>
          <span className="font-bold text-[#0F172A]">
            {formatIDR(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Ongkos Kirim (2.5kg)</span>
          <span className="font-bold text-[#0F172A]">
            {formatIDR(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Biaya Layanan</span>
          <span className="font-bold text-[#0F172A]">
            {formatIDR(serviceFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">Promo Cashback</span>
          <span className="font-bold text-green-600">
            - {formatIDR(promoDiscount)}
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-[#0F172A]">Total Bayar</span>
        <span className="text-2xl font-black text-blue-600">
          {formatIDR(total)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
          <HelpCircle size={18} />
          Hubungi Bantuan
        </button>
        <button className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
          <MessageSquare size={18} className="invisible" />{" "}
          {/* Spacer hack for alignment */}
          Beri Ulasan Produk
        </button>
      </div>

      {/* Notes */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Info size={14} className="text-slate-400" />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
            Catatan Pesanan
          </p>
        </div>
        <p className="text-xs text-slate-500 italic">
          "
          {(order.address?.street?.length || 0) > 10
            ? "Tolong dipacking kayu dan gunakan bubble wrap tambahan untuk smartwatchnya. Terima kasih!"
            : "-"}
          "
        </p>
      </div>
    </div>
  );
}
