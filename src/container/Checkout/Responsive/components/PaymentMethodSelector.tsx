import { CreditCard, QrCode, Wallet, type LucideIcon } from "lucide-react";
import { useGetPaymentMethod } from "@/services/Payment/useGetPaymentMethod";

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

  // Default to e-wallet
  return {
    code,
    name,
    type: "e-wallet",
    icon: Wallet,
    description: `Pay with ${name} mobile app`,
  };
};

interface PaymentMethodSelectorProps {
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

const PaymentMethodSelector = ({
  selectedCode,
  onSelect,
}: PaymentMethodSelectorProps) => {
  const { paymentMethods, isLoading } = useGetPaymentMethod();

  const displayMethods = paymentMethods.map((method) =>
    getPaymentMethodDisplay(method.code, method.name),
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 w-full bg-white/5 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
        Payment Method
      </h2>
      <div className="space-y-3">
        {displayMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedCode === method.code;

          return (
            <button
              key={method.code}
              onClick={() => onSelect(method.code)}
              className={`w-full p-4 rounded-3xl border transition-all flex items-center gap-4 text-left ${
                isSelected
                  ? "bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-[#151B28] border-white/5 hover:border-white/10"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-[#1F2430] text-gray-400"
                }`}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">{method.name}</h3>
                {method.description && (
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    {method.description}
                  </p>
                )}
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-500"
                    : "border-white/10 bg-transparent"
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethodSelector;
