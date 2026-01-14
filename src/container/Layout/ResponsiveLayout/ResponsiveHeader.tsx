import { Link, useNavigate } from "react-router-dom";
import Input from "@outshine/ui/Form/Input/Input.tsx";
import {
  SearchIcon,
  ChevronLeftIcon,
  CartIcon,
} from "@programmer-molor/my-icons";
import { useResponsiveNavigation } from "@outshine/hooks/use-responsive-navigation.ts";
import { useSearchStore } from "@outshine/store/searchStore.ts";

const ResponsiveHeader = () => {
  const navigate = useNavigate();
  const { pop, stack } = useResponsiveNavigation();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const handleBack = () => {
    if (stack && stack.length > 1) {
      pop();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A2665] px-4 py-3 shadow-md">
      <div className="flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-8 h-8 shrink-0 bg-white rounded-full flex items-center justify-center text-[#0A2665] shadow-sm hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon size={22} color="#0A2665" />
        </button>
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            <SearchIcon size={22} color="#0A2665" />
          </div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Cari Produk"
            className="w-full bg-white rounded-lg py-2 pl-11 pr-10 text-sm outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-1">
          {/* Troli / Cart */}
          <Link
            to="/outshine/cart"
            className="flex flex-col items-center gap-[2px]"
          >
            <div className="text-white">
              <CartIcon size={24} color="#ffffff" />
            </div>
            <span className="text-[11px] font-medium text-white">Troli</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
