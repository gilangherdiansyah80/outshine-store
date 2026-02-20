import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  Navigation,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

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

export default function AboutUsWeb() {
  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <img
          src="/images/logo-text.jpg"
          alt="About Outshine"
          className="w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Premium Essentials
          </span>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-6">
            OUTSHINE
          </h1>
          <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed italic">
            "Tenang. Terkendali. Berbahaya dengan caranya sendiri."
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
        </div>
      </section>

      {/* Philosophy / Story Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                FILOSOFI KAMI
              </span>
            </div>
            <h2 className="text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
              Kualitas tidak perlu berisik untuk diakui.
            </h2>
            <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
              <p>
                Outshine lahir dari satu keyakinan sederhana: keunggulan sejati
                tidak membutuhkan validasi eksternal. Di tengah dunia yang sibuk
                mengejar tren sesaat, kami memilih jalur yang lebih sunyi—fokus
                pada detail, proses, dan makna di balik setiap karya.
              </p>
              <p>
                Bagi kami, produk bukan sekadar barang, tapi perpanjangan dari
                identitas. Setiap desain Outshine dibuat dengan intensi yang
                tajam. Setiap proses dijalankan dengan kontrol penuh. Dan setiap
                hasil mencerminkan standar yang kami pegang teguh tanpa
                kompromi.
              </p>
              <p>
                Kami percaya, ketenangan bukan tanda kelemahan. Justru dari
                ketenangan itulah lahir presisi, ketajaman, dan karakter yang
                kuat. Outshine bukan untuk semua orang—ini untuk mereka yang
                mengerti nilai di balik proses, yang memilih diam namun
                berdampak.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-50 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative aspect-[4/5] bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1974&auto=format&fit=crop"
                alt="Vision"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Location & Contact */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Location Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col gap-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">
                  Kunjungi Studio Kami
                </h3>
                <p className="text-slate-500">
                  Temukan koleksi eksklusif kami langsung di pusat kreatif
                  Jakarta.
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

            {/* Contact & Socials */}
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
                    Punya pertanyaan atau ingin berkolaborasi? Kami siap
                    mendengarkan.
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
                      <p className="text-sm font-bold text-white">
                        +62 813-5374-168
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-auto flex items-center justify-between relative z-10">
                  <div className="flex gap-4">
                    {[
                      {
                        icon: Instagram,
                        url: "https://www.instagram.com/outshineid/",
                        label: "Instagram",
                      },
                      {
                        icon: TikTokIcon,
                        url: "https://www.tiktok.com/@outshine.id",
                        label: "TikTok",
                      },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-all group/social"
                        title={social.label}
                      >
                        <social.icon
                          size={20}
                          className="group-hover/social:scale-110 transition-transform"
                        />
                      </a>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
                    Ikuti Perjalanan Kami <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aesthetic Quote section */}
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
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 flex items-center gap-3">
            LIHAT KOLEKSI <ExternalLink size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
