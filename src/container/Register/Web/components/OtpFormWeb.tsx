import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck, ArrowRight, RotateCcw } from "lucide-react";
import { usePostOTP } from "@/services/Auth/usePostOTP";
import Alert from "@/components/Alert";

export default function OtpFormWeb() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string } | null;
  const email = state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const { trigger } = usePostOTP();

  const handleInput = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info",
  ) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) return;

    setIsLoadingOTP(true);
    try {
      const result = await trigger({ email, otpCode });
      if (result.success) {
        showAlert(
          "Verifikasi Berhasil",
          "Akun Anda telah aktif. Silakan masuk.",
          "success",
        );
        setTimeout(() => navigate("/outshine/login"), 2000);
      } else {
        showAlert(
          "Verifikasi Gagal",
          result.message || "Kode OTP salah.",
          "error",
        );
      }
    } catch (_error) {
      showAlert("Error", "Terjadi kesalahan sistem.", "error");
    } finally {
      setIsLoadingOTP(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-[#2563EB] rounded-2xl mb-2">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Verifikasi OTP
        </h1>
        <p className="text-gray-400 font-medium">
          Kami telah mengirimkan kode 6-digit ke <br />
          <span className="text-[#0F172A] font-bold">{email}</span>
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-full h-16 text-center text-2xl font-black text-[#0F172A] bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl outline-none shadow-sm transition-all"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoadingOTP || otp.some((d) => !d)}
          className="w-full flex justify-center items-center py-5 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] disabled:opacity-30"
        >
          {isLoadingOTP ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Verifikasi Akun
              <ArrowRight size={18} className="ml-2 opacity-50" />
            </>
          )}
        </button>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-gray-400">
            Tidak menerima kode?
          </p>
          <button className="flex items-center gap-2 text-[#2563EB] font-black hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all cursor-pointer">
            <RotateCcw size={16} />
            Kirim Ulang Kode
          </button>
        </div>
      </div>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
