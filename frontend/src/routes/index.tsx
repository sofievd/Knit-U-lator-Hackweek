import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [footLength, setFootLength] = useState("");
  const [circumference, setCircumference] = useState("");
  const [gauge, setGauge] = useState("");
  const [pattern, setPattern] = useState("");
  const title = "Knit-U-Lator";
  const [formData, setFormData] = useState({
    footLength: "",
    footCircumference: "",
    gauge: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(formData);

    console.log(
      JSON.stringify({
        footLength: Number(formData.footLength),
        footCircumference: Number(formData.footCircumference),
        gauge: Number(formData.gauge),
      }),
    );

    const res = await fetch("http://localhost:8080/api/patterns/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        footLength: Number(formData.footLength),
        footCircumference: Number(formData.footCircumference),
        gauge: Number(formData.gauge),
      }),
    });

    const data = await res.json();
    setPattern(data);
    console.log(data);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-foreground capitalize">{title}</h1>
      </div>

      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm border border-border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              Gauge (stitches per cm / rows per cm)
            </label>
            <input
              id="gauge"
              type="number"
              step="0.1"
              required
              value={formData.gauge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gauge: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="3.0"
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
