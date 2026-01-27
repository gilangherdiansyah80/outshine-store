import { Copy, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import Button from "@outshine/ui/Button/Button";
import { useState } from "react";
import { formatIDR } from "@/lib/utils";

interface PaymentInstructionProps {
  orderData: {
    order: {
      id: string;
      totalPrice: number;
      expiredAt: string;
    };
    payment: {
      method: string;
      vaNumber?: string;
      bankName?: string;
      qrUrl?: string;
      deepLink?: string;
    };
  };
  onDone: () => void;
}

const PaymentInstruction = ({ orderData, onDone }: PaymentInstructionProps) => {
  const { order, payment } = orderData;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white">
      <main className="flex-1 px-5 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center space-y-3 pt-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">
              Menunggu Pembayaran
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Mohon selesaikan pembayaran Anda sebelum batas waktu berakhir.
            </p>
          </div>
        </div>

        {/* Amount Section */}
        <div className="bg-[#151B28] rounded-[32px] p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Total Bayar
            </span>
            <span className="text-2xl font-black text-white">
              {formatIDR(order.totalPrice || 0)}
            </span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Batas Waktu
            </span>
            <div className="flex items-center gap-2 text-red-400">
              <Clock size={14} />
              <span className="text-xs font-bold uppercase">
                {formatDate(order.expiredAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-[#151B28] rounded-[32px] p-8 border border-white/5 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
              {(payment?.method || "").toUpperCase()} PAYMENT
            </span>
          </div>

          {payment.vaNumber && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 py-4 px-6 bg-[#0B0F19] rounded-2xl border border-white/5 relative group">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest absolute top-3 left-6">
                  Virtual Account
                </span>
                <span className="text-2xl font-black tracking-[0.2em] mt-4">
                  {payment.vaNumber}
                </span>
                <button
                  onClick={() => handleCopy(payment.vaNumber!)}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-[#1F2430] hover:bg-[#2A3040] text-gray-400 rounded-xl transition-all"
                >
                  <Copy size={16} />
                  <span className="font-bold text-xs uppercase tracking-widest">
                    {copied ? "Berhasil Disalin" : "Salin Nomor"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {payment.qrUrl && (
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <img
                  src={payment.qrUrl}
                  alt="Payment QR"
                  className="w-56 h-56"
                />
              </div>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-center">
                Scan QR Code di atas menggunakan aplikasi pembayaran Anda
              </p>
            </div>
          )}

          {payment.deepLink && (
            <div className="space-y-4">
              <a
                href={payment.deepLink}
                target="_blank"
                rel="noreferrer"
                className="w-full h-16 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20"
              >
                Bayar Sekarang
                <ExternalLink size={20} />
              </a>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">
                Link akan membuka aplikasi pembayaran Anda secara otomatis
              </p>
            </div>
          )}
        </div>
      </main>

      <div className="p-5 bg-linear-to-t from-[#0B0F19] via-[#0B0F19] to-transparent">
        <Button
          onClick={onDone}
          className="w-full h-14 bg-transparent border border-white/10 hover:border-white/20 text-white rounded-2xl font-bold transition-all"
        >
          Kembali ke Halaman Pesanan
        </Button>
      </div>
    </div>
  );
};

export default PaymentInstruction;
