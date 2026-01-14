import { Link } from "react-router-dom";
import NavLink from "@outshine/ui/Nav/NavLink.tsx";
import { CartIcon } from "@programmer-molor/my-icons";

const DesktopHeader = () => {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 font-[Poppins,sans-serif]">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black px-8 py-3 w-[1500px] shadow-[0_8px_32px_rgba(10,38,101,0.1)] flex items-center justify-between relative overflow-visible">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/outshine/home"
            className="text-xl font-bold text-[#0A2665] tracking-tight"
          >
            Outshine Store
          </Link>
          <div className="border-l border-slate-200 h-6 mx-2 opacity-50"></div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          <NavLink href="/outshine/home">Beranda</NavLink>
          <NavLink href="/outshine/product">Produk</NavLink>
          <NavLink href="/outshine/about-us">Tentang Kami</NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link
            to="/outshine/cart"
            className="relative p-2.5 rounded-xl text-[#0A2665] hover:bg-[#0A2665]/5 transition-all duration-300 group"
          >
            <CartIcon size={24} color="#0A2665" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#135BEC] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
