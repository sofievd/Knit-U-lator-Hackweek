import { createFileRoute } from "@tanstack/react-router";
import PatternView from "../components/PatternView";
import { createApiClient } from "../util/apiClient";
import { getMockPatternById } from "../util/mockPatterns";

export const Route = createFileRoute("/patterns/$id")({
  component: PatternView,

  loader: ({ context, params: { id } }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["patterns", id],
      queryFn: async () => {
        const api = createApiClient((context as any).auth.getToken);

        try {
          return await api(`/patterns/${id}`);
        } catch {
          const mockPattern = getMockPatternById(id);
          if (mockPattern) {
            return mockPattern;
          }

          throw new Error(`Failed to load pattern ${id}`);
        }
      },
    }),

  errorComponent: ({ error }) => (
    <div>Failed to load pattern: {error.message}</div>
  ),
  pendingComponent: () => <div>Loading pattern...</div>,
});
