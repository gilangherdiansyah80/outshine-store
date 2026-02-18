import { Star, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import { useGetReviews } from "@outshine/services/Reviews/useGetReviews";

interface ReviewsWebProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

const ReviewsWeb = ({ productId, rating, reviewCount }: ReviewsWebProps) => {
  const { reviews, isLoading } = useGetReviews(productId);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm shadow-black">
      <div className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F172A] font-sans">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={cn(
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200",
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-[#0F172A] ml-2">
              {rating.toFixed(1)}{" "}
              <span className="text-gray-400 font-medium ml-1">
                based on {reviewCount} reviews
              </span>
            </span>
          </div>
        </div>

        <Link
          to={`/outshine/product/${productId}/reviews`}
          className="flex gap-x-1 items-center cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
        >
          <p className="text-sm font-bold text-[#2563EB]">Lihat Semua</p>
          <ChevronRight size={16} className="text-[#2563EB]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
        {isLoading ? (
          <div className="col-span-3 py-20 text-center text-gray-400">
            Loading reviews...
          </div>
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-[#2563EB]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200",
                      )}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-4 italic">
                  {review.comment}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {review.images.map((imageUrl, idx) => (
                  <img
                    key={idx}
                    src={imageUrl}
                    alt={`${review.userName} review photo ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-transform cursor-pointer"
                  />
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F1F5F9] text-[#2563EB] flex items-center justify-center font-black text-xs">
                      {review.userName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#0F172A]">
                    {review.userName}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-blue-500 font-bold">
                    <CheckCircle size={10} strokeWidth={3} />
                    {review.userEmail}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-16 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            No reviews have been submitted for this product yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsWeb;
