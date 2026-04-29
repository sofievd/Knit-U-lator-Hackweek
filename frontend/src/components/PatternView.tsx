import { Route } from "../routes/patterns.$id";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// using direct query here to keep typings straightforward
import { useApi } from "../util/useApi";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { PatternResponse } from "../types";
import { Edit, Save, Trash2 } from "lucide-react";
import { getMockPatternById } from "../util/mockPatterns";

export default function PatternViewPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const api = useApi();
  const { data: pattern } = useQuery<PatternResponse>({
    queryKey: ["patterns", id],
    queryFn: async () => {
      try {
        return await api.api(`/patterns/${id}`);
      } catch {
        const mockPattern = getMockPatternById(id);
        if (mockPattern) {
          return mockPattern;
        }

        throw new Error(`Failed to load pattern ${id}`);
      }
    },
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [patternName, setPatternName] = useState(pattern?.name ?? "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(pattern?.notes ?? "");

  const queryClient = useQueryClient();

  // Toggle step completion mutation
  const toggleStepMutation = useMutation({
    mutationFn: async ({
      sectionIndex,
      stepIndex,
    }: {
      sectionIndex: number;
      stepIndex: number;
    }) => {
      return api.api(`/patterns/${id}/steps/toggle`, {
        method: "POST",
        body: JSON.stringify({ sectionIndex, stepIndex }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns", id] });
    },
  });

  // Save pattern mutation
  const savePatternMutation = useMutation({
    mutationFn: async (updatedName: string) => {
      return api.api(`/patterns/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: updatedName }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns", id] });
      setIsEditingName(false);
    },
  });

  // Delete pattern mutation
  const deletePatternMutation = useMutation({
    mutationFn: async () => {
      return api.api(`/patterns/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  // Save notes mutation
  const saveNotesMutation = useMutation({
    mutationFn: async (notes: string) => {
      return api.api(`/patterns/${id}`, {
        method: "PUT",
        body: JSON.stringify({ notes }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns", id] });
      setIsEditingNotes(false);
    },
  });

  const savePattern = () => {
    savePatternMutation.mutate(patternName);
  };

  const deletePattern = () => {
    if (window.confirm("Are you sure you want to delete this pattern?")) {
      deletePatternMutation.mutate();
      navigate({ to: "/my-patterns" });
    }
  };

  const saveNotes = () => {
    saveNotesMutation.mutate(notesDraft);
  };

  const cancelEditingNotes = () => {
    setNotesDraft(pattern?.notes ?? "");
    setIsEditingNotes(false);
  };

  // Update patternName when pattern data loads
  useEffect(() => {
    if (pattern?.name) {
      setPatternName(pattern.name);
    }
  }, [pattern?.name]);

  // Update notesDraft when pattern data loads
  useEffect(() => {
    if (pattern?.notes !== undefined) {
      setNotesDraft(pattern.notes ?? "");
    }
  }, [pattern?.notes]);

  return (
    <div className="p-4 sm:p-8">
      <header
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        style={{ backgroundColor: "var(--background)" }}
      >
        <button
          onClick={() => navigate({ to: "/" })}
          className="px-3 py-2 rounded-lg transition-colors font-semibold"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--foreground)",
          }}
        >
          ← Back
        </button>
        {isEditingName ? (
          <input
            type="text"
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
            className="text-2xl font-bold px-2 py-1 rounded border-b-2 focus:outline-none flex-1 sm:flex-initial"
            style={{
              borderColor: "var(--primary)",
              backgroundColor: "var(--card)",
              color: "var(--foreground)",
            }}
            autoFocus
          />
        ) : (
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {pattern?.name ?? "Pattern"}
          </h1>
        )}
        <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          ID: {pattern?.id ?? id}
        </div>
      </header>

      <main
        className="rounded-lg p-6 space-y-6 shadow-sm border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Action Buttons - Stacked on Mobile */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsEditingName(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border hover:opacity-80 transition-colors text-sm sm:text-base"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--accent)",
              color: "var(--foreground)",
            }}
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={savePattern}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={deletePattern}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border hover:opacity-80 transition-colors text-sm sm:text-base"
            style={{
              borderColor: "var(--destructive)",
              color: "var(--destructive)",
              backgroundColor: "transparent",
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>

        {!pattern?.sections ? (
          <div style={{ color: "var(--muted-foreground)" }}>
            Loading pattern...
          </div>
        ) : (
          pattern.sections.map((section, sIdx) => {
            const total = section.steps.length;
            const completed = section.steps.filter(
              (st) => (st as any).completed,
            ).length;

            return (
              <section
                key={sIdx}
                className="rounded-lg p-4 border"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {section.name}
                  </h2>
                  <div
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {completed} / {total} steps completed
                  </div>
                </div>

                <ol className="mt-3 space-y-3">
                  {section.steps.map((step, stIdx) => {
                    const done = !!(step as any).completed;
                    return (
                      <li
                        key={step.id}
                        className="p-3 rounded-md flex items-start gap-3 transition-colors"
                        style={
                          done
                            ? {
                                backgroundColor: "var(--accent)",
                                color: "var(--muted-foreground)",
                              }
                            : {}
                        }
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() =>
                            toggleStepMutation.mutate({
                              sectionIndex: sIdx,
                              stepIndex: stIdx,
                            })
                          }
                          disabled={toggleStepMutation.isPending}
                          className="mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <div>
                          <div
                            className={`font-medium ${done ? "line-through" : ""}`}
                            style={{
                              color: done
                                ? "var(--muted-foreground)"
                                : "var(--foreground)",
                            }}
                          >
                            {step.text}
                          </div>
                          {step.explanation ? (
                            <div
                              className="text-sm mt-1"
                              style={{ color: "var(--muted-foreground)" }}
                            >
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

        {/* Notes Section */}
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "var(--secondary-background)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Notes
            </h3>
            <div className="flex gap-2">
              {isEditingNotes ? (
                <>
                  <button
                    onClick={saveNotes}
                    disabled={saveNotesMutation.isPending}
                    className="px-3 py-1 text-sm rounded hover:opacity-90 disabled:opacity-50 font-semibold"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditingNotes}
                    disabled={saveNotesMutation.isPending}
                    className="px-3 py-1 border text-sm rounded hover:opacity-80 disabled:opacity-50"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--accent)",
                      color: "var(--foreground)",
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="px-3 py-1 border text-sm rounded hover:opacity-80"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--accent)",
                    color: "var(--foreground)",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {isEditingNotes ? (
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full min-h-24 p-3 border rounded focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
              }}
            />
          ) : (
            <div
              className="whitespace-pre-wrap"
              style={{ color: "var(--foreground)" }}
            >
              {notesDraft || (
                <span
                  className="italic"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  No notes yet
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
          <button
            onClick={savePattern}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base flex-1 sm:flex-initial justify-center font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={deletePattern}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg border hover:opacity-80 transition-colors text-sm sm:text-base flex-1 sm:flex-initial justify-center"
            style={{
              borderColor: "var(--destructive)",
              color: "var(--destructive)",
              backgroundColor: "transparent",
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </main>
    </div>
  );
}
