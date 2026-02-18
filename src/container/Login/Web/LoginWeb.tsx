import LoginFormWeb from "@/container/Login/Web/components/LoginFormWeb";

export default function LoginWeb() {
  return (
    <div className="h-screen flex w-full">
      {/* Visual Side: Left (Consistent with Welcome/Register) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/welcome.png"
            alt="OUTSHINE Fashion"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#0F172A]/70 via-[#0F172A]/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0F172A]/20 to-[#0F172A]/80" />
        </div>

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
              Selamat <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300">
                Datang Kembali
              </span>{" "}
              <br />
              Sahabat OUTSHINE.
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Masuk untuk melanjutkan pengalaman belanja terbaik Anda dan pantau
              orderan Anda secara real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Action Side: Right */}
      <div className="w-full lg:w-1/2 bg-[#F8FAFC] flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-md w-full py-12">
          <LoginFormWeb />
        </div>
      </div>
    </div>
  );
}
