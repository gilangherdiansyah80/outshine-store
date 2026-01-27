import { LogIn } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="text-center">
      <div className="mx-auto h-20 w-20 bg-[#0F172A] rounded-3xl flex items-center justify-center shadow-lg transform -rotate-6">
        <LogIn size={40} className="text-white" />
      </div>
      <h2 className="mt-8 text-3xl font-extrabold text-[#0F172A] tracking-tight">
        Masuk Akun
      </h2>
      <p className="mt-3 text-sm text-gray-500 font-medium">
        Silakan masuk untuk melanjutkan pesanan Anda.
      </p>
    </div>
  );
};
