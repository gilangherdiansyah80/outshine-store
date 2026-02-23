import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLink from "@outshine/ui/Nav/NavLink.tsx";
import { Search, Heart, User, ShoppingCart } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import { useSearchStore } from "@outshine/store/searchStore";
import { useAuth } from "@/lib/auth";

const DesktopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { isLoggedIn } = useAuth();
  const { items } = useCartStore();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value && !location.pathname.includes("/outshine/products")) {
      navigate("/outshine/products");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-[Inter,sans-serif]">
      {/* Top Bar */}
      <div className="bg-[#0F172A] text-white py-2 text-center text-sm font-semibold tracking-wide">
        Gratis ongkir untuk seluruh pesanan di atas Rp 500.000! 🚚
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm py-3 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/outshine/home"
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              OUTSHINE
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari gadget, fashion, atau perlengkapan rumah..."
              className="w-full bg-[#F1F5F9] rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none border-transparent focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
            />
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <NavLink
                href="/outshine/home"
                className="text-sm font-medium text-[#2563EB]"
              >
                Beranda
              </NavLink>
              <NavLink
                href="/outshine/products"
                className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition-colors"
              >
                Katalog
              </NavLink>
              <NavLink
                href="/outshine/about-us"
                className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition-colors"
              >
                Tentang Kami
              </NavLink>
            </nav>

            <div className="flex items-center gap-5 border-l border-gray-200 pl-8">
              <Link
                to="/outshine/wishlist"
                className="text-gray-600 hover:text-[#2563EB] transition-colors"
              >
                <Heart size={24} />
              </Link>

              <Link
                to="/outshine/cart"
                className="relative text-gray-600 hover:text-[#2563EB] transition-colors"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#2563EB] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to={isLoggedIn ? "/outshine/profile" : "/outshine/welcome"}
                className="text-gray-600 hover:text-[#2563EB] transition-colors"
              >
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
