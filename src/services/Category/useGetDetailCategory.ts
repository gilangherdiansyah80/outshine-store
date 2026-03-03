import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";
import type { ProductItem } from "../Products/useGetProducts";

// API Response Interfaces for Category Detail
interface APICategory {
  id: string;
  name: string;
}

interface APITag {
  id: string;
  name: string;
}

interface APIPricing {
  original: number;
  discounted: number;
  formattedOriginal: string;
  formattedDiscounted: string;
}

interface APIRating {
  averageRating: number;
  totalReview: number;
}

interface APIProduct {
  id: string;
  name: string;
  description: string;
  category: APICategory;
  basePrice: number;
  isActive: boolean;
  isPo: boolean;
  poDpPercent: number;
  primaryImage: string;
  tags: APITag[];
  discount: { type: string; value: number } | null;
  pricing: APIPricing;
  rating: APIRating;
  createdAt: string;
  isNew: boolean;
  isTrending: boolean;
}

interface CategoryDetailData {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  products: APIProduct[];
}

export interface CategoryDetailResponse {
  success: boolean;
  message: string;
  data: CategoryDetailData;
}

// Map API product to frontend ProductItem (shared logic with useGetProducts)
const mapAPIProductToProductItem = (apiProduct: APIProduct): ProductItem => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.pricing?.discounted ?? apiProduct.basePrice,
    originalPrice: apiProduct.discount
      ? apiProduct.pricing?.original
      : undefined,
    image: apiProduct.primaryImage,
    isNew:
      apiProduct.isNew ||
      apiProduct.tags?.some((tag) => tag.name.toLowerCase() === "new"),
    discount:
      apiProduct.discount?.type === "percent"
        ? apiProduct.discount.value
        : undefined,
    category: apiProduct.category?.name ?? "Uncategorized",
    rating: apiProduct.rating?.averageRating ?? 0,
    totalReview: apiProduct.rating?.totalReview ?? 0,
    isPo: apiProduct.isPo,
    poDpPercent: apiProduct.poDpPercent,
    tags: apiProduct.tags,
    formattedPrice: apiProduct.pricing?.formattedDiscounted,
    formattedOriginalPrice: apiProduct.pricing?.formattedOriginal,
    // Default values for compatibility
    sizes: [],
    colors: [],
    isWishlisted: false,
  };
};

export const useGetDetailCategory = (categoryId: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<CategoryDetailResponse>(
    categoryId ? `/api/v1/categories/${categoryId}` : null,
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const mappedProducts: ProductItem[] =
    data?.data?.products?.map(mapAPIProductToProductItem) || [];

  return {
    category: data?.data
      ? {
          id: data.data.id,
          name: data.data.name,
          imageUrl: data.data.imageUrl,
        }
      : null,
    products: mappedProducts,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
