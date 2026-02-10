import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface CollectionProduct {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string | number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isPo: boolean;
  poDpPercent: number;
  primaryImage: string;
}

export interface CollectionItemsResponse {
  success: boolean;
  message: string;
  data: CollectionProduct[];
}

const getCollectionItems = async (
  url: string,
): Promise<CollectionItemsResponse> => {
  const response = await fetcherOSStore.get(url);
  return response.data;
};

/**
 * Hook to fetch products within a collection
 * @param id The collection ID
 */
export const useGetItemCollection = (id: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<CollectionItemsResponse>(
    id ? `/api/v1/collections/${id}/products` : null,
    getCollectionItems,
  );

  return {
    items: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
