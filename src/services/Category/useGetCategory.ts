import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoryResponse {
  success: boolean;
  message: string;
  data: CategoryItem[];
}

export const useGetCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<GetCategoryResponse>(
    "/api/v1/categories",
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    data: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
