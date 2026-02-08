import { CategoryProductList } from "../components";
import { ChevronLeftIcon } from "@programmer-molor/my-icons";
import {
  useResponsiveNavigation,
  useResponsiveRouteParams,
} from "@/hooks/use-responsive-navigation";
import { useFilterSortStore } from "@outshine/store/filterSortStore";

export default function CategoryScreen() {
  const { pop } = useResponsiveNavigation();
  const { categoryName } = useResponsiveRouteParams<{ categoryName: string }>();
  const { selectedCategories } = useFilterSortStore();

  // Format the title based on params or filter store
  const categoryTitle =
    categoryName ||
    (selectedCategories.length > 0
      ? selectedCategories[0]
      : "Category Products");

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Simple Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-4 flex items-center gap-4 border-b">
        <button
          onClick={() => pop()}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeftIcon size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{categoryTitle}</h1>
      </div>

      <div className="px-4 py-6">
        <CategoryProductList />
      </div>
    </div>
  );
}
