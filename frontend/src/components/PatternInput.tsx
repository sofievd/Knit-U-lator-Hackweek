import React, { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../util/useApi";
import type { PatternResponse } from "../types";

const PATTERN_FORM_STORAGE_KEY = "knit-u-lator:pattern-form";

function loadStoredFormData() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.sessionStorage.getItem(PATTERN_FORM_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as {
      footLength: string;
      footCircumference: string;
      stitchGauge: string;
      rowGauge: string;
      needleCount: string;
      name: string;
    };
  } catch {
    return null;
  }
}

function saveStoredFormData(formData: {
  footLength: string;
  footCircumference: string;
  stitchGauge: string;
  rowGauge: string;
  needleCount: string;
  name: string;
}) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    PATTERN_FORM_STORAGE_KEY,
    JSON.stringify(formData),
  );
}

function clearStoredFormData() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(PATTERN_FORM_STORAGE_KEY);
}

export function PatternInput() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { api } = useApi();
  const queryClient = useQueryClient();
  const title = "Knit-U-Lator";
  const [shouldGenerateAfterSignIn, setShouldGenerateAfterSignIn] =
    useState(false);
  const [formData, setFormData] = useState(
    () =>
      loadStoredFormData() ?? {
        footLength: "",
        footCircumference: "",
        stitchGauge: "",
        rowGauge: "",
        needleCount: "4",
        name: "My pattern",
      },
  );

  useEffect(() => {
    saveStoredFormData(formData);
  }, [formData]);

  const createPatternMutation = useMutation({
    mutationFn: (values: typeof formData) =>
      api<PatternResponse>("/patterns/generate", {
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
    onSuccess: async (pattern) => {
      setShouldGenerateAfterSignIn(false);
      clearStoredFormData();
      queryClient.setQueryData<PatternResponse[]>(["patterns"], (existing) => {
        const current = existing ?? [];
        return [pattern, ...current.filter((item) => item.id !== pattern.id)];
      });
      await queryClient.invalidateQueries({ queryKey: ["patterns"] });
      navigate({ to: `/patterns/${pattern.id}` });
    },
    onError: (error) => {
      if (error instanceof Error && error.message.includes("401")) {
        setShouldGenerateAfterSignIn(true);
        openSignIn();
      }
    },
  });

  useEffect(() => {
    if (isSignedIn && shouldGenerateAfterSignIn) {
      setShouldGenerateAfterSignIn(false);
      createPatternMutation.mutate(formData);
    }
  }, [createPatternMutation, formData, isSignedIn, shouldGenerateAfterSignIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      setShouldGenerateAfterSignIn(true);
      openSignIn();
      return;
    }

    createPatternMutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              const type = (params as any).type ?? "socks";
              navigate({ to: "/category/$type", params: { type } });
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
        <h1
          className="text-3xl font-semibold capitalize"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
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
              placeholder="My pattern"
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
              htmlFor="footLength"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Foot Length (cm)
            </label>
            <input
              id="footLength"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.footLength}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footLength: e.target.value,
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
              htmlFor="footCircumference"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Foot Circumference (cm)
            </label>
            <input
              id="footCircumference"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.footCircumference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footCircumference: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="20.0"
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
              value={formData.stitchGauge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stitchGauge: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              placeholder="3.0"
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
              htmlFor="rowGauge"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Gauge (rows per 10cm)
            </label>
            <input
              id="rowGauge"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.rowGauge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rowGauge: e.target.value,
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
              htmlFor="needleCount"
              className="block font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              number of needles (default 4)
            </label>
            <input
              id="needleCount"
              type="number"
              step="0.1"
              min="2"
              required
              value={formData.needleCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  needleCount: e.target.value,
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
