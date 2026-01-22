export interface UserData {
  ID: string;
  Name: string;
  Email: string;
  [key: string]: unknown;
}

export interface UserStatusResponse {
  data: {
    Data: UserData;
    Message: {
      Code: number;
      Text: string;
    };
  };
}

/**
 * Mock implementation of getUserStatusV3
 * In a real scenario, this would call an API like `/v1/user/status`
 */
export const getUserStatusV3 = async (
  token: string,
): Promise<UserStatusResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!token || token === "expired") {
    throw new Error("Invalid or expired token");
  }

  // Mock successful response
  return {
    data: {
      Data: {
        ID: "user-123",
        Name: "Outshine User",
        Email: "user@example.com",
      },
      Message: {
        Code: 200,
        Text: "SUCCESS",
      },
    },
  };
};
