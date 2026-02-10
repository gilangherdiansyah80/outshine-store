import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

// Product Detail Interface used by UI
export interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  userAvatar: string;
  images: string[];
}

export interface ProductSize {
  id: string;
  name: string;
  stock: number;
}

export interface ProductSpec {
  id: string;
  key: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  formattedDiscounted?: string;
  originalPrice?: number;
  formattedOriginal?: string;
  rating: number;
  reviewCount: number;
  ratingDistribution?: Record<string, number>;
  reviews?: ReviewItem[];
  images: string[];
  sizes: ProductSize[];
  description: string;
  fabricAndCare: string;
  deliveryAndReturns: string;
  sustainabilityImpact: string;
  specs: ProductSpec[];
  tags?: Array<{ id: string; name: string }>;
  isPo?: boolean;
  poDpPercent?: number;
  discount?: number;
  totalBuyers: number;
}

// API Response Interfaces
interface APISize {
  id: string;
  name: string;
  stock: number;
}

interface APIImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

interface APITag {
  id: string;
  name: string;
}

interface APIDiscount {
  type: string;
  value: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface APIPricing {
  original: number;
  discounted: number;
  formattedOriginal: string;
  formattedDiscounted: string;
}

interface APIRating {
  average: number;
  count: number;
  distribution: Record<string, number>;
}

interface APIPo {
  dpPercent: number;
  dpAmount: number;
  remainingAmount: number;
}

interface APICategory {
  id: string;
  name: string;
}

interface APIDetailProduct {
  id: string;
  name: string;
  description: string;
  category: APICategory;
  basePrice: number;
  isActive: boolean;
  isPo: boolean;
  poDpPercent: number;
  tags: APITag[];
  discount: APIDiscount | null;
  pricing: APIPricing;
  rating: APIRating;
  createdAt: string;
  po: APIPo | null;
  images: APIImage[];
  sizes: APISize[];
  specs: ProductSpec[];
  reviews: {
    items: ReviewItem[]; // Define properly if needed
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
  sizeGuide: {
    imageUrl: string;
    description: string;
  };
  wishlist: {
    isWishlisted: boolean;
  };
  collection: {
    canAdd: boolean;
  };
  totalBuyers: number;
  updatedAt: string;
}

interface DetailProductResponse {
  success: boolean;
  message: string;
  data: APIDetailProduct;
}

const USE_MOCK = false;

// Default Static Content
const defaultStaticContent = {
  fabricAndCare:
    "Crafted from 100% organic cotton (280GSM). This heavyweight tee is pre-shrunk and features a luxurious carbon finish for a soft-touch hand feel.",
  deliveryAndReturns: "Free delivery on orders over $50. 30-day return policy.",
  sustainabilityImpact:
    "Made with 100% organic cotton. Reduced water consumption in production.",
};

const mapAPIDetailToProductDetail = (
  apiProduct: APIDetailProduct,
): ProductDetail => {
  return {
    id: apiProduct.id,
    title: apiProduct.name,
    price: apiProduct.pricing?.discounted ?? apiProduct.basePrice,
    formattedDiscounted: apiProduct.pricing?.formattedDiscounted,
    originalPrice: apiProduct.discount
      ? apiProduct.pricing?.original
      : undefined,
    formattedOriginal: apiProduct.pricing?.formattedOriginal,
    rating: apiProduct.rating?.average ?? 0,
    reviewCount: apiProduct.rating?.count ?? 0,
    ratingDistribution: apiProduct.rating?.distribution,
    reviews: apiProduct.reviews?.items || [],
    // Map Array of objects to Array of URL strings
    images: apiProduct.images?.map((img) => img.url) || [],
    // Map Array of objects
    sizes: apiProduct.sizes || [],
    description: apiProduct.description || "",
    specs: Array.isArray(apiProduct.specs) ? apiProduct.specs : [],
    ...defaultStaticContent,
    isPo: apiProduct.isPo,
    poDpPercent: apiProduct.poDpPercent,
    discount:
      apiProduct.discount?.type === "percent"
        ? apiProduct.discount.value
        : undefined,
    totalBuyers: apiProduct.totalBuyers,
  };
};

export const getDetailProductData = async (
  id?: string,
): Promise<ProductDetail> => {
  if (USE_MOCK) {
    // Should not reach here if USE_MOCK is false, but keeping structure valid
    throw new Error("Mock not implemented for new structure");
  }

  if (!id) throw new Error("Product ID is required");

  // Fetch from API
  const response = await fetcherOSStore.get<DetailProductResponse>(
    `/api/v1/products/${id}`,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch product");
  }

  // DEBUG LOGS
  console.log("Raw API Review Data:", response.data.data.reviews);
  if (response.data.data.reviews?.items) {
    console.log(
      "Review Items Length:",
      response.data.data.reviews.items.length,
    );
  }

  return mapAPIDetailToProductDetail(response.data.data);
};

export const useGetDetailProduct = (id?: string) => {
  const { data, error, isLoading } = useSWR<ProductDetail>(
    id ? `/api/v1/products/${id}` : null,
    () => getDetailProductData(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
};
