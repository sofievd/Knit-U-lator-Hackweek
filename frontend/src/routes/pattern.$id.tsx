import { createFileRoute } from '@tanstack/react-router'
import PatternView from '../components/PatternView'
import { createApiClient } from '../util/apiClient'

export const Route = createFileRoute('/pattern/$id')({

  // 1. The UI Component
  component: PatternView,

  // 2. The Loader (Optional but recommended)
// Access the queryClient we put in the context earlier (in main.tsx)
  loader: ({ context, params: { id } }) =>
    context.queryClient.ensureQueryData({
      queryKey: ['patterns', id],
      queryFn: async () => {
        const api = createApiClient((context as any).auth.getToken);
        return api(`/patterns/${id}`);
      },
    }),


  // 3. Error State (Optional)
  // Shown if the loader fails or something breaks
  errorComponent: ({ error }) => <div>Failed to load pattern: {error.message}</div>,
  
  // 4. Pending State (Optional)
  // Shown if the loader takes a long time
  pendingComponent: () => <div>Loading pattern...</div>
})




