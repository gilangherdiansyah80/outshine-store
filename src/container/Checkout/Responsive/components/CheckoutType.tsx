import { formatIDR } from "@/lib/utils";
import { CreditCard, History } from "lucide-react";

interface CheckoutTypeProps {
  isPo: boolean;
  poDpPercent: number;
  totalFull: number;
  selectedType: "full" | "dp";
  onSelect: (type: "full" | "dp") => void;
}

const CheckoutType = ({
  isPo,
  poDpPercent,
  totalFull,
  selectedType,
  onSelect,
}: CheckoutTypeProps) => {
  const dpAmount = (totalFull * poDpPercent) / 100;

  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Payment Method Type
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Full Payment Option */}
        <button
          onClick={() => onSelect("full")}
          className={`relative p-4 rounded-3xl border transition-all text-left ${
            selectedType === "full"
              ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10"
              : "bg-[#151B28] border-white/5 hover:border-white/10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                selectedType === "full"
                  ? "bg-blue-600 text-white"
                  : "bg-[#1F2430] text-gray-400"
              }`}
            >
              <CreditCard size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-white text-sm">Full Payment</p>
                {selectedType === "full" && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
              <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-wider">
                Pay in full: {formatIDR(totalFull)}
              </p>
            </div>
          </div>
        </button>

        {/* DP Option */}
        <button
          onClick={() => isPo && onSelect("dp")}
          disabled={!isPo}
          className={`relative p-4 rounded-3xl border transition-all text-left ${
            selectedType === "dp"
              ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10"
              : "bg-[#151B28] border-white/5 hover:border-white/10"
          } ${!isPo ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                selectedType === "dp"
                  ? "bg-blue-600 text-white"
                  : "bg-[#1F2430] text-gray-400"
              }`}
            >
              <History size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white text-sm">
                    Down Payment (DP)
                  </p>
                  {isPo && (
                    <span className="bg-blue-500/20 text-blue-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {poDpPercent}%
                    </span>
                  )}
                </div>
                {selectedType === "dp" && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
              <p
                className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${
                  isPo ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {isPo
                  ? `Pay Only: ${formatIDR(dpAmount)}`
                  : "Available for PO only"}
              </p>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default CheckoutType;
