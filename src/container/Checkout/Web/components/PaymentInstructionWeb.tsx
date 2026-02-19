import { useState, useRef } from "react";
import {
  Copy,
  Clock,
  CheckCircle2,
  Upload,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatIDR } from "@/lib/utils";
import { postUploadPaymentProof } from "@/services/Payment/usePostProof";
import Alert from "@/components/Alert/Alert";

interface PaymentInstructionWebProps {
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

export default function PaymentInstructionWeb({
  orderData,
  onDone,
}: PaymentInstructionWebProps) {
  const navigate = useNavigate();
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
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setIsUploading(false);
    }
  };

  const instructions = payment.instructions || [];

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
        {/* Left: Confirmation & Upload */}
        <div className="space-y-6">
          {/* Success Header */}
          <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-50 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-500 mx-auto">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tighter">
                {uploadSuccess ? "Payment Proof Sent!" : "Awaiting Payment"}
              </h2>
              <p className="text-slate-400 font-medium text-sm mt-2 max-w-xs mx-auto">
                {uploadSuccess
                  ? "Thank you! Your payment is being verified by our team."
                  : "Please complete your payment before the deadline."}
              </p>
            </div>
            {/* Deadline */}
            <div className="flex items-center justify-center gap-2 py-3 px-6 bg-red-50 rounded-2xl border-2 border-red-100 w-fit mx-auto">
              <Clock size={16} className="text-red-400" />
              <span className="text-sm font-black text-red-500">
                Expire: {formatDate(payment.expiredAt)}
              </span>
            </div>
          </div>

          {/* Bank Account Info */}
          {payment?.bank && (
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 space-y-6">
              <div className="text-center">
                <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-[0.2em]">
                  {(payment.bank.name || "Transfer").toUpperCase()} Payment
                </span>
              </div>
              <div className="text-center space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Account Holder
                </p>
                <p className="font-black text-[#0F172A] text-lg uppercase">
                  {payment.bank.accountHolder}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 text-center space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Account Number
                </p>
                <p className="text-3xl font-black text-[#0F172A] tracking-[0.15em]">
                  {payment.bank.accountNumber}
                </p>
                <button
                  onClick={() => handleCopy(payment.bank.accountNumber)}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-100 text-slate-500 rounded-xl transition-all font-black text-xs uppercase tracking-widest cursor-pointer"
                >
                  <Copy size={14} />
                  {copied ? "Copied!" : "Copy Number"}
                </button>
              </div>
            </div>
          )}

          {/* Payment Instructions */}
          {instructions.length > 0 && (
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 space-y-5">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Payment Instructions
              </p>
              <div className="space-y-4">
                {instructions.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center shrink-0 text-[11px] font-black text-[#2563EB]">
                      {item.step}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pt-0.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Amount + Upload */}
        <div className="space-y-5 sticky top-10">
          {/* Total Amount */}
          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white space-y-4">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">
              Total Payment
            </p>
            <p className="text-4xl font-black tracking-tighter">
              {formatIDR(order.paidAmount || order.totalPrice || 0)}
            </p>
          </div>

          {/* Upload Proof */}
          {!uploadSuccess ? (
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 space-y-5">
              <div>
                <p className="font-black text-[#0F172A] text-lg">
                  Already Paid?
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Upload your transfer proof to speed up verification.
                </p>
              </div>
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
                className="w-full h-16 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 hover:border-[#0F172A] rounded-2xl flex items-center justify-center gap-3 font-black text-sm text-slate-500 hover:text-[#0F172A] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} /> Upload Transfer Proof
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest text-center">
                JPG, PNG (Max 2MB)
              </p>
            </div>
          ) : (
            <div className="bg-green-50 rounded-[2.5rem] p-8 border-2 border-green-100 text-center space-y-2">
              <CheckCircle2 size={32} className="text-green-500 mx-auto" />
              <p className="font-black text-green-700">Proof Uploaded!</p>
              <p className="text-sm text-green-600">
                We'll verify your payment shortly.
              </p>
            </div>
          )}

          {/* Done Button */}
          <button
            onClick={() => navigate("/outshine/orders")}
            className="w-full h-14 bg-white border-2 border-slate-100 hover:border-slate-200 text-[#0F172A] font-black rounded-2xl flex items-center justify-center gap-2 transition-all hover:shadow-md group cursor-pointer"
          >
            View My Orders
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      <Alert
        isOpen={showGroupAlert}
        title="Payment Proof Submitted!"
        message="Thank you! Your transfer proof has been received and is being verified. Join our WhatsApp group for updates."
        type="success"
        confirmText="Join Group"
        onConfirm={() => {
          if (groupLink) window.open(groupLink, "_blank");
          setShowGroupAlert(false);
          onDone();
        }}
        onCancel={() => {
          setShowGroupAlert(false);
          onDone();
        }}
        cancelText="Later"
      />
    </div>
  );
}
