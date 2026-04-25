import { createFileRoute } from '@tanstack/react-router'
import PatternCategory from '../components/PatternCategory'
import react from 'react'

export const Route = createFileRoute('/category/$type')({
  component: PatternCategory,
})
