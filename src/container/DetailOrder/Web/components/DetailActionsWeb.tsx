import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  RefreshCcw,
  HandCoins,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";

interface DetailActionsWebProps {
  status: string;
}

export default function DetailActionsWeb({ status }: DetailActionsWebProps) {
  const navigate = useNavigate();
  const lowerStatus = status.toLowerCase();

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-50 p-6">
      <h3 className="text-lg font-black text-[#0F172A] mb-6 border-b-2 border-slate-50 pb-4">
        Aksi Pesanan
      </h3>

      <div className="flex flex-col gap-3">
        {lowerStatus === "completed" && (
          <>
            <button className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-[#2563EB] hover:text-[#2563EB] rounded-2xl text-sm font-black text-[#0F172A] transition-all flex justify-center items-center gap-2">
              <MessageSquare size={18} />
              Lihat Penilaian
            </button>
            <button className="w-full py-3.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2">
              <RefreshCcw size={18} />
              Beli Lagi
            </button>
          </>
        )}

        {(lowerStatus === "cancelled" || lowerStatus === "canceled") && (
          <button className="w-full py-3.5 bg-[#EE4D2D] hover:bg-red-600 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-red-200 hover:shadow-xl flex justify-center items-center gap-2">
            <RefreshCcw size={18} />
            Beli Lagi
          </button>
        )}

        {lowerStatus === "shipping" && (
          <button className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-emerald-200 hover:shadow-xl flex justify-center items-center gap-2">
            <CheckCircle2 size={18} />
            Pesanan Diterima
          </button>
        )}

        {lowerStatus === "processing" && (
          <button className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 text-[#0F172A] rounded-2xl text-sm font-black transition-all flex justify-center items-center gap-2">
            <MessageSquare size={18} />
            Hubungi Penjual
          </button>
        )}

        {(lowerStatus === "pending" || lowerStatus === "unpaid") && (
          <>
            <button className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-2xl text-sm font-black text-slate-500 transition-all">
              Batalkan Pesanan
            </button>
            <button className="w-full py-3.5 bg-[#EE4D2D] hover:bg-red-600 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2">
              <HandCoins size={18} />
              Bayar Sekarang
            </button>
          </>
        )}

        <button
          onClick={() => navigate("/outshine/orders")}
          className="w-full py-3.5 mt-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-2xl text-sm font-black transition-all flex justify-center items-center gap-2"
        >
          <ChevronLeft size={18} />
          Kembali ke Daftar Pesanan
        </button>
      </div>
    </div>
  );
}
