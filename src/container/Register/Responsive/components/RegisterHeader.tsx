import { UserPlus } from "lucide-react";

export const RegisterHeader = () => {
  return (
    <div className="text-center">
      <div className="mx-auto h-20 w-20 bg-[#0F172A] rounded-3xl flex items-center justify-center shadow-lg transform rotate-6">
        <UserPlus size={40} className="text-white" />
      </div>
      <h2 className="mt-8 text-3xl font-extrabold text-[#0F172A] tracking-tight">
        Daftar Akun Baru
      </h2>
      <p className="mt-3 text-sm text-gray-500 font-medium">
        Lengkapi data diri Anda untuk bergabung.
      </p>
    </div>
  );
};
