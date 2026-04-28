import { Route } from "../routes/patterns.$id";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// using direct query here to keep typings straightforward
import { useApi } from "../util/useApi";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { PatternResponse } from "../types";
import { Edit, Save, Trash2 } from "lucide-react";

export default function PatternViewPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const api = useApi();
  const { data: pattern } = useQuery<PatternResponse>({
    queryKey: ["patterns", id],
    queryFn: async () => api.api(`/patterns/${id}`),
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
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate({ to: "/" })}>← Back</button>
        {isEditingName ? (
          <input
            type="text"
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
            className="text-2xl font-bold border-b-2 border-primary px-2 py-1 focus:outline-none"
            autoFocus
          />
        ) : (
          <h1 className="text-2xl font-bold">{pattern?.name ?? "Pattern"}</h1>
        )}
        <div className="text-sm text-gray-500">ID: {pattern?.id ?? id}</div>
      </header>

      <main className="bg-white border rounded-xl p-6 space-y-6">
        {/* Action Buttons - Stacked on Mobile */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsEditingName(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm sm:text-base"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={savePattern}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={deletePattern}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors text-sm sm:text-base"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>

   

        {!pattern?.sections ? (
          <div>Loading pattern...</div>
        ) : (
          pattern.sections.map((section, sIdx) => {
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

             {/* Notes Section */}
        <div className="border rounded-md p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Notes</h3>
            <div className="flex gap-2">
              {isEditingNotes ? (
                <>
                  <button
                    onClick={saveNotes}
                    disabled={saveNotesMutation.isPending}
                    className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:opacity-90 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditingNotes}
                    disabled={saveNotesMutation.isPending}
                    className="px-3 py-1 border border-border text-sm rounded hover:bg-accent disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="px-3 py-1 border border-border text-sm rounded hover:bg-accent"
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
              className="w-full min-h-24 p-3 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">
              {notesDraft || (
                <span className="text-gray-400 italic">No notes yet</span>
              )}
            </div>
          )}
        </div>

         {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
        <button
          onClick={savePattern}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base flex-1 sm:flex-initial justify-center"
        >
          <Save className="w-4 h-4" />
          Save Pattern
        </button>
        <button
          onClick={deletePattern}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors text-sm sm:text-base flex-1 sm:flex-initial justify-center"
        >
          <Trash2 className="w-4 h-4" />
          Delete Pattern
        </button>
      </div>
      </main>
    </div>
  );
}
