import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PatternResponse } from "../types";
import { mockGenerateHatPattern } from "../util/mockPatterns";

export function HatsInputPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const title = "Knit-U-Lator";
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
      queryClient.setQueryData<PatternResponse[]>(["patterns"], (existing) => {
        const current = existing ?? [];
        return [pattern, ...current.filter((item) => item.id !== pattern.id)];
      });
      await queryClient.invalidateQueries({ queryKey: ["patterns"] });
      navigate({ to: `/patterns/${pattern.id}` });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPatternMutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1
          className="text-3xl font-semibold capitalize"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
      </div>

      <div
        className="max-w-2xl mx-auto rounded-lg shadow-sm border p-8"
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
            Generate Pattern
          </button>
        </form>
      </div>
    </div>
  );
}
