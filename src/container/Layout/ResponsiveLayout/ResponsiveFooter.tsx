import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UserIcon } from "@programmer-molor/my-icons";
import { ShoppingBagIcon, InfoIcon } from "lucide-react";
import Image from "@outshine/ui/Image/Image.tsx";

const ResponsiveFooter = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 pb-safe pointer-events-none">
      <div className="relative h-16 flex items-center pointer-events-auto">
        {/* Wavy Background SVG */}
        <div className="absolute bottom-0 left-0 w-full h-[80px] z-0 overflow-visible">
          <svg
            viewBox="0 0 375 80"
            className="w-full h-full fill-white drop-shadow-[0_-10px_25px_rgba(0,0,0,0.08)]"
            preserveAspectRatio="none"
          >
            <path d="M0 80H375V0H245C225 0 220 40 187.5 40C155 40 150 0 130 0H0V80Z" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full flex items-center h-full">
          {/* Left Nav */}
          <div className="flex-1 flex items-center justify-around pr-6">
            <Link
              to="/outshine/home"
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300`}
            >
              <div
                className={`transition-colors cursor-pointer ${
                  isActive("/outshine/home")
                    ? "text-[#FF6B35]"
                    : "text-gray-400"
                }`}
              >
                <HomeIcon size={24} />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[11px] font-semibold transition-colors ${
                    isActive("/outshine/home")
                      ? "text-[#FF6B35]"
                      : "text-gray-500"
                  }`}
                >
                  Beranda
                </span>
              </div>
            </Link>
            <Link
              to="/outshine/product"
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300`}
            >
              <div
                className={`transition-colors ${
                  isActive("/outshine/product")
                    ? "text-[#FF6B35]"
                    : "text-gray-400"
                }`}
              >
                <ShoppingBagIcon
                  size={24}
                  strokeWidth={isActive("/outshine/product") ? 2.5 : 2}
                />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[11px] font-semibold transition-colors ${
                    isActive("/outshine/product")
                      ? "text-[#FF6B35]"
                      : "text-gray-500"
                  }`}
                >
                  Produk
                </span>
              </div>
            </Link>
          </div>

          {/* Center FAB Space Holder */}
          <div className="w-16 h-full flex items-center justify-center">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="bg-[#0A2665] rounded-full p-2 h-20 w-20 flex -mt-2 justify-center items-center shadow-lg border-4 border-white">
                  <Image
                    src="/images/logo.png"
                    alt="Outshine Store"
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Nav */}
          <div className="flex-1 flex items-center justify-around pl-6">
            <Link
              to="/outshine/about-us"
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300`}
            >
              <div
                className={`transition-colors ${
                  isActive("/outshine/about-us")
                    ? "text-[#FF6B35]"
                    : "text-gray-400"
                }`}
              >
                <InfoIcon size={24} />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[11px] font-semibold transition-colors ${
                    isActive("/outshine/about-us")
                      ? "text-[#FF6B35]"
                      : "text-gray-500"
                  }`}
                >
                  Tentang Kami
                </span>
              </div>
            </Link>
            <Link
              to="/outshine/profile"
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300`}
            >
              <div
                className={`transition-colors ${
                  isActive("/outshine/profile")
                    ? "text-[#FF6B35]"
                    : "text-gray-400"
                }`}
              >
                <UserIcon size={24} />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[11px] font-semibold transition-colors ${
                    isActive("/outshine/profile")
                      ? "text-[#FF6B35]"
                      : "text-gray-500"
                  }`}
                >
                  Profil
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
