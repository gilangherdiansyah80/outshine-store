import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all shadow-sm"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm",
                  currentPage === page
                    ? "bg-[#2563EB] text-white"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-[#2563EB] hover:text-[#2563EB]",
                )}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="text-gray-400 px-1">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all shadow-sm"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
