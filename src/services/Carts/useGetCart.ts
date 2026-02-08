import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";
import { useAuth } from "@/lib/auth";

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
  const { isLoggedIn } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<GetCartResponse>(
    isLoggedIn ? "/api/v1/cart" : null,
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    cartData: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
};
