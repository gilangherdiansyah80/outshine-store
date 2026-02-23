import { ExternalLink } from "lucide-react";

const AboutQuoteWeb = () => {
  return (
    <section className="py-32 px-8 bg-white overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
        <span className="text-[20rem] font-black uppercase tracking-tighter">
          OUTSHINE
        </span>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
        <div className="w-16 h-px bg-slate-200" />
        <h4 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter italic leading-tight">
          "Bukan untuk semua orang. Hanya untuk mereka yang mengerti nilai di
          balik proses."
        </h4>
        <div className="w-16 h-px bg-slate-200" />
        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 flex items-center gap-3 cursor-pinter" onClick={() => window.location.href = "/outshine/products"}>
          LIHAT KOLEKSI <ExternalLink size={20} />
        </button>
      </div>
    </section>
  );
};

export default AboutQuoteWeb;
