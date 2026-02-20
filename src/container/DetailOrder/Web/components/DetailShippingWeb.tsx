import { ArrowRight } from "lucide-react";

export default function DetailShippingWeb() {
  // Hardcoded tracking steps to match mockup design. In reality, these come from API
  const steps = [
    {
      status: "Pesanan telah diterima oleh Budi",
      date: "17 Aug 2023, 14:30 WIB",
      active: true,
    },
    {
      status: "Kurir sedang menuju lokasi alamat pengiriman",
      date: "17 Aug 2023, 10:15 WIB",
      active: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="font-bold text-[#0F172A] mb-5">Informasi Pengiriman</h3>

      <div className="relative border-l-2 border-slate-100 ml-2 space-y-6 pb-2">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-6">
            <div
              className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-4 ${
                step.active
                  ? "bg-blue-600 ring-blue-100"
                  : "bg-slate-300 ring-white"
              }`}
            />
            <p
              className={`text-sm ${
                step.active ? "font-bold text-[#0F172A]" : "text-slate-500"
              }`}
            >
              {step.status}
            </p>
            <p className="text-xs text-slate-400 mt-1">{step.date}</p>
          </div>
        ))}

        <div className="pl-6 pt-2">
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            Lihat Detail Pelacakan{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
