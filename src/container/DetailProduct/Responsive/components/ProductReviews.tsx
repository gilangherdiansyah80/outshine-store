import { useState } from "react";
import { Star, User, ChevronRight } from "lucide-react";
import ImagePreview from "@outshine/ui/Image/ImagePreview";
import type { ReviewItem } from "@/services/Products/useGetDetailProduct";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  ratingDistribution?: Record<string, number>;
  reviews?: ReviewItem[];
}

const ProductReviews = ({
  rating,
  reviewCount,
  reviews = [],
}: ProductReviewsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Take first few images for the showcase
  // const showcaseImages = reviews.flatMap((r) => r.images).slice(0, 3);

  return (
    <div className="bg-white" title={`Rating: ${rating}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-50">
        <section className="flex items-center gap-1">
          <h2 className="text-sm font-medium text-gray-900">{rating}</h2>
          <Star className={`w-3 h-3 text-yellow-400 fill-yellow-400`} />
          <h3 className="text-sm font-medium text-gray-900">
            Penilaian Produk ({reviewCount > 1000 ? "1,1RB" : reviewCount})
          </h3>
        </section>
        <div className="flex items-center gap-1 text-xs text-[#0B0F19]">
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Rating Summary Box */}
        {/* <div className="bg-gray-50/50 rounded-lg p-3 space-y-2 border border-blue-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-gray-900">
              Rangkuman Penilaian
            </span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-[11px] text-gray-600 leading-normal">
            Gasing ini memiliki desain yang keren dan mirip dengan aslinya.
            Bahan besi yang digunakan kuat dan tahan adu. Spin track dan
            bottomnya mungkin sedikit berbeda, tapi tetap bagus.
          </p>
        </div> */}

        {/* Showcase Images */}
        {/* <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {showcaseImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-gray-100"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt="Showcase"
                className="w-full h-full object-cover"
              />
              {idx === 2 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold">
                  +249
                </div>
              )}
            </div>
          ))}
        </div> */}

        {/* Search Bar */}
        {/* <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-3 h-3 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari ulasan"
            className="w-full h-8 pl-8 pr-4 bg-gray-50 border border-gray-100 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div> */}

        {/* Individual Reviews */}
        <div className="space-y-6 pt-2">
          {reviews.slice(0, 2).map((review) => (
            <div
              key={review.id}
              className="space-y-2 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    {review.userAvatar ? (
                      <img
                        src={review.userAvatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User size={14} className="text-gray-400" />
                    )}
                  </div>
                  <span className="text-xs text-gray-700 font-medium">
                    {review.user.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span>{review.createdAt.slice(0, 10)}</span>
                  {/* Thumb icon mock if needed */}
                </div>
              </div>

              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-2.5 h-2.5 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* <div className="text-[10px] text-gray-400">
                Variasi: BEY ONLY MF 48, BEY ONLY MF 106
              </div> */}

              <p className="text-xs text-gray-800 leading-relaxed">
                {review.comment}
              </p>

              {review.images.length > 0 && (
                <div className="flex gap-1 pt-1">
                  {review.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(image)}
                      className="w-16 h-16 rounded overflow-hidden shrink-0 bg-gray-50 border border-gray-100"
                    >
                      <img
                        src={image}
                        alt="Review"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        {/* <button className="w-full py-3 flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4" />
        </button> */}
      </div>

      <ImagePreview
        src={selectedImage}
        onClose={() => setSelectedImage(null)}
        alt="Review preview"
      />
    </div>
  );
};

export default ProductReviews;
