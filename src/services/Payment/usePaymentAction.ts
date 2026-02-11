import { fetcherOSStore } from "@/lib/axios";

export interface UploadProofPayload {
  orderId: string;
  file: File;
}

export interface UploadProofResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    proofUrl: string;
    status: string;
  };
}

export interface LinkGrupResponse {
  success: boolean;
  message: string;
  data: {
    link: string;
  };
}

export const postUploadPaymentProof = async (
  payload: UploadProofPayload,
): Promise<UploadProofResponse> => {
  const formData = new FormData();
  formData.append("orderId", payload.orderId);
  formData.append("file", payload.file);

  const response = await fetcherOSStore.post<UploadProofResponse>(
    "/api/v1/payments/proof",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const postCreateLinkGrup = async (
  orderId: string,
): Promise<LinkGrupResponse> => {
  const response = await fetcherOSStore.post<LinkGrupResponse>(
    "/api/v1/payments/link-grup",
    { orderId },
  );
  return response.data;
};
