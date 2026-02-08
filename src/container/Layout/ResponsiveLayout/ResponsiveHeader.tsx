import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "@outshine/store/cartStore";
import { useAuth } from "@/lib/auth";
import { useGetCart } from "@/services/Carts/useGetCart";
import { useEffect } from "react";

import Input from "@outshine/ui/Form/Input/Input";

import {
  SearchIcon,
  ChevronLeftIcon,
  CartIcon,
} from "@programmer-molor/my-icons";
import { useResponsiveNavigation } from "@outshine/hooks/use-responsive-navigation";
import { useSearchStore } from "@outshine/store/searchStore";

const ResponsiveHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pop, stack } = useResponsiveNavigation();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { items, setItems } = useCartStore();
  const { isLoggedIn } = useAuth();
  const { cartData } = useGetCart();

  // Sync cart items with store for count consistency
  useEffect(() => {
    if (isLoggedIn && cartData?.items) {
      const mappedItems = cartData.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.price,
        originalPrice: Number(item.originalPrice),
        formattedDiscounted: item.formattedPrice,
        formattedOriginal: item.formattedOriginalPrice,
        image: item.productImage,
        sizeId: item.sizeId,
        size: item.sizeName,
        color: "Standard",
        quantity: item.quantity,
      }));
      setItems(mappedItems);
    } else if (!isLoggedIn) {
      // Clear items if not logged in
      setItems([]);
    }
  }, [cartData, setItems, isLoggedIn]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleBack = () => {
    if (stack && stack.length > 1) {
      pop();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] px-4 py-3 shadow-md">
      <div className="flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-8 h-8 shrink-0 bg-white rounded-full flex items-center justify-center text-[#0F172A] shadow-sm hover:bg-gray-100 transition-colors"
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (value && !location.pathname.includes("/outshine/products")) {
                navigate("/outshine/products");
              }
            }}
            placeholder="Cari Produk"
            className="w-full bg-white rounded-lg py-2 pl-11 pr-10 text-sm outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-1">
          {/* Troli / Cart */}
          <Link
            to="/outshine/cart"
            className="flex flex-col items-center gap-[2px] relative"
          >
            <div className="text-white relative">
              <CartIcon size={24} color="#ffffff" />
              {isLoggedIn && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-white">Troli</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
