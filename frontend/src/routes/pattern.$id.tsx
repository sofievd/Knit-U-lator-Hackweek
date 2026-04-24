import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import PatternView from '../components/PatternView'

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
  // This runs BEFORE the component renders
  //loader: async ({ params }) => {
    // You can fetch your pattern data here
    // const data = await fetchPatternById(params.id)
    // return data
    //return { patternId: params.id }
  //},

  // 3. Error State (Optional)
  // Shown if the loader fails or something breaks
  errorComponent: ({ error }) => <div>Failed to load pattern: {error.message}</div>,
  
  // 4. Pending State (Optional)
  // Shown if the loader takes a long time
  pendingComponent: () => <div>Loading pattern...</div>,
})




