import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPaymentDetails } from "@outshine/services/Checkout/useGetPaymentDetails";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import Loading from "@/components/Loader/Loading";

const PaymentScreen = () => {
  const { paymentDetails, isLoading } = useGetPaymentDetails();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentDetails) {
      console.log("Available methods:", paymentDetails);
    }
  }, [paymentDetails]);

  if (isLoading) {
    return <Loading />;
  }

  // Fixing the types for hypothetical map
  const steps = ["Select Method", "Review", "Confirm"];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Payment</h1>

        {/* Example of typed map to fix implicit any error mentioned by user */}
        <div className="flex justify-between mb-8">
          {steps.map((step: string, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-[#0F172A] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">{step}</span>
            </div>
          ))}
        </div>

        <PaymentMethodSelector
          selectedCode={selectedMethod}
          onSelect={setSelectedMethod}
        />

        <div className="mt-8">
          <button
            disabled={!selectedMethod}
            onClick={() => navigate("/outshine/checkout/confirm")}
            className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
