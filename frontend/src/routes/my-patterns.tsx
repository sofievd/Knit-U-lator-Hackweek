import { createFileRoute } from '@tanstack/react-router'
import { PatternList } from '../components/PatternList'
import react from 'react'

export const Route = createFileRoute('/my-patterns')({
  component: PatternList,
})


