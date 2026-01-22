import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { useNavigationActions } from "@/hooks/use-responsive-navigation";
import { usePostForgotPassword } from "@/services/Auth/usePostForgotPassword";
import { usePostVerifyResetOTP } from "@/services/Auth/usePostVerifyResetOTP";
import { usePostResetPassword } from "@/services/Auth/usePostResetPassword";
import { OtpInput } from "@/container/Register/Responsive/components/OtpInput";
import Alert from "@/components/Alert";

type Step = "email" | "otp" | "new-password" | "success";

const ForgetPasswordScreen = () => {
  const { pop } = useNavigationActions();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Services
  const { trigger: forgotPassword, isLoading: isForgotLoading } =
    usePostForgotPassword();
  const { trigger: verifyOtp, isLoading: isVerifyLoading } =
    usePostVerifyResetOTP();
  const { trigger: resetPassword, isLoading: isResetLoading } =
    usePostResetPassword();

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await forgotPassword({ email });
      if (result.success) {
        showAlert("Success", "OTP telah dikirim ke email Anda.", "success");
        setStep("otp");
      } else {
        showAlert("Error", result.message || "Email tidak ditemukan", "error");
      }
    } catch (_error) {
      showAlert(
        "System Error",
        "Terjadi kesalahan. Silakan coba lagi.",
        "error",
      );
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      showAlert("Invalid OTP", "Silakan masukkan 6 digit OTP", "warning");
      return;
    }
    try {
      const result = await verifyOtp({ email, otp });
      if (result.success) {
        setStep("new-password");
      } else {
        showAlert(
          "Error",
          result.message || "OTP salah atau kadaluwarsa",
          "error",
        );
      }
    } catch (_error) {
      showAlert(
        "System Error",
        "Terjadi kesalahan. Silakan coba lagi.",
        "error",
      );
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showAlert("Password Too Short", "Password minimal 8 karakter", "warning");
      return;
    }
    try {
      const result = await resetPassword({ email, otp, newPassword });
      if (result.success) {
        setStep("success");
      } else {
        showAlert("Error", result.message || "Gagal mereset password", "error");
      }
    } catch (_error) {
      showAlert(
        "System Error",
        "Terjadi kesalahan. Silakan coba lagi.",
        "error",
      );
    }
  };

  const isLoading = isForgotLoading || isVerifyLoading || isResetLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 mt-4">
        <button
          onClick={() => pop()}
          className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-all active:scale-95"
          disabled={isLoading}
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-500">Pulihkan akses akun Anda</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl border border-gray-100 p-8">
          {step === "email" && (
            <form
              onSubmit={handleEmailSubmit}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Lupa Password?
                </h2>
                <p className="text-sm text-gray-500">
                  Masukkan email Anda untuk menerima kode OTP reset password.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Kirim OTP"
                )}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-6 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <KeyRound size={32} className="text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Verifikasi OTP
                </h2>
                <p className="text-sm text-gray-500">
                  Kode OTP telah dikirim ke{" "}
                  <span className="font-bold text-gray-900">{email}</span>
                </p>
              </div>

              <div className="py-2">
                <OtpInput onChange={setOtp} disabled={isLoading} />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Verifikasi OTP"
                )}
              </button>
            </form>
          )}

          {step === "new-password" && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Password Baru
                </h2>
                <p className="text-sm text-gray-500">
                  Buat password baru yang aman untuk akun Anda.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-12 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="space-y-8 text-center py-4">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2
                  size={48}
                  className="text-green-500 animate-bounce"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Password Diperbarui!
                </h2>
                <p className="text-sm text-gray-500">
                  Password Anda telah berhasil diubah. Silakan login kembali.
                </p>
              </div>
              <button
                onClick={() => pop()}
                className="w-full py-4 px-4 bg-[#0F172A] text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95"
              >
                Kembali ke Login
              </button>
            </div>
          )}
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

export default ForgetPasswordScreen;
