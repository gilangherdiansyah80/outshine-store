import { ShieldCheck, Lock } from "lucide-react";

const CheckoutFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-6 bg-[#0B0F19]/80 backdrop-blur-xl border-t border-white/5 z-30">
      <button className="w-full h-16 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20">
        <ShieldCheck size={24} />
        Place Order
      </button>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[2px] text-center mt-4 opacity-50 flex items-center justify-center gap-1.5">
        <Lock size={10} />
        Secure 256-bit SSL Encrypted Payment
      </p>
    </footer>
  );
};

export default CheckoutFooter;
