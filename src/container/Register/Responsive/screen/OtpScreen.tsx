import { useState } from "react";
import { Loader2 } from "lucide-react";
import { OtpHeader } from "../components/OtpHeader";
import { OtpInput } from "../components/OtpInput";
import {
  useNavigationActions,
  useResponsiveRouteParams,
} from "@/hooks/use-responsive-navigation";
import { usePostOTP } from "@/services/Auth/usePostOTP";
import Alert from "@/components/Alert";

const OtpScreen = () => {
  const [otp, setOtp] = useState("");
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

  const { email } = useResponsiveRouteParams<{ email: string }>();
  const { replace } = useNavigationActions();
  const { trigger, isLoading } = usePostOTP();

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      showAlert(
        "Input Invalid",
        "Silakan masukkan kode OTP lengkap (6 digit)",
        "warning",
      );
      return;
    }

    try {
      const result = await trigger({ email, otpCode: otp });

      if (result.success) {
        showAlert(
          "Verification Successful",
          "Anda telah berhasil memverifikasi akun. Silakan login.",
          "success",
        );
        // Delay redirect to allow user to see the success alert
        setTimeout(() => {
          replace("/outshine/login");
        }, 2000);
      } else {
        showAlert(
          "Verification Failed",
          result.message || "Kode OTP tidak valid",
          "error",
        );
      }
    } catch (error) {
      console.error("OTP Error:", error);
      showAlert(
        "System Error",
        "Terjadi kesalahan saat verifikasi OTP. Silakan coba lagi.",
        "error",
      );
    }
  };

  const handleResend = () => {
    showAlert("OTP Sent", "Kode baru telah dikirim ke email Anda.", "info");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-10 px-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 space-y-8">
        <OtpHeader />

        <div className="space-y-6">
          <OtpInput onChange={setOtp} disabled={isLoading} />

          <div className="text-center space-y-6">
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Memverifikasi...
                </>
              ) : (
                "Verifikasi Sekarang"
              )}
            </button>

            <p className="text-sm font-medium text-gray-500">
              Tidak menerima kode?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
                disabled={isLoading}
              >
                Kirim Ulang
              </button>
            </p>

            <div className="pt-2 italic text-xs text-gray-400">
              Hubungi Customer Service jika ada kendala.
            </div>
          </div>
        </div>
      </div>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={closeAlert}
      />
    </div>
  );
};

export default OtpScreen;
