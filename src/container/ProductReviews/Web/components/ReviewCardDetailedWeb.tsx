import { Star, CheckCircle, ThumbsUp, MessageCircle } from "lucide-react";
import { cn } from "@outshine/lib/utils";
import type { Review } from "@outshine/services/Reviews/useGetReviews";

interface ReviewCardDetailedWebProps {
  review: Review;
}

export default function ReviewCardDetailedWeb({
  review,
}: ReviewCardDetailedWebProps) {
  // Helper to format "2 jam yang lalu", "Kemarin", etc.
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    if (diffInHours < 48) return "Kemarin";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-[#2563EB]">
      {/* Header: User Info & Timestamp */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] text-[#2563EB] flex items-center justify-center font-black text-sm shadow-sm overflow-hidden">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              review.userName
                .split(" ")
                .map((n) => n[0])
                .join("")
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[#0F172A]">
              {review.userName}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#2563EB] font-bold uppercase tracking-wider">
              <CheckCircle size={12} strokeWidth={3} />
              PEMBELI TERVERIFIKASI
            </div>
          </div>
        </div>
        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
          {formatDate(review.createdAt)}
        </span>
      </div>

      {/* Content: Rating & Comment */}
      <div className="space-y-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-100 fill-gray-100",
              )}
            />
          ))}
        </div>

        <h4 className="text-lg font-black text-[#0F172A] leading-tight font-sans">
          {review.rating >= 4
            ? "Performa luar biasa, pengiriman kilat!"
            : "Review Produk"}
        </h4>

        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          {review.comment}
        </p>

        {/* User Photos */}
        {review.images && review.images.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {review.images.map((imageUrl, idx) => (
              <div
                key={idx}
                className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-sm group cursor-pointer"
              >
                <img
                  src={imageUrl}
                  alt={`Review photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Interactions */}
      <div className="flex items-center gap-8 pt-2 border-t border-gray-50 mt-2">
        <button className="flex items-center gap-2 text-[11px] font-black text-gray-400 hover:text-[#2563EB] transition-colors group">
          <ThumbsUp
            size={16}
            className="group-active:scale-90 transition-transform"
          />
          Membantu (12)
        </button>
        <button className="flex items-center gap-2 text-[11px] font-black text-gray-400 hover:text-[#0F172A] transition-colors">
          <MessageCircle size={16} />
          Balas
        </button>
      </div>
    </div>
  );
}
