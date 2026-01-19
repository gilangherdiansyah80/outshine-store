import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  Copy,
  CheckCircle2,
  Clock,
  Upload,
  Info,
} from "lucide-react";
import Button from "@outshine/ui/Button/Button";
import { useState, useRef } from "react";
import BottomSheet from "@outshine/ui/BottomSheet/BottomSheet";
import { useGetPaymentDetails } from "@outshine/services/Checkout/useGetPaymentDetails";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, paymentMethod, address, shippingMethod, buyNowItem } =
    location.state || {
      total: 0,
      paymentMethod: null,
      address: null,
      shippingMethod: null,
      buyNowItem: null,
    };

  const details = useGetPaymentDetails(paymentMethod?.type, true);

  const [copied, setCopied] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if Native Share with file is supported
  const isNativeShareSupported = () => {
    if (!navigator.share || !navigator.canShare) return false;
    // Test with a dummy file to check file sharing support
    const testFile = new File(["test"], "test.png", { type: "image/png" });
    return navigator.canShare({ files: [testFile] });
  };

  // Formatting for currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSendWhatsApp = async () => {
    if (!selectedFile) return;

    setIsSharing(true);

    const productName = buyNowItem?.name || "Product Outshine";
    const productSize = buyNowItem?.size || "M";
    const addressStr = address
      ? `${address.street}, ${address.district}, ${address.city}`
      : "Alamat belum diatur";
    const shippingName = shippingMethod?.name || "Standard";
    const adminNumber = "+62 813-5374-168";

    // Caption message for sharing
    const message = `Kirim ke: ${adminNumber}\n\nHaii admin outshine. Saya telah melakukan pembayaran product ${productName} dengan size ${productSize}. Bisa dikirim ke alamat ${addressStr} dengan pengiriman ${shippingName}. Terimakasih`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/628135374168?text=${encodedMessage}`;

    // Native Share API - Automatically attaches the file
    if (isNativeShareSupported() && selectedFile) {
      try {
        await navigator.share({
          files: [selectedFile],
          title: "Bukti Pembayaran Outshine",
          text: message,
        });
        setIsSharing(false);
        setIsSheetOpen(false);
        // Reset state after successful share
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
        setIsSharing(false);
      }
    } else {
      // Fallback for desktop or unsupported browsers
      window.open(whatsappUrl, "_blank");
      setIsSharing(false);
      setIsSheetOpen(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(details.number.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col pb-32">
      {/* Header */}
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-[#0B0F19]/80 backdrop-blur-xl z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Payment Instructions</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 px-5 py-6 space-y-8">
        {/* Success Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="text-emerald-500" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Order Placed!</h2>
            <p className="text-gray-400 text-sm mt-1">
              Please complete your payment below
            </p>
          </div>
        </div>

        {/* Amount Section */}
        <div className="bg-[#151B28] rounded-[32px] p-6 border border-white/5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-2">
            Total Amount
          </p>
          <h3 className="text-3xl font-bold text-center text-blue-500">
            {formatCurrency(total)}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-bold text-amber-500 uppercase tracking-widest">
            <Clock size={12} />
            <span>Pay within 24 hours</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-[#151B28] rounded-[32px] p-6 border border-white/5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1F2430] flex items-center justify-center">
              {details.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {details.label}
              </p>
              <h4 className="text-xl font-bold text-white">{details.number}</h4>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <Copy size={18} />
            )}
            {copied ? "Copied!" : "Copy Number"}
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
            How to Pay
          </h2>
          <div className="space-y-3">
            {details.instructions.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-4 bg-[#151B28] rounded-2xl border border-white/5"
              >
                <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </span>
                <p className="text-[14px] text-gray-300 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-[#0B0F19]/80 backdrop-blur-xl border-t border-white/5 z-30">
        <Button
          onClick={() => setIsSheetOpen(true)}
          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl"
        >
          Check Status
        </Button>
      </footer>

      {/* Proof of Payment Bottom Sheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Payment Confirmation"
      >
        <div className="space-y-6">
          {/* Show different message based on Native Share support */}
          {isNativeShareSupported() ? (
            <div className="flex items-start gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-[24px]">
              <CheckCircle2
                className="text-emerald-500 shrink-0 mt-0.5"
                size={20}
              />
              <div className="space-y-1">
                <p className="text-emerald-500 text-[13px] font-bold uppercase tracking-wider">
                  SIAP KIRIM
                </p>
                <p className="text-gray-300 text-[13px] leading-relaxed font-medium">
                  Upload bukti pembayaran, lalu klik tombol{" "}
                  <span className="text-white font-bold">Kirim Konfirmasi</span>
                  . Pilih <span className="text-white font-bold">WhatsApp</span>{" "}
                  dari menu share untuk mengirim langsung ke admin.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-[24px]">
              <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <p className="text-amber-500 text-[13px] font-bold uppercase tracking-wider">
                  PENTING
                </p>
                <p className="text-gray-300 text-[13px] leading-relaxed font-medium">
                  Setelah WhatsApp terbuka, Anda{" "}
                  <span className="text-white font-bold">
                    WAJIB Mengeklik Ikon Klip (Lampiran)
                  </span>{" "}
                  di WhatsApp untuk mengirim foto bukti transfer yang barusan
                  Anda pilih.
                </p>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video rounded-[32px] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-gray-500">
                  Tap to upload receipt
                </p>
              </>
            )}
          </div>

          <Button
            onClick={handleSendWhatsApp}
            disabled={!selectedFile || isSharing}
            className={`w-full h-16 rounded-2xl font-bold flex gap-2 ${
              selectedFile && !isSharing
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/5 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isSharing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                {selectedFile && <CheckCircle2 size={20} />}
                Kirim Konfirmasi
              </>
            )}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default PaymentScreen;
