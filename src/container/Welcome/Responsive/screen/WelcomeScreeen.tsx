import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const WelcomeScreeen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center -mt-20 bg-gray-50 px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-[#0F172A] rounded-3xl flex items-center justify-center shadow-lg transform -rotate-6">
            <LogIn size={40} className="text-white" />
          </div>
          <h2 className="mt-8 text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Selamat Datang!
          </h2>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Silakan login untuk melanjutkan belanja Anda.
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/outshine/login")}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Masuk Sekarang
          </button>

          <button
            onClick={() => navigate("/outshine/register")}
            className="group relative w-full flex justify-center py-4 px-4 border-2 border-[#0F172A] cursor-pointer text-sm font-bold rounded-2xl text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all duration-300 active:scale-95"
          >
            Daftar Akun Baru
          </button>
        </div>

        <div className="pt-6 border-t border-gray-100 italic text-center text-xs text-gray-400">
          Happy Shopping!
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreeen;
