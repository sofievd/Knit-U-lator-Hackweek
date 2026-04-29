import { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PatternResponse } from "../types";
import { mockGenerateHatPattern } from "../util/mockPatterns";

function loadSelectedHatPattern() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = sessionStorage.getItem("knit-u-lator:selected-hat-pattern");
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as { id: string; name: string; category: string };
  } catch {
    return null;
  }
}

export function HatsInputPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const queryClient = useQueryClient();
  const title = "Knit-U-Lator";
  const selectedPattern = loadSelectedHatPattern();
  const displayText = selectedPattern
    ? `hat pattern - ${selectedPattern.name}`
    : "";
  const [shouldGenerateAfterSignIn, setShouldGenerateAfterSignIn] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "My hat pattern",
    headCircumference: "",
    gauge: "",
    hatHeight: "",
    fitType: "classic",
  });

  const createPatternMutation = useMutation({
    mutationFn: (values: typeof formData) =>
      mockGenerateHatPattern({
        name: values.name,
        headCircumference: Number(values.headCircumference),
        gauge: Number(values.gauge),
        hatHeight: values.hatHeight ? Number(values.hatHeight) : undefined,
        fitType: values.fitType,
      }),
    onSuccess: async (pattern) => {
      setShouldGenerateAfterSignIn(false);
      queryClient.setQueryData<PatternResponse[]>(["patterns"], (existing) => {
        const current = existing ?? [];
        return [pattern, ...current.filter((item) => item.id !== pattern.id)];
      });
      await queryClient.invalidateQueries({ queryKey: ["patterns"] });
      navigate({ to: `/patterns/${pattern.id}` });
    },
  });

  useEffect(() => {
    if (isSignedIn && shouldGenerateAfterSignIn) {
      setShouldGenerateAfterSignIn(false);
      createPatternMutation.mutate(formData);
    }
  }, [createPatternMutation, formData, isSignedIn, shouldGenerateAfterSignIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      setShouldGenerateAfterSignIn(true);
      openSignIn();
      return;
    }

    createPatternMutation.mutate(formData);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8 w-full">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigate({ to: "/category/$type", params: { type: "hats" } });
            }
          }}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <ChevronLeft
            className="w-5 h-5"
            style={{ color: "var(--foreground)" }}
          />
        </button>
        <div className="flex-1">
          {selectedPattern && (
            <div className="flex items-center gap-4 flex-wrap">
              <h1
                className="text-3xl font-semibold capitalize"
                style={{ color: "var(--foreground)" }}
              >
                {selectedPattern.name
                  ? `Customize your ${displayText}`
                  : "Customize your hat pattern"}
              </h1>
              <span
                title="This is preview/mock data for hats — not final."
                className="inline-flex items-center text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--secondary-background)",
                  color: "var(--foreground)",
                  opacity: 0.9,
                }}
              >
                Preview
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className="max-w-2xl w-full rounded-lg shadow-sm border p-8"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Pattern Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="My hat pattern"
              style={
                {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="headCircumference"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Head Circumference (cm)
            </label>
            <input
              id="headCircumference"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.headCircumference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  headCircumference: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="56.0"
              style={
                {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gauge"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Gauge (stitches per 10cm)
            </label>
            <input
              id="gauge"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.gauge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gauge: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="22.0"
              style={
                {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hatHeight"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Hat Height (cm, optional)
            </label>
            <input
              id="hatHeight"
              type="number"
              step="0.1"
              min="0"
              value={formData.hatHeight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hatHeight: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="24.0"
              style={
                {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="fitType"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Desired Fit Type
            </label>
            <select
              id="fitType"
              value={formData.fitType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fitType: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={
                {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
            >
              <option value="classic">Classic</option>
              <option value="snug">Snug</option>
              <option value="slouchy">Slouchy</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {isSignedIn ? "Generate Pattern" : "Sign in to generate pattern"}
          </button>
        </form>
      </div>
    </div>
  );
}
