import { Route } from "../routes/patterns.$id";
import { useQuery } from "@tanstack/react-query";
import { patternQueries, createPatternDetailQuery } from "../util/queryOptions";
import { useApi } from "../util/useApi";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function PatternViewPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const api = useApi();
  const { data: pattern } = useQuery(createPatternDetailQuery(id, api));
  // 2. Local State
  const [patternName, setPatternName] = useState("My Pattern");
  const [currentRow, setCurrentRow] = useState(1);

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate({ to: "/" })}>← Back</button>
        <h1 className="text-2xl font-bold">{patternName}</h1>
      </header>

      <main className="bg-white border rounded-xl p-6">
        <p>This is your separate component logic for ID: {pattern?.id}</p>
        <div className="mt-4">
          <label>Current Row: </label>
          <button
            onClick={() => setCurrentRow((r) => r + 1)}
            className="border px-2"
          >
            {currentRow}
          </button>
        </div>
      </main>
    </div>
  );
}
