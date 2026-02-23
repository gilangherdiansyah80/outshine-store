const AboutPhilosophyWeb = () => {
  return (
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
              hasil mencerminkan standar yang kami pegang teguh tanpa kompromi.
            </p>
            <p>
              Kami percaya, ketenangan bukan tanda kelemahan. Justru dari
              ketenangan itulah lahir presisi, ketajaman, dan karakter yang
              kuat. Outshine bukan untuk semua orang—ini untuk mereka yang
              mengerti nilai di balik proses, yang memilih diam namun berdampak.
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
  );
};

export default AboutPhilosophyWeb;
