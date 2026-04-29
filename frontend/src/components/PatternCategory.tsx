import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, NotebookText, Sparkles } from "lucide-react";

interface PatternType {
  id: string;
  name: string;
  description: string;
}

export default function PatternCategory() {
  const { type } = useParams({ strict: false });
  const navigate = useNavigate();
  const isHatsCategory = type === "hats";
  const isScarvesCategory = type === "scarves";

  const patternTypes: Record<string, PatternType[]> = {
    socks: [
      {
        id: "basic",
        name: "Basic",
        description: "Simple, classic sock pattern",
      },
      {
        id: "basic-variation",
        name: "Basic with Variation",
        description: "Classic with a twist",
      },
      { id: "lace", name: "Lace", description: "Delicate lace pattern" },
    ],
    hats: [
      { id: "beanie", name: "Beanie", description: "Simple fitted hat" },
      { id: "slouchy", name: "Slouchy", description: "Relaxed, loose fit" },
      { id: "cabled", name: "Cabled", description: "Classic cable design" },
    ],
    scarves: [
      { id: "basic", name: "Basic", description: "Simple rectangular scarf" },
      { id: "infinity", name: "Infinity", description: "Loop scarf design" },
      { id: "ribbed", name: "Ribbed", description: "Textured ribbed pattern" },
    ],
  };

  const patterns = patternTypes[type as string] || [];
  const title = type
    ? (type as string).charAt(0).toUpperCase() + (type as string).slice(1)
    : "Patterns";

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <ChevronLeft
            className="w-5 h-5"
            style={{ color: "var(--foreground)" }}
          />
        </button>
        <h1
          className="text-3xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {patterns.map((pattern) => {
          if (isScarvesCategory) {
            return (
              <div
                key={pattern.id}
                aria-disabled="true"
                className="rounded-lg p-8 shadow-sm border space-y-3 group cursor-not-allowed opacity-60"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <span className="text-3xl">
                      {" "}
                      <Sparkles
                        className="w-6 h-6"
                        style={{ color: "var(--primary)" }}
                      />
                    </span>
                  </div>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: "var(--secondary-background)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Coming soon
                  </span>
                </div>
                <h3
                  className="font-semibold transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {pattern.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {pattern.description}
                </p>
              </div>
            );
          }

          if (isHatsCategory) {
            return (
              <Link
                key={pattern.id}
                to="/patterns/hats-input"
                onClick={() => {
                  sessionStorage.setItem(
                    "knit-u-lator:selected-hat-pattern",
                    JSON.stringify({
                      id: pattern.id,
                      name: pattern.name,
                      category: "hats",
                    }),
                  );
                }}
                className="rounded-lg p-8 shadow-sm border hover:shadow-md transition-all space-y-3 group"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <span className="text-3xl">
                      <Sparkles
                    className="w-6 h-6"
                    style={{ color: "var(--primary)" }}
                  />
                  </span>
                </div>
                <h3
                  className="font-semibold transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {pattern.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {pattern.description}
                </p>
              </Link>
            );
          }

          return (
            <Link
              key={pattern.id}
              to="/create/$type/$pattern"
              params={{ type: type as string, pattern: pattern.id }}
              className="rounded-lg p-8 shadow-sm border hover:shadow-md transition-all space-y-3 group"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <span className="text-3xl">
                  {" "}
                  <Sparkles
                    className="w-6 h-6"
                    style={{ color: "var(--primary)" }}
                  />
                </span>
              </div>
              <h3
                className="font-semibold transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {pattern.name}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {pattern.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
