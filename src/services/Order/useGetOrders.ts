import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface SubOrderItemBackend {
  productId: string;
  productName: string;
  sizeName: string;
  quantity: number;
  price: number;
  productImage: string;
  formattedPrice: string;
}

export interface OrderItemBackend {
  id: string;
  userId: string;
  addressId: string;
  totalPrice: string;
  status: string;
  createdAt: string;
  paymentType: string;
  paidAmount: string;
  remainingAmount: string;
  totalItems: string;
  items: SubOrderItemBackend[];
  formattedTotalPrice: string;
  formattedPaidAmount: string;
  formattedRemainingAmount: string;
}

export interface GetOrdersResponse {
  success: boolean;
  message: string;
  data: OrderItemBackend[];
}

export const useGetOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<GetOrdersResponse>(
    "/api/v1/orders",
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    orders: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
