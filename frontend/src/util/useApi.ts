import { useAuth } from "@clerk/clerk-react";
import { createApiClient } from "./apiClient";

export function useApi() {
  const { getToken } = useAuth();

  const api = createApiClient(getToken);

  return { api };
}
