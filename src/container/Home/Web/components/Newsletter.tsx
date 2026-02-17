import { cn } from "@outshine/lib/utils";
import Button from "@outshine/ui/Button/Button";

const Newsletter = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "bg-[#EFF6FF] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3 max-w-lg text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-[#0F172A]">
          Bergabung dengan Newsletter Kami
        </h2>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Dapatkan update koleksi terbaru dan promo eksklusif langsung di email
          Anda.
        </p>
      </div>

      <div className="w-full max-w-md">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Alamat email Anda"
              className="flex-1 px-6 py-4 rounded-xl bg-white border border-transparent focus:border-[#2563EB] outline-none text-sm transition-all"
            />
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-200">
              Langganan
            </Button>
          </div>
          <p className="text-[10px] text-gray-400 text-center md:text-left">
            Dengan berlangganan, Anda menyetujui Kebijakan Privasi kami.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
