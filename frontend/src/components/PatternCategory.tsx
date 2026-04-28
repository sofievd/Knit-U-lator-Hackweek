import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, NotebookText } from "lucide-react";

interface PatternType {
  id: string;
  name: string;
  description: string;
}

export default function PatternCategory() {
  const { type } = useParams({ strict: false });
  const navigate = useNavigate();
  const isHatsCategory = type === "hats";

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
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-foreground">{title}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {patterns.map((pattern) =>
          isHatsCategory ? (
            <Link
              key={pattern.id}
              to="/patterns/hats-input"
              className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-all hover:border-primary/30 space-y-3 group"
            >
              <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center mb-4">
                <span className="text-3xl"><NotebookText /></span>
              </div>
              <h3 className="text-foreground group-hover:text-primary transition-colors">
                {pattern.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>
            </Link>
          ) : (
            <Link
              key={pattern.id}
              to="/create/$type/$pattern"
              params={{ type: type as string, pattern: pattern.id }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-all hover:border-primary/30 space-y-3 group"
            >
              <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-foreground group-hover:text-primary transition-colors">
                {pattern.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
