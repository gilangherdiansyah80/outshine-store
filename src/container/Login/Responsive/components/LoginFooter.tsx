import { useNavigate } from "react-router-dom";

export const LoginFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center gap-4 text-gray-300">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Atau
        </span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <p className="text-sm font-medium text-gray-500">
        Belum punya akun?{" "}
        <button
          onClick={() => navigate("/outshine/register")}
          className="text-[#0F172A] font-bold hover:underline cursor-pointer"
        >
          Daftar Sekarang
        </button>
      </p>

      <div className="pt-2 italic text-xs text-gray-400">Happy Shopping!</div>
    </div>
  );
};
