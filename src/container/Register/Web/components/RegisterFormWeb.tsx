import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { usePostRegister } from "@/services/Auth/usePostRegister";
import Alert from "@/components/Alert";

export default function RegisterFormWeb() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
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

  const { trigger, isLoading } = usePostRegister();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await trigger(formData);
      if (result.success) {
        // Navigate to OTP via sub-route, passing email in state
        navigate("/outshine/register/otp", {
          state: { email: formData.email },
        });
      } else {
        showAlert(
          "Pendaftaran Gagal",
          result.message || "Pastikan data yang diisi benar.",
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

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Sign Up
        </h1>
        <p className="text-gray-400 font-medium">
          Lengkapi data di bawah untuk mendaftar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Nama Lengkap
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2563EB] transition-colors">
              <User size={18} />
            </div>
            <input
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="block w-full pl-12 pr-4 py-4.5 bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl text-sm font-bold transition-all outline-none shadow-sm shadow-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Nomor Telepon
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2563EB] transition-colors">
              <Phone size={18} />
            </div>
            <input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="0812xxxx"
              className="block w-full pl-12 pr-4 py-4.5 bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl text-sm font-bold transition-all outline-none shadow-sm shadow-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Email
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
              placeholder="outshine@example.com"
              className="block w-full pl-12 pr-4 py-4.5 bg-white border-2 border-slate-100 focus:border-[#2563EB] rounded-2xl text-sm font-bold transition-all outline-none shadow-sm shadow-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Password
          </label>
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
              placeholder="Min. 8 characters"
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
              Daftar Sekarang
              <ArrowRight size={18} className="ml-2 opacity-50" />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-400">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/outshine/login")}
            className="text-[#2563EB] font-black hover:underline cursor-pointer"
          >
            Masuk di sini
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
