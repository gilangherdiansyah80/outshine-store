import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useAuthStore } from "@outshine/store/authStore";
import { usePostWishlists } from "@/services/WishLists/usePostWishlists";
import { useDeleteWishlists } from "@/services/WishLists/useDeleteWishlists";

interface ProductImageGalleryProps {
  id: string;
  images: string[];
  title: string;
  price: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ProductImageGallery = ({
  id,
  images,
  title,
  price,
  currentIndex,
  onIndexChange,
}: ProductImageGalleryProps) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const isWishlisted = isInWishlist(id);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextImage = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrevImage = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out ${title} on Outshine Store!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const { trigger: addToWishlist } = usePostWishlists();
  const { trigger: removeFromWishlist } = useDeleteWishlists();

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/outshine/welcome", { state: { from: location } });
      return;
    }

    if (isWishlisted) {
      removeFromWishlist({ productId: id });
    } else {
      addToWishlist({ productId: id });
    }

    toggleItem({
      id,
      name: title,
      price: price,
      image: images[0],
    });
  };

  return (
    <div className="relative w-full aspect-3/4 max-h-[60vh] overflow-hidden">
      {/* Top Navigation Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-sm py-3"
            : "bg-linear-to-b from-black/60 to-transparent pt-6 pb-4"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-full backdrop-blur-md transition-colors ${
            isScrolled
              ? "bg-transparent hover:bg-gray-100 text-slate-900"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isScrolled
                ? "bg-transparent hover:bg-gray-100 text-slate-900"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isScrolled
                ? "bg-transparent hover:bg-gray-100"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : isScrolled
                    ? "text-slate-900"
                    : "text-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-out h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} - View ${index + 1}`}
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Carousel Controls */}
      <div
        className="absolute inset-y-0 left-0 w-1/4 z-0"
        onClick={handlePrevImage}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/4 z-0"
        onClick={handleNextImage}
      />

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
