import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface CartBackendItem {
  cartId: string;
  productId: string;
  sizeId: string;
  quantity: number;
  productName: string;
  originalPrice: string;
  price: number;
  sizeName: string;
  productImage: string;
  totalPrice: number;
  formattedOriginalPrice: string;
  formattedPrice: string;
  formattedTotalPrice: string;
  activeDiscount?: {
    id: string;
    productId: string;
    type: string;
    value: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
}

export interface GetCartResponse {
  success: boolean;
  message: string;
  data: {
    cartId: string;
    items: CartBackendItem[];
    totalAmount: number;
    formattedTotalAmount: string;
  };
}

export const useGetCart = () => {
  const { data, error, isLoading, mutate } = useSWR<GetCartResponse>(
    "/api/v1/cart",
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    cartData: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
};
