import { useState, useRef } from "react";
import { cn } from "@outshine/lib/utils";
import {
  useGetCategory,
  type CategoryItem,
} from "@/services/Category/useGetCategory";

interface CategoryChipsProps {
  onCategorySelect?: (category: CategoryItem | null) => void;
  className?: string;
}

/**
 * Horizontal scrollable category chips
 */
const CategoryChips = ({ onCategorySelect, className }: CategoryChipsProps) => {
  const { data: categories, isLoading } = useGetCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: CategoryItem) => {
    const newSelected = selectedCategory === category.id ? null : category.id;
    setSelectedCategory(newSelected);
    onCategorySelect?.(newSelected ? category : null);
  };

  if (isLoading) {
    return (
      <div className={cn("flex gap-3 overflow-x-auto py-2", className)}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-20 rounded-full bg-gray-200 animate-pulse shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex gap-3 overflow-x-auto py-2 scrollbar-hide",
        className,
      )}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            "shrink-0 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer",
            "border border-gray-300",
            selectedCategory === category.id
              ? "bg-[#0F172A] text-white border-[#0F172A]"
              : "bg-white text-gray-800 hover:bg-gray-100",
          )}
        >
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-10 h-10 object-cover"
          />
          <h1>{category.name}</h1>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
