import { Copy, Clock, CheckCircle2, Upload, Loader2 } from "lucide-react";
import Button from "@outshine/ui/Button/Button";
import { useState, useRef } from "react";
import { formatIDR } from "@/lib/utils";
import { postUploadPaymentProof } from "@/services/Payment/usePostProof";
import Alert from "@/components/Alert/Alert";

interface PaymentInstructionProps {
  orderData: {
    order: {
      id: string;
      totalPrice: number;
      paidAmount: number;
      status: string;
    };
    payment: {
      paymentId: string;
      transactionId: string;
      amount: number;
      expiredAt: string;
      bank: {
        name: string;
        accountNumber: string;
        accountHolder: string;
      };
      instructions: {
        step: number;
        text: string;
      }[];
    };
  };
  onDone: () => void;
}

const PaymentInstruction = ({ orderData, onDone }: PaymentInstructionProps) => {
  const { order, payment } = orderData;
  const [copied, setCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [groupLink, setGroupLink] = useState<string | null>(null);
  const [showGroupAlert, setShowGroupAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await postUploadPaymentProof({
        orderId: order.id,
        paymentId: payment.paymentId,
        proof: file,
      });

      if (response.success) {
        setUploadSuccess(true);
        if (response.data.groupLink) {
          setGroupLink(response.data.groupLink);
          setShowGroupAlert(true);
        }
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const instructions = payment.instructions || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white">
      <main className="flex-1 px-5 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center space-y-3 pt-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">
              {uploadSuccess ? "Bukti Terkirim" : "Menunggu Pembayaran"}
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              {uploadSuccess
                ? "Terima kasih, pembayaran Anda sedang kami verifikasi."
                : "Mohon selesaikan pembayaran Anda sebelum batas waktu berakhir."}
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
              {formatIDR(order.paidAmount || order.totalPrice || 0)}
            </span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Batas Waktu
            </span>
            <div className="flex items-center gap-2 text-red-400">
              <Clock size={14} />
              <span className="text-xs font-bold uppercase transition-all">
                {formatDate(payment.expiredAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-[#151B28] rounded-[32px] p-8 border border-white/5 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
              {(payment?.bank?.name || "TRANSFER").toUpperCase()} PAYMENT
            </span>
          </div>

          {payment?.bank && (
            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Nama Pemilik Rekening
                </span>
                <div className="text-sm font-bold text-white uppercase">
                  {payment.bank.accountHolder}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 py-4 px-6 bg-[#0B0F19] rounded-2xl border border-white/5 relative group">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest absolute top-3 left-6">
                  Nomor Rekening
                </span>
                <span className="text-2xl font-black tracking-[0.2em] mt-4">
                  {payment.bank.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(payment.bank.accountNumber)}
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

          {/* Manual Instructions Section */}
          {instructions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">
                Instruksi Pembayaran
              </h4>
              <div className="space-y-3">
                {instructions.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-[10px] font-bold text-blue-400">
                      {item.step}
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed pt-0.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload Bukti Section */}
        {!uploadSuccess && (
          <div className="bg-[#151B28] rounded-[32px] p-6 border border-white/5 space-y-4">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Sudah Bayar?
            </h4>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-bold transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Bukti Transfer
                </>
              )}
            </button>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">
              Format: JPG, PNG (Maks. 2MB)
            </p>
          </div>
        )}
      </main>

      <div className="p-5 bg-linear-to-t from-[#0B0F19] via-[#0B0F19] to-transparent">
        <Button
          onClick={onDone}
          className="w-full h-14 bg-transparent border border-white/10 hover:border-white/20 text-white rounded-2xl font-bold transition-all"
        >
          {uploadSuccess
            ? "Lihat Status Pesanan"
            : "Kembali ke Halaman Pesanan"}
        </Button>
      </div>

      <Alert
        isOpen={showGroupAlert}
        title="Pembayaran Berhasil Diunggah!"
        message="Terima kasih! Bukti transfer Anda sudah kami terima dan sedang diverifikasi. Silakan bergabung ke grup WA untuk info lebih lanjut."
        type="success"
        confirmText="Gabung ke Grup"
        onConfirm={() => {
          if (groupLink) window.open(groupLink, "_blank");
          setShowGroupAlert(false);
          onDone();
        }}
        onCancel={() => {
          setShowGroupAlert(false);
          onDone();
        }}
        cancelText="Nanti Saja"
      />
    </div>
  );
};

export default PaymentInstruction;
