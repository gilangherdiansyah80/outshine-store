import { CheckCircle2, CreditCard } from "lucide-react";
import type { PaymentMethod } from "@/services/Checkout/useGetCheckout";

interface CheckoutPaymentProps {
  methods: PaymentMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CheckoutPayment = ({
  methods,
  selectedId,
  onSelect,
}: CheckoutPaymentProps) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
        Payment Method
      </h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`bg-[#151B28] rounded-3xl p-5 border transition-all cursor-pointer flex items-center justify-between ${
              selectedId === method.id
                ? "border-blue-500 bg-blue-500/5"
                : "border-white/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F2430] flex items-center justify-center text-gray-300">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-[15px]">
                  {method.name}
                </h3>
                {method.expiry && (
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Expires {method.expiry}
                  </p>
                )}
              </div>
            </div>
            {selectedId === method.id && (
              <CheckCircle2 size={22} className="text-blue-500" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckoutPayment;
