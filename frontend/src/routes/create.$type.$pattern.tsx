import { createFileRoute } from '@tanstack/react-router'
import { PatternInput } from '../components/PatternInput'

export const Route = createFileRoute('/create/$type/$pattern')({
  component: PatternInput,
})

//function RouteComponent() {
  //return <div>Hello "/patternInputPage"!</div>
//}
