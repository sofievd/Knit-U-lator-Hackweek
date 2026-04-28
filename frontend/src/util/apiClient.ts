import { type GetToken } from "@clerk/shared/types";

export const createApiClient = (getToken: GetToken) => {
  return async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const token = await getToken({ template: "knitulator-template" });
   // console.log("Retrieved token:", token);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string> ?? {}),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  };
};