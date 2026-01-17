import Loading from "@/components/Loader/Loading";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistEmpty from "../components/WishlistEmpty";
import CardProduct from "@/components/Card/CardProduct";
import WishlistTabs from "../components/WishlistTabs";

const WishListsScreen = () => {
  const { items: wishlists } = useWishlistStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"items" | "collections">("items");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white pb-32 font-sans transition-colors duration-500">
      <WishlistTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        itemCount={wishlists?.length || 0}
      />

      {/* Content */}
      <div className="px-5 pt-8">
        {activeTab === "items" ? (
          wishlists && wishlists.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-24">
              {wishlists.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  imageSrc={product.image}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  isNew={product.isNew}
                  aspectRatio="portrait"
                  onClick={() => navigate(`/outshine/product/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <WishlistEmpty />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-sm font-medium">No collections created yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListsScreen;
