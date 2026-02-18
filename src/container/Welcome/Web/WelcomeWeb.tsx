import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

export default function WelcomeWeb() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex w-full">
      {/* Visual Side: Left */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F172A]">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/welcome.png"
            alt="OUTSHINE Fashion"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradients to blend and improve aesthetics */}
          <div className="absolute inset-0 bg-linear-to-tr from-[#0F172A]/70 via-[#0F172A]/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0F172A]/20 to-[#0F172A]/80" />
        </div>

        {/* Brand Overlay */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div>
            <div className="h-14 w-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-black text-2xl tracking-tighter italic">
                OUTSHINE
              </span>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <h2 className="text-6xl font-black text-white leading-tight font-sans tracking-tight">
              Definisikan <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300">
                Gaya Minimalis
              </span>{" "}
              <br />
              Bersama Kami.
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Temukan koleksi eksklusif yang menggabungkan kenyamanan maksimal
              dengan estetika modern yang tak lekang oleh waktu.
            </p>
          </div>
        </div>
      </div>

      {/* Action Side: Right */}
      <div className="w-full lg:w-1/2 bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#2563EB] font-black uppercase tracking-[0.2em] text-xs">
              <span className="h-[2px] w-8 bg-[#2563EB]"></span>
              <span>AUTHENTICATION GATEWAY</span>
            </div>
            <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">
              Selamat Datang!
            </h1>
            <p className="text-gray-400 font-medium leading-relaxed">
              Bergabunglah dengan komunitas fashion kami untuk pengalaman
              belanja yang lebih personal dan akses ke penawaran eksklusif.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <button
              onClick={() => navigate("/outshine/login")}
              className="group relative flex items-center justify-between py-5 px-8 rounded-2xl bg-[#0F172A] text-white font-bold transition-all duration-300 hover:bg-slate-800 shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
                  <LogIn size={20} />
                </div>
                <span>Masuk Sekarang</span>
              </div>
              <ArrowRight
                size={20}
                className="text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => navigate("/outshine/register")}
              className="group relative flex items-center justify-between py-5 px-8 rounded-2xl bg-white border-2 border-slate-100 text-[#0F172A] font-bold transition-all duration-300 hover:border-[#2563EB]/20 hover:bg-[#F1F5F9] shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <UserPlus size={20} className="text-[#2563EB]" />
                </div>
                <span>Daftar Akun Baru</span>
              </div>
              <ArrowRight
                size={20}
                className="text-[#0F172A]/10 group-hover:text-[#0F172A] transition-all transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              EST. 2024 • PREMIUM ESSENTIALS
            </span>
            <span className="text-[10px] italic font-medium text-slate-400">
              Happy Shopping!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
