import { queryOptions } from '@tanstack/react-query'

export const patternQueries = {
  all: () => ['patterns'] as const,
  // The "Recipe" for a single pattern
  detail: (id: string) => queryOptions({
    queryKey: ['patterns', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/patterns/${id}`)
      if (!res.ok) throw new Error('Pattern not found')
      return res.json()
    },
  }),
}