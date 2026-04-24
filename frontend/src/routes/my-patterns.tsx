import { createFileRoute } from '@tanstack/react-router'
import { PatternList } from '../components/PatternList'

export const Route = createFileRoute('/my-patterns')({
  component: PatternList,
})


