import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { usePostLogin } from "@/services/Auth/usePostLogin";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import { useNavigationActions } from "@/hooks/use-responsive-navigation";
import Alert from "@/components/Alert";

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { push } = useNavigationActions();
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

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await trigger(formData);

      if (result.success) {
        // Save tokens to store
        setToken({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });

        // Save user info to store
        setUser({
          isLoggedIn: true,
          id: result.data.user.id,
          name: result.data.user.fullName,
          email: result.data.user.email,
          ...result.data.user,
        });

        showAlert("Login Successful", "Selamat datang kembali!", "success");

        // Delay redirect to allow user to see success message
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        showAlert(
          "Login Failed",
          result.message || "Invalid email or password",
          "error",
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      showAlert(
        "System Error",
        "Terjadi kesalahan saat login. Silakan coba lagi.",
        "error",
      );
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F172A] transition-colors">
              <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#0F172A] focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              onClick={() => push("/forgot-password")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
              disabled={isLoading}
            >
              Lupa?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F172A] transition-colors">
              <Lock size={18} />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border-2 border-transparent focus:border-[#0F172A] focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F172A] transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Memproses...
            </>
          ) : (
            "Masuk Sekarang"
          )}
        </button>
      </form>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={closeAlert}
      />
    </>
  );
};
