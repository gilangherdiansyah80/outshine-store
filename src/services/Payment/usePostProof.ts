import { fetcherOSStore } from "@/lib/axios";

export interface PostProofPayload {
  proof: File;
  orderId: string;
  paymentId: string;
}

export interface PostProofResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    orderId: string;
    paymentId: string;
    proofUrl: string;
    note: string | null;
    status: string;
    uploadedAt: string;
    verifiedAt: string | null;
    groupLink: string;
    groupLinks: {
      product: string;
      link: string;
    }[];
  };
}

export const postUploadPaymentProof = async (
  payload: PostProofPayload,
): Promise<PostProofResponse> => {
  const formData = new FormData();
  formData.append("proof", payload.proof);
  formData.append("orderId", payload.orderId);
  formData.append("paymentId", payload.paymentId);

  const response = await fetcherOSStore.post<PostProofResponse>(
    "/api/v1/payments/proof",
    formData,
  );

  return response.data;
};
