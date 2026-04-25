import { createFileRoute } from '@tanstack/react-router'
import react from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import PatternView from '../components/PatternView'
import { patternQueries } from '../util/queryOptions'

const defaultSections: PatternSection[] = [
  {
    name: 'General',
    steps: [
      {
        id: 'step-1',
        text: 'No generated steps yet.',
        explanation: 'Generate a pattern to see step-by-step instructions here.',
      },
    ],
  },
]

export const Route = createFileRoute('/pattern/$id')({

  // 1. The UI Component
  component: PatternView,

  // 2. The Loader (Optional but recommended)
// Access the queryClient we put in the context earlier (in main.tsx)
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(patternQueries.detail(id)),


  // 3. Error State (Optional)
  // Shown if the loader fails or something breaks
  errorComponent: ({ error }) => <div>Failed to load pattern: {error.message}</div>,
  
  // 4. Pending State (Optional)
  // Shown if the loader takes a long time
  pendingComponent: () => <div>Loading pattern...</div>
})




