import { CreditCard, QrCode, Wallet, type LucideIcon } from "lucide-react";
import { useGetPaymentMethod } from "@/services/Payment/useGetPaymentMethod";
import { cn } from "@/lib/utils";

interface PaymentMethodDisplay {
  code: string;
  name: string;
  type: "va" | "e-wallet" | "qris";
  icon: LucideIcon;
  description?: string;
}

const getPaymentMethodDisplay = (
  code: string,
  name: string,
): PaymentMethodDisplay => {
  const normalizedCode = code.toLowerCase();
  if (
    normalizedCode.includes("va") ||
    ["bca", "bni", "bri", "mandiri", "permata"].includes(normalizedCode)
  ) {
    return {
      code,
      name,
      type: "va",
      icon: CreditCard,
      description: `Virtual Account ${name.split(" ")[0]}`,
    };
  }
  if (normalizedCode === "qris") {
    return {
      code,
      name,
      type: "qris",
      icon: QrCode,
      description: "Scan QR Code with any payment app",
    };
  }
  return {
    code,
    name,
    type: "e-wallet",
    icon: Wallet,
    description: `Pay with ${name} mobile app`,
  };
};

interface PaymentMethodSelectorWebProps {
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

export default function PaymentMethodSelectorWeb({
  selectedCode,
  onSelect,
}: PaymentMethodSelectorWebProps) {
  const { paymentMethods, isLoading } = useGetPaymentMethod();
  const displayMethods = paymentMethods.map((m) =>
    getPaymentMethodDisplay(m.code, m.name),
  );

  return (
    <div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
        Payment Method
      </p>
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-full bg-slate-100 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {displayMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedCode === method.code;
            return (
              <button
                key={method.code}
                onClick={() => onSelect(method.code)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left cursor-pointer",
                  isSelected
                    ? "bg-blue-50 border-[#2563EB] shadow-lg shadow-blue-100"
                    : "bg-slate-50 border-slate-100 hover:border-slate-200",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "bg-white border-2 border-slate-100 text-slate-400",
                  )}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "font-black text-sm",
                      isSelected ? "text-[#2563EB]" : "text-[#0F172A]",
                    )}
                  >
                    {method.name}
                  </h3>
                  {method.description && (
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                      {method.description}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB]"
                      : "border-slate-200 bg-white",
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
