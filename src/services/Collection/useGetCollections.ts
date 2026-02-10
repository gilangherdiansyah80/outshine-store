import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface CollectionItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number | string;
  isNew?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: CollectionItem[];
  _count?: {
    products?: number;
  };
}

export interface CollectionResponse {
  success: boolean;
  message: string;
  data: Collection[];
}

const getCollections = async (url: string): Promise<CollectionResponse> => {
  const response = await fetcherOSStore.get(url);
  return response.data;
};

export const useGetCollections = () => {
  const { data, error, isLoading, mutate } = useSWR<CollectionResponse>(
    "/api/v1/collections",
    getCollections,
  );

  return {
    collections: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
