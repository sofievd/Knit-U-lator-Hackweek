import { createFileRoute } from '@tanstack/react-router'
import PatternCategory from '../components/PatternCategory'

export const Route = createFileRoute('/category/$type')({
  component: PatternCategory,
})
