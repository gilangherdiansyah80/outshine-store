import { useParams } from "react-router-dom";
import { ArrowLeft, Star, Image as ImageIcon } from "lucide-react";
import { useGetReviews } from "@/services/Reviews/useGetReviews";
import ReviewCard from "../components/ReviewCard";
import Loading from "@/components/Loader/Loading";
import { useState } from "react";
import ImagePreview from "@outshine/ui/Image/ImagePreview";
import type { ProductDetail } from "@/services/Products/useGetDetailProduct";
import { useResponsiveNavigation } from "@/hooks/use-responsive-navigation";

interface AllReviewsScreenProps {
  product?: ProductDetail;
}

const AllReviewsScreen = ({ product }: AllReviewsScreenProps) => {
  const { id } = useParams();
  const { pop } = useResponsiveNavigation();
  const { reviews, isLoading } = useGetReviews(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  // Calculate rating stats if not provided by product prop (fallback)
  const averageRating =
    product?.rating ??
    (reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0);

  const reviewCount = product?.reviewCount ?? reviews.length;

  const filteredReviews = selectedRating
    ? reviews.filter((r) => Math.round(r.rating) === selectedRating)
    : reviews;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <button
          onClick={() => pop()}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">
          Penilaian Produk
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Statistics Banner */}
        <div className="bg-white px-4 py-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>

          <div className="flex items-start gap-8">
            {/* Left: Average Rating */}
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#0B0F19] leading-none">
                {averageRating % 1 === 0
                  ? averageRating
                  : averageRating.toFixed(1)}
              </div>
              <div className="flex gap-1 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">{reviewCount} reviews</div>
            </div>

            {/* Right: Progress Bars */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(
                  (r) => Math.round(r.rating) === star,
                ).length;
                const percentage =
                  reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-3 font-medium text-gray-900">
                      {star}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-500 text-xs">
                      {percentage > 0 ? `${Math.round(percentage)}%` : "0%"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white px-4 py-4 mb-2 border-b border-gray-100">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                selectedRating === null
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Semua
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors whitespace-nowrap flex items-center gap-1 ${
                  selectedRating === star
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {star}{" "}
                <Star
                  className={`w-3 h-3 ${selectedRating === star ? "fill-black" : "fill-gray-400 text-gray-400"}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="bg-white px-4 min-h-[50vh]">
          {filteredReviews.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {filteredReviews.map((review) => (
                <div key={review.id} className="py-4">
                  <ReviewCard review={review} onImageClick={setSelectedImage} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm">
                Belum ada ulasan{" "}
                {selectedRating ? `dengan ${selectedRating} bintang ` : ""}untuk
                produk ini
              </p>
            </div>
          )}
        </div>
      </div>

      <ImagePreview
        src={selectedImage}
        onClose={() => setSelectedImage(null)}
        alt="Preview Ulasan"
      />
    </div>
  );
};

export default AllReviewsScreen;
