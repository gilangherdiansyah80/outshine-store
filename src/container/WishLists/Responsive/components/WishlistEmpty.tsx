import { Link } from "react-router-dom";

const WishlistEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
      <div className="w-20 h-20 bg-[#1F2430] rounded-full flex items-center justify-center">
        <span className="text-3xl">💔</span>
      </div>
      <h3 className="text-xl font-bold">Your wishlist is empty</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Explore our collection and save your favorite items here properly.
      </p>
      <Link
        to="/outshine/products"
        className="mt-4 px-6 py-2.5 bg-blue-600 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/40 text-white"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default WishlistEmpty;
