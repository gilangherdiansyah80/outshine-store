import useSWR from "swr";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number | string;
  isWishlisted?: boolean;
}

const USE_MOCK = true;

const mockWishlistData = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: [
    {
      id: "2",
      name: "Essential Box Tee",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
      isWishlisted: true,
    },
    {
      id: "5",
      name: "Cloud Knit Sweater",
      price: 110.0,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      isWishlisted: true,
    },
  ],
};

export const getWishlistsData = async (): Promise<WishlistItem[]> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockWishlistData.Data;
  } else {
    const response = await fetch("/api/wishlists/responsive");
    if (!response.ok) {
      throw new Error("Failed to fetch wishlists");
    }
    const result = await response.json();
    return result.Data || [];
  }
};

export const useGetWishLists = () => {
  const { data, error, isLoading } = useSWR<WishlistItem[]>(
    "/api/wishlists/responsive",
    getWishlistsData
  );

  return {
    wishlists: data,
    isLoading,
    isError: error,
  };
};
