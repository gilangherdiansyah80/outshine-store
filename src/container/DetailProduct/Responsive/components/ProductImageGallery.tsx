import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { useWishlistStore } from "@outshine/store/wishlistStore";
import { useAuthStore } from "@outshine/store/authStore";

interface ProductImageGalleryProps {
  id: string;
  images: string[];
  title: string;
  price: number;
}

const ProductImageGallery = ({
  id,
  images,
  title,
  price,
}: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const isWishlisted = isInWishlist(id);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/outshine/welcome", { state: { from: location } });
      return;
    }

    toggleItem({
      id,
      name: title,
      price: price,
      image: images[0],
    });
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full aspect-3/4 max-h-[60vh] overflow-hidden">
      {/* Top Navigation Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 pt-6 bg-linear-to-b from-black/50 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleWishlist}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-out h-full w-full"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
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
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
