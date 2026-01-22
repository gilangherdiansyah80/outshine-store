export const OtpFooter = () => {
  return (
    <div className="text-center space-y-6">
      <button
        onClick={() => alert("Verifikasi Berhasil!")}
        className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer text-sm font-bold rounded-2xl text-white bg-[#0F172A] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95"
      >
        Verifikasi Sekarang
      </button>

      <p className="text-sm font-medium text-gray-500">
        Tidak menerima kode?{" "}
        <button
          onClick={() => alert("Kode dikirim ulang!")}
          className="text-blue-600 font-bold hover:underline cursor-pointer"
        >
          Kirim Ulang
        </button>
      </p>

      <div className="pt-2 italic text-xs text-gray-400">
        Hubungi Customer Service jika ada kendala.
      </div>
    </div>
  );
};
