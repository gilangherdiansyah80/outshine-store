import { Link } from "react-router-dom";
import NavLink from "@outshine/ui/Nav/NavLink.tsx";
import { CartIcon } from "@programmer-molor/my-icons";

const DesktopHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 font-[Poppins,sans-serif] bg-[#0F172A]">
      <div className="flex items-center justify-between relative overflow-visible w-3/5">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/outshine/home"
            className="text-xl font-bold text-white tracking-tight"
          >
            Outshine Store
          </Link>
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
            className="relative p-2.5 rounded-xl text-white hover:bg-white/5 transition-all duration-300 group"
          >
            <CartIcon size={24} color="white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
