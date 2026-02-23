const AboutPhilosophyWeb = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 bg-[#0F172A]/10 border border-slate-100 rounded-full">
            <h3 className="text-xs font-bold text-[#0F172A] tracking-widest uppercase">
              Our Story
            </h3>
          </div>
          <h2 className="text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            Kualitas tidak perlu berisik untuk diakui.
          </h2>
          <div className="space-y-4">
            <p className="text-gray-500 leading-relaxed text-sm">
              Outshine lahir dari satu keyakinan sederhana: kualitas tidak perlu
              berisik untuk diakui.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Di tengah dunia yang sibuk mengejar tren, kami memilih jalur yang
              lebih sunyi dan fokus pada detail, proses, dan makna di balik
              setiap karya. Bagi kami, produk bukan sekadar barang, tapi
              perpanjangan dari identitas.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Setiap desain Outshine dibuat dengan intensi. Setiap proses
              dijalankan dengan kontrol. Dan setiap hasil mencerminkan standar
              yang kami pegang teguh.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Kami percaya, ketenangan bukan tanda kelemahan. Justru dari
              ketenangan itulah lahir presisi, ketajaman, dan karakter yang
              kuat.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Outshine bukan untuk semua orang. Ini untuk mereka yang mengerti
              nilai di balik proses, yang memilih diam namun berdampak, yang
              tidak butuh sorotan, karena kualitas akan berbicara sendiri.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Outshine. Tenang. Terkendali. Berbahaya dengan caranya sendiri.
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-50 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative aspect-[4/5] bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src="/images/model.jpeg"
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
