import { useNavigate } from "react-router-dom";

export const RegisterFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <p className="text-sm font-medium text-gray-500">
        Sudah punya akun?{" "}
        <button
          onClick={() => navigate("/outshine/login")}
          className="text-[#0F172A] font-bold hover:underline cursor-pointer"
        >
          Masuk Sekarang
        </button>
      </p>

      <div className="pt-2 italic text-xs text-gray-400">Happy Shopping!</div>
    </div>
  );
};
