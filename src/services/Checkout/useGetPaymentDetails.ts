import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface PaymentDetailItem {
  id: string;
  name: string;
  type: string;
  accountNumber?: string;
  icon?: string;
}

export interface GetPaymentDetailsResponse {
  success: boolean;
  message: string;
  data: PaymentDetailItem[];
}

export const useGetPaymentDetails = () => {
  const { data, error, isLoading, mutate } = useSWR<GetPaymentDetailsResponse>(
    "/api/v1/payment-details",
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    paymentDetails: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
