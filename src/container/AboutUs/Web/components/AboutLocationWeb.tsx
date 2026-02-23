import { MapPin, Navigation } from "lucide-react";

const AboutLocationWeb = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">
          Kunjungi Studio Kami
        </h3>
        <p className="text-slate-500">
          Temukan koleksi eksekusif kami langsung di pusat kreatif Jakarta.
        </p>
      </div>

      <div className="relative w-full h-[300px] rounded-3xl overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group">
          <div className="p-3 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform cursor-pointer">
            <MapPin className="w-8 h-8 text-white fill-current" />
          </div>
          <div className="px-4 py-2 bg-white rounded-xl shadow-xl mt-4 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-bold text-[#0F172A]">
              OUTSHINE Headquarters
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-white/60 font-medium tracking-wider uppercase">
                STUDIO LOCATION
              </p>
              <p className="text-sm font-bold text-white">
                Sudirman, Jakarta Selatan
              </p>
            </div>
          </div>
          <button className="p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors">
            <Navigation size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutLocationWeb;
