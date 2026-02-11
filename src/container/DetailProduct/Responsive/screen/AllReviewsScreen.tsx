import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Image as ImageIcon } from "lucide-react";
import { useGetReviews } from "@/services/Reviews/useGetReviews";
import ReviewCard from "../components/ReviewCard";
import Loading from "@/components/Loader/Loading";
import { useState } from "react";
import ImagePreview from "@outshine/ui/Image/ImagePreview";
import type { ProductDetail } from "@/services/Products/useGetDetailProduct";

interface AllReviewsScreenProps {
  product?: ProductDetail;
}

const AllReviewsScreen = ({ product }: AllReviewsScreenProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, isLoading } = useGetReviews(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
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
        <div className="bg-white px-4 py-4 mb-2 flex items-center gap-4 border-b border-gray-50">
          <div className="flex flex-col items-center justify-center pr-4 border-r border-gray-100">
            <div className="text-2xl font-bold text-gray-900 leading-none">
              {averageRating.toFixed(1)}
              <span className="text-xs text-gray-500 font-normal ml-0.5">
                /5
              </span>
            </div>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              {reviewCount} Ulasan
            </div>
          </div>

          <div className="flex-1">
            {/* Filter tags could go here (e.g. "With Photo", "5 Stars") */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100 whitespace-nowrap">
                Semua
              </button>
              <button className="px-3 py-1.5 rounded-full bg-white text-gray-600 text-xs font-medium border border-gray-200 whitespace-nowrap hover:bg-gray-50">
                Dengan Foto
              </button>
              <button className="px-3 py-1.5 rounded-full bg-white text-gray-600 text-xs font-medium border border-gray-200 whitespace-nowrap hover:bg-gray-50 flex items-center gap-1">
                5 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="bg-white px-4 min-h-[50vh]">
          {reviews.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {reviews.map((review) => (
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
              <p className="text-sm">Belum ada ulasan untuk produk ini</p>
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
