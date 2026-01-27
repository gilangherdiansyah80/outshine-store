import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface WishlistItem {
  addedAt: string;
  id: string;
  category: {
    id: string;
    name: string;
  };
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  formattedPrice: string;
  formattedDiscountedPrice: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isPo: boolean;
  poDpPercent: number;
  primaryImage: string;
  isWishlisted?: boolean;
  tags: {
    id: string;
    name: string;
  }[];
  discount?: {
    type: string;
    value: number;
    isActive: boolean;
    startDate: string;
    endDate: string;
  };
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  data: WishlistItem[];
}

const USE_MOCK = false;

const mockWishlistData: WishlistResponse = {
  success: true,
  message: "SUCCESS",
  data: [
    {
      id: "b472675d-00fb-490d-9422-39269a9fa6a4",
      name: "The Venoms",
      category: {
        id: "9fa53a9e-4a7a-4ac8-808a-5dd4743a1f7c",
        name: "Hoodie",
      },
      description: "Bahan cotton combed 20s, kini tersedia ukuran jumbo.",
      price: 145000,
      discountedPrice: 116000,
      formattedPrice: "Rp 145.000",
      formattedDiscountedPrice: "Rp 116.000",
      isActive: true,
      isPo: true,
      poDpPercent: 75,
      primaryImage:
        "https://uvetcjmswzqmhcwtkynx.supabase.co/storage/v1/object/public/user-content/products/b472675d-00fb-490d-9422-39269a9fa6a4/1768855635612-k7lvxs.jpg",
      tags: [
        {
          id: "ae9a2dab-1c1a-4d33-8b2d-90e39bc7e5f8",
          name: "New",
        },
      ],
      discount: {
        type: "percent",
        value: 20,
        isActive: true,
        startDate: "2026-01-01T00:00:00",
        endDate: "2027-12-31T00:00:00",
      },
      addedAt: "2026-01-24T11:31:03.395Z",
      createdAt: "2026-01-19T20:29:20.720Z",
      updatedAt: "2026-01-19T20:37:31.311Z",
    },
  ],
};

export const getWishlistsData = async (
  url: string,
): Promise<WishlistResponse> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockWishlistData;
  } else {
    const response = await fetcherOSStore.get(url);
    return response.data;
  }
};

export const useGetWishLists = () => {
  const { data, error, isLoading } = useSWR<WishlistResponse>(
    "/api/v1/wishlist",
    getWishlistsData,
  );

  return {
    wishlists: data?.data || [],
    isLoading,
    isError: error,
    message: data?.message,
    success: data?.success,
  };
};
