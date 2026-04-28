import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../util/useApi";
import type { PatternResponse } from "../types";

export function PatternInput() {
  const navigate = useNavigate();
  const { api } = useApi();
  const title = "Knit-U-Lator";
  const [formData, setFormData] = useState({
    footLength: "",
    footCircumference: "",
  stitchGauge: "",
  rowGauge : "",
  needleCount: "4",
  name: "My pattern"
  });

  const createPatternMutation = useMutation({
    mutationFn: (values: typeof formData) =>
      api<PatternResponse>("/api/patterns/generate", {
        method: "POST",
        body: JSON.stringify({
          footLength: Number(values.footLength),
          footCircumference: Number(values.footCircumference),
          stitchGauge: Number(values.stitchGauge),
          rowGauge: Number(values.rowGauge),
          needleCount: Number(values.needleCount),
          name: values.name,
        }),
      }),
    onSuccess: (pattern) => {
      navigate({ to: `/patterns/${pattern.id}` });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createPatternMutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-foreground capitalize">{title}</h1>
      </div>

      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm border border-border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
            <label htmlFor="name" className="block text-foreground">
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
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="My pattern"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="footLength" className="block text-foreground">
              Foot Length (cm)
            </label>
            <input
              id="footLength"
              type="number"
              step="0.1"
              required
              value={formData.footLength}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footLength: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="24.0"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="footCircumference"
              className="block text-foreground"
            >
              Foot Circumference (cm)
            </label>
            <input
              id="footCircumference"
              type="number"
              step="0.1"
              required
              value={formData.footCircumference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footCircumference: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="20.0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gauge" className="block text-foreground">
              Gauge (stitches per cm)
            </label>
            <input
              id="gauge"
              type="number"
              step="0.1"
              required
              value={formData.stitchGauge
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stitchGauge: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="3.0"
            />
          </div>

           <div className="space-y-2">
            <label htmlFor="rowGauge" className="block text-foreground">
              Gauge (rows per cm)
            </label>
            <input
              id="rowGauge"
              type="number"
              step="0.1"
              required
              value={formData.rowGauge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rowGauge: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="24.0"
            />
          </div>
           <div className="space-y-2">
            <label htmlFor="needleCount" className="block text-foreground">
              number of needles (default 4)
            </label>
            <input
              id="needleCount"
              type="number"
              step="0.1"
              required
              value={formData.needleCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  needleCount: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="24.0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          >
            Generate Pattern
          </button>
        </form>
      </div>
    </div>
  );
}
