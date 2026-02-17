import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Share2, Globe } from "lucide-react";

const DesktopFooter = () => {
  return (
    <footer className="bg-white text-[#0F172A] pt-16 pb-12 font-[Inter,sans-serif] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & About Section */}
          <div className="flex flex-col gap-6">
            <Link to="/outshine/home" className="flex items-center gap-2 group">
              <div className="w-20 h-20 rounded bg-black flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                OUTSHINE
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Destinasi belanja online terpercaya untuk segala kebutuhan gaya
              hidup modern Anda. Kualitas terbaik, harga bersaing.
            </p>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-[#2563EB] hover:text-white transition-all shadow-sm">
                <Share2 size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-[#2563EB] hover:text-white transition-all shadow-sm">
                <Globe size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-base">Belanja</h4>
            <div className="flex flex-col gap-3">
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Semua Kategori
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Produk Unggulan
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Penawaran Hari Ini
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Voucher Belanja
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-base">Layanan Pelanggan</h4>
            <div className="flex flex-col gap-3">
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Pusat Bantuan
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Cara Pembelian
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Pengiriman & Pengembalian
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-[#2563EB] transition-colors text-sm font-medium"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-base">Hubungi Kami</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 group">
                <div className="text-[#2563EB] shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-gray-500 text-sm font-medium truncate">
                  outshineid@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="text-[#2563EB] shrink-0">
                  <Phone size={18} />
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  +62 21 1234 5678
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="text-[#2563EB] shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  Sidoarjo, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-medium">
            © 2026 OUTSHINE. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-8 h-4 bg-[#0F172A] rounded-sm"></div>
            <div className="w-8 h-4 bg-[#2563EB] rounded-sm"></div>
            <div className="w-8 h-4 bg-gray-200 rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
