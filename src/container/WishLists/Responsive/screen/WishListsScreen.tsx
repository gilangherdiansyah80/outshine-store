import Loading from "@/components/Loader/Loading";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistEmpty from "../components/WishlistEmpty";
import CardWishlist from "../components/CardWishlist";
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
            <div className="flex flex-col gap-8">
              {wishlists.map((product) => (
                <CardWishlist
                  key={product.id}
                  id={product.id}
                  imageSrc={product.image}
                  name={product.name}
                  category={product.category || "ESSENTIAL WEAR"}
                  price={product.price}
                  inStock={true}
                  onAddToCart={() => {}}
                  onClick={() => navigate(`/outshine/products/${product.id}`)}
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
