import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { usePostLogin } from "@/services/Auth/usePostLogin";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import Alert from "@/components/Alert";

export default function LoginFormWeb() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useTokenActions();
  const { setUser } = useUserActions();
  const { trigger, isLoading } = usePostLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const from = location.state?.from?.pathname || "/outshine/home";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await trigger(formData);
      if (result.success) {
        setToken({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
        setUser({
          isLoggedIn: true,
          id: result.data.user.id,
          name: result.data.user.fullName,
          email: result.data.user.email,
          ...result.data.user,
        });
        showAlert("Login Berhasil", "Selamat datang kembali!", "success");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        showAlert(
          "Login Gagal",
          result.message || "Email atau password salah.",
          "error",
        );
      }
    } catch (_error) {
      showAlert("System Error", "Terjadi kesalahan saat login.", "error");
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Welcome Back
        </h1>
        <p className="text-gray-400 font-medium">Silakan masuk ke akun Anda.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2563EB] transition-colors">
              <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="block w-full pl-12 pr-4 py-4.5 bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl text-sm font-bold transition-all outline-none shadow-sm shadow-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest hover:underline"
            >
              Lupa Password?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2563EB] transition-colors">
              <Lock size={18} />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full pl-12 pr-14 py-4.5 bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl text-sm font-bold transition-all outline-none shadow-sm shadow-slate-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-[#2563EB] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-5 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] mt-6 disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Masuk Sekarang
              <ArrowRight size={18} className="ml-2 opacity-50" />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-400">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/outshine/register")}
            className="text-[#2563EB] font-black hover:underline cursor-pointer"
          >
            Daftar di sini
          </button>
        </p>
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
