import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface OTPRequest {
  email: string;
  otpCode: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the OTP verification request (Mock or Real)
 */
async function verifyOTP(
  url: string,
  { arg }: { arg: OTPRequest },
): Promise<OTPResponse> {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    return {
      success: true,
      message: "OTP verified successfully",
      data: {
        email: arg.email,
        status: "verified",
      },
    };
  }

  // Real API call
  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for OTP verification
 */
export const usePostOTP = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/verify-otp",
    verifyOTP,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
