import { CreditCard, History } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CheckoutPaymentTypeWebProps {
  isPo: boolean;
  poDpPercent: number;
  totalFull: number;
  selectedType: "full" | "dp";
  onSelect: (type: "full" | "dp") => void;
}

export default function CheckoutPaymentTypeWeb({
  isPo,
  poDpPercent,
  totalFull,
  selectedType,
  onSelect,
}: CheckoutPaymentTypeWebProps) {
  const dpAmount = (totalFull * poDpPercent) / 100;

  return (
    <div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
        Payment Type
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Full Payment */}
        <button
          onClick={() => onSelect("full")}
          className={cn(
            "relative p-5 rounded-2xl border-2 transition-all text-left cursor-pointer",
            selectedType === "full"
              ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200"
              : "bg-slate-50 border-slate-100 hover:border-slate-200 text-[#0F172A]",
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
              selectedType === "full"
                ? "bg-white/10"
                : "bg-white border-2 border-slate-100",
            )}
          >
            <CreditCard
              size={20}
              className={
                selectedType === "full" ? "text-white" : "text-slate-500"
              }
            />
          </div>
          <p
            className={cn(
              "font-black text-sm",
              selectedType === "full" ? "text-white" : "text-[#0F172A]",
            )}
          >
            Full Payment
          </p>
          <p
            className={cn(
              "text-[10px] font-bold mt-1 uppercase tracking-wider",
              selectedType === "full" ? "text-white/60" : "text-slate-400",
            )}
          >
            {formatIDR(totalFull)}
          </p>
        </button>

        {/* DP */}
        <button
          onClick={() => isPo && onSelect("dp")}
          disabled={!isPo}
          className={cn(
            "relative p-5 rounded-2xl border-2 transition-all text-left",
            selectedType === "dp"
              ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200 cursor-pointer"
              : "bg-slate-50 border-slate-100 hover:border-slate-200 text-[#0F172A]",
            !isPo
              ? "opacity-40 grayscale cursor-not-allowed"
              : "cursor-pointer",
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
              selectedType === "dp"
                ? "bg-white/10"
                : "bg-white border-2 border-slate-100",
            )}
          >
            <History
              size={20}
              className={
                selectedType === "dp" ? "text-white" : "text-slate-500"
              }
            />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <p
              className={cn(
                "font-black text-sm",
                selectedType === "dp" ? "text-white" : "text-[#0F172A]",
              )}
            >
              Down Payment
            </p>
            {isPo && (
              <span className="bg-blue-500/20 text-[#2563EB] text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                {poDpPercent}%
              </span>
            )}
          </div>
          <p
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              selectedType === "dp"
                ? "text-white/60"
                : isPo
                  ? "text-[#2563EB]"
                  : "text-slate-400",
            )}
          >
            {isPo ? `Pay Only: ${formatIDR(dpAmount)}` : "PO items only"}
          </p>
        </button>
      </div>
    </div>
  );
}
