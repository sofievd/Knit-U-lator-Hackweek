import { Route } from "../routes/patterns.$id";
import { useQuery } from "@tanstack/react-query";
// using direct query here to keep typings straightforward
import { useApi } from "../util/useApi";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { PatternResponse, PatternSection, PatternStep } from "../types";

export default function PatternViewPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const api = useApi();
  const { data: pattern } = useQuery<PatternResponse>({
    queryKey: ["patterns", id],
    queryFn: async () => api.api(`/patterns/${id}`),
  });

  const [sections, setSections] = useState<PatternSection[] | null>(null);

  useEffect(() => {
    if (pattern?.sections) {
      setSections(
        JSON.parse(JSON.stringify(pattern.sections)) as PatternSection[],
      );
    }
  }, [pattern]);

  const toggleStep = (sIdx: number, stIdx: number) => {
    setSections((prev) => {
      if (!prev) return prev;
      const next = prev.map((s) => ({
        ...s,
        steps: s.steps.map((st) => ({ ...st })),
      }));
      const step = next[sIdx].steps[stIdx] as PatternStep & {
        completed?: boolean;
      };
      step.completed = !step.completed;
      return next;
    });
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate({ to: "/" })}>← Back</button>
        <h1 className="text-2xl font-bold">{pattern?.name ?? "Pattern"}</h1>
        <div className="text-sm text-gray-500">ID: {pattern?.id ?? id}</div>
      </header>

      <main className="bg-white border rounded-xl p-6 space-y-6">
        {!sections ? (
          <div>Loading pattern...</div>
        ) : (
          sections.map((section, sIdx) => {
            const total = section.steps.length;
            const completed = section.steps.filter(
              (st) => (st as any).completed,
            ).length;

            return (
              <section key={sIdx} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{section.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    {completed} / {total} steps completed
                  </div>
                </div>

                <ol className="mt-3 space-y-3">
                  {section.steps.map((step, stIdx) => {
                    const done = !!(step as any).completed;
                    return (
                      <li
                        key={step.id}
                        className={`p-3 rounded-md flex items-start gap-3 ${done ? "bg-gray-50 text-gray-500" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleStep(sIdx, stIdx)}
                          className="mt-1"
                        />
                        <div>
                          <div
                            className={`font-medium ${done ? "line-through" : ""}`}
                          >
                            {step.text}
                          </div>
                          {step.explanation ? (
                            <div className="text-sm text-muted-foreground mt-1">
                              {step.explanation}
                            </div>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })
        )}
      </main>
    </div>
  );
}
