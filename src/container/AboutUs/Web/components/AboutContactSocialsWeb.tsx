import { Mail, Phone, Instagram, ArrowRight } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const AboutContactSocialsWeb = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#0F172A] rounded-[2.5rem] p-10 flex flex-col gap-8 flex-1 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
          <Mail size={200} />
        </div>

        <div className="space-y-4 relative z-10">
          <h3 className="text-3xl font-black text-white tracking-tight">
            Terhubung dengan Kami
          </h3>
          <p className="text-slate-400">
            Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengarkan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <a
            href="mailto:outshineid@gmail.com"
            className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-4 hover:border-blue-500/50 hover:bg-white/[0.08] transition-all group/card"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/card:bg-blue-500 group-hover/card:text-white transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-1">
                EMAIL US
              </p>
              <p className="text-sm font-bold text-white">
                outshineid@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/628135374168"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-4 hover:border-green-500/50 hover:bg-white/[0.08] transition-all group/card"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover/card:bg-green-500 group-hover/card:text-white transition-colors">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-1">
                WHATSAPP
              </p>
              <p className="text-sm font-bold text-white">+62 813-5374-168</p>
            </div>
          </a>
        </div>

        <div className="mt-auto flex items-center justify-between relative z-10">
          <div className="flex justify-center gap-2">
            {[
              {
                icon: Instagram,
                label: "Instagram",
                url: "https://www.instagram.com/outshineid/",
              },
              {
                icon: TikTokIcon,
                label: "TikTok",
                url: "https://www.tiktok.com/@outshine.id",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => window.open(item.url, "_blank")}
              >
                <div className="w-10 h-10 rounded-xl border bg-white border-[#0F172A] flex items-center justify-center hover:bg-white/50 transition-colors">
                  <item.icon className="w-6 h-6 text-[#0F172A] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] uppercase font-bold text-[#0F172A] tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
            Ikuti Perjalanan Kami <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutContactSocialsWeb;
