import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [footLength, setFootLength] = useState("");
  const [circumference, setCircumference] = useState("");
  const [gauge, setGauge] = useState("");
  const [pattern, setPattern] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(footLength, circumference, gauge);

    console.log(
      JSON.stringify({
        footLength: Number(footLength),
        footCircumference: Number(circumference),
        gauge: Number(gauge),
      }),
    );

    const res = await fetch("http://localhost:8080/api/patterns/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        footLength: Number(footLength),
        footCircumference: Number(circumference),
        gauge: Number(gauge),
      }),
    });

    const data = await res.text();
    setPattern(data);
    console.log(data);
  };

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1> Generate Sock pattern </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Foot Length (cm)</label>
          <input
            type="number"
            value={footLength}
            onChange={(e) => setFootLength(e.target.value)}
          />
        </div>

        <div>
          <label>Foot Circumference (cm)</label>
          <input
            type="number"
            value={circumference}
            onChange={(e) => setCircumference(e.target.value)}
          />
        </div>

        <div>
          <label>Gauge (stitches/cm)</label>
          <input
            type="number"
            value={gauge}
            onChange={(e) => setGauge(e.target.value)}
          />
        </div>

        <button type="submit">Generate Pattern</button>
      </form>

      <p>{pattern}</p>
    </main>
  );
}
