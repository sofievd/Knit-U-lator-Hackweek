import { queryOptions, useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/clerk-react";
import type { PatternResponse } from "../types";
import { getMockPatterns } from "./mockPatterns";

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
  });
}

// Hook to fetch all patterns for the currently authenticated user
// Merges real backend patterns with mock (hats) patterns from localStorage
// Only fetches when user is signed in
export function usePatterns() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery<PatternResponse[]>({
    queryKey: ["patterns"],
    queryFn: async () => {
      try {
        const realPatterns = await api.api<PatternResponse[]>("/patterns");
        const mockPatterns = getMockPatterns().map((p) => ({ ...p, isMock: true }));
        return [...realPatterns, ...mockPatterns];
      } catch {
        // If backend fails, at least show mock patterns
        const mockPatterns = getMockPatterns().map((p) => ({ ...p, isMock: true }));
        return mockPatterns;
      }
    },
    enabled: isSignedIn,
  });
}
