import { Link } from "@tanstack/react-router";
import { Sparkles, FileText, Save } from "lucide-react";

export function Home() {
  const categories = [
    {
      id: "socks",
      name: "Socks",
      icon: "🧦",
    },
    {
      id: "hats",
      name: "Hats",
      icon: "🧢",
    },
    {
      id: "scarves",
      name: "Scarves",
      icon: "🧣",
    },
  ];

  return (
    <div className="space-y-16">
      <div>
        <h1
          className="text-4xl font-semibold mb-8 text-center"
          style={{ color: "var(--foreground)" }}
        >
          Create your custom pattern
        </h1>

        <p className="p-4 text-center m-6">
          Choose a category below to get started. Customize it with your measurements and generate a pattern tailored just for you.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/category/$type"
              params={{ type: category.id }}
              className="rounded-lg p-12 shadow-sm border flex flex-col items-center justify-center gap-4 group transition-all hover:shadow-md"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h2
                className="text-xl font-semibold text-center transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h2
          className="text-center text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="rounded-lg p-6 shadow-sm border space-y-3"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Sparkles
                className="w-6 h-6"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <h3
              className="font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Choose & customize
            </h3>
            <p style={{ color: "var(--muted-foreground)" }}>
              Pick a pattern and enter your measurements to tailor it to you.    </p>
          </div>

          <div
            className="rounded-lg p-6 shadow-sm border space-y-3"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <FileText
                className="w-6 h-6"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <h3
              className="font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Generate your pattern
            </h3>
            <p style={{ color: "var(--muted-foreground)" }}>
              We create your custom pattern instantly based on your input.
            </p>
          </div>

          <div
            className="rounded-lg p-6 shadow-sm border space-y-3"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Save className="w-6 h-6" style={{ color: "var(--primary)" }} />
            </div>
            <h3
              className="font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Save & access anytime
            </h3>
            <p style={{ color: "var(--muted-foreground)" }}>
              Sign in to save your patterns and access them anytime you want to knit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
