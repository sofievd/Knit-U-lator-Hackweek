import { Route } from "../routes/pattern.$id";
import {useQuery } from "@tanstack/react-query";
import { patternQueries } from "../util/queryOptions";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function PatternViewPage() {
    const navigate = useNavigate()
  const { id } = Route.useParams()

  const { data: pattern } = useQuery(patternQueries.detail(id))
  // 2. Local State
  const [patternName, setPatternName] = useState('My Pattern')
  const [currentRow, setCurrentRow] = useState(1)


  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate({ to: '/' })}>← Back</button>
        <h1 className="text-2xl font-bold">{patternName}</h1>
        <div className="text-sm text-gray-500">ID: {id}</div>
      </header>

      <main className="bg-white border rounded-xl p-6">
        <p>This is your separate component logic for ID: {pattern?.id}</p>
        <div className="mt-4">
            <label>Current Row: </label>
            <button onClick={() => setCurrentRow(r => r + 1)} className="border px-2">
                {currentRow}
            </button>
        </div>
      </main>
    </div>
  )
}
