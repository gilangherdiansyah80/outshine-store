import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface OrderItem {
  orderId: string;
  productId: string;
  sizeId: string;
  price: string;
  quantity: number;
  productName: string;
  sizeName: string;
  originalPrice: string;
  productImage: string;
  discountedPrice: number;
  formattedOriginalPrice: string;
  formattedDiscountedPrice: string;
}

export interface LatestPayment {
  id: string;
  orderId: string;
  provider: string;
  paymentType: string;
  transactionId: string | null;
  status: string;
  createdAt: string;
  amount: string;
  vaNumber: string | null;
  bank: string;
  transactionStatus: string;
  grossAmount: string | null;
  expiredAt: string;
  paymentCode: string | null;
  paymentPayload: unknown | null;
  paymentMethodName: string;
}

export interface AddressItem {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface OrderDetailData {
  id: string;
  userId: string;
  addressId: string;
  totalPrice: string;
  status: string;
  createdAt: string;
  paymentType: string;
  paidAmount: string;
  remainingAmount: string;
  items: OrderItem[];
  latestPayment: LatestPayment | null;
  address: AddressItem;
  formattedTotalPrice: string;
  formattedPaidAmount: string;
  formattedRemainingAmount: string;
}

export interface OrderDetailResponse {
  success: boolean;
  message: string;
  data: OrderDetailData;
}

export const useGetDetailOrder = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<OrderDetailResponse>(
    id ? `/api/v1/orders/${id}` : null,
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    order: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  };
};
