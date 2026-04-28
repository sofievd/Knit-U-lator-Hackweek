import { queryOptions } from "@tanstack/react-query";
import { useApi } from "./useApi";

export const patternQueries = {
  all: () => ["patterns"] as const,

  // Factory function for detail queries that requires the API hook
  detail: (id: string) => {
    return {
      queryKey: ["patterns", id],
      queryFn: null as any, // Will be overridden in component
    };
  },
};

// Helper function to create query options with API client
// Usage: useQuery(createPatternDetailQuery(id, useApi()))
export function createPatternDetailQuery(
  id: string,
  api: ReturnType<typeof useApi>,
) {
  return queryOptions({
    queryKey: ["patterns", id],
    queryFn: () => api.api(`/patterns/${id}`),
    enabled: api.isLoaded,
  });
}
