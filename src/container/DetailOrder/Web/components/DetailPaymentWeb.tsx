import { Receipt } from "lucide-react";
import type { OrderDetailData } from "@/services/Order/useGetDetailOrder";

interface DetailPaymentWebProps {
  order: OrderDetailData;
}

export default function DetailPaymentWeb({ order }: DetailPaymentWebProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-50 p-6 flex flex-col h-full">
      <h3 className="text-lg font-black text-[#0F172A] mb-6 flex items-center gap-2">
        <Receipt className="text-[#2563EB]" size={20} />
        Rincian Pembayaran
      </h3>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-500">Metode Pembayaran</span>
            <span className="text-[#0F172A] uppercase">
              {order.latestPayment?.paymentMethodName ||
                order.latestPayment?.bank ||
                "Transfer"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-500">Tipe Pembayaran</span>
            <span className="text-[#0F172A] uppercase">
              {order.paymentType}
            </span>
          </div>

          <div className="h-px w-full bg-slate-200 my-4" />

          {order.paymentType === "dp" && (
            <>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Sudah Dibayar (DP)</span>
                <span className="text-[#0F172A] font-bold">
                  {order.formattedPaidAmount}
                </span>
              </div>
            </>
          )}

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold">Total Belanja</span>
            <span className="text-xl font-black text-[#0F172A]">
              {order.formattedTotalPrice}
            </span>
          </div>
        </div>

        {order.paymentType === "dp" && (
          <div className="mt-6 pt-4 border-t-2 border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-[#0F172A] font-black">Sisa Tagihan</span>
              <span className="text-2xl font-black text-[#EE4D2D]">
                {order.formattedRemainingAmount}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1 text-right">
              Harap lunasi sisa tagihan ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
