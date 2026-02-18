import { Star } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface ReviewsSummaryWebProps {
  rating: number;
  reviewCount: number;
}

export default function ReviewsSummaryWeb({
  rating,
  reviewCount,
}: ReviewsSummaryWebProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8 flex flex-col items-center text-center h-full">
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">
          Peringkat Keseluruhan
        </h3>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-[#0F172A]">
              {rating.toFixed(1)}
            </span>
            <span className="text-xl text-gray-300 font-bold">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={cn(
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-100 fill-gray-100",
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 font-medium mt-4">
            Berdasarkan {reviewCount.toLocaleString()} ulasan pembeli
          </p>
        </div>
      </div>
    </div>
  );
}
