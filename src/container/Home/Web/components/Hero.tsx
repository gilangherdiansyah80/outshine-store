import { useNavigate } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import Button from "@outshine/ui/Button/Button";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden",
        className,
      )}
    >
      {/* Left Image Part */}
      <div className="relative aspect-4/3 md:aspect-auto overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"
          alt="Hero Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-widest">
          Koleksi 2024
        </div>
      </div>

      {/* Right Content Part */}
      <div className="flex flex-col justify-center p-8 md:p-16 gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.1]">
            Eksplorasi
            <br />
            Gaya Baru
            <br />
            Anda
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Tingkatkan gaya hidup Anda dengan koleksi eksklusif kami. Penawaran
            terbatas untuk produk elektronik premium dan fashion terkini.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/outshine/products")}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200"
          >
            Belanja Sekarang
          </Button>
          <Button
            onClick={() => navigate("/outshine/products")}
            className="bg-gray-50 hover:bg-gray-100 text-[#0F172A] font-bold py-3 px-8 rounded-xl transition-all"
          >
            Lihat Katalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
