import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface Pattern {
  id: string;
  name: string;
  type: string;
  patternType: string;
  createdAt: string;
  measurements: {
    footLength: string;
    footCircumference: string;
    gauge: string;
  };
  currentRow?: number;
}

export function PatternList() {
  const navigate = useNavigate();
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    const savedPatterns = JSON.parse(localStorage.getItem("knit-patterns") || "[]");
    setPatterns(savedPatterns);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "socks":
        return "🧦";
      case "hats":
        return "🧢";
      case "scarves":
        return "🧣";
      default:
        return "✨";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-foreground">My Patterns</h1>
      </div>

      {patterns.length === 0 ? (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center space-y-4">
          <p className="text-muted-foreground">No patterns yet</p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Your First Pattern
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <Link
              key={pattern.id}
              to="/patterns/$id"
              params={{ id: pattern.id }}
              className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-all hover:border-primary/30 space-y-4 group"
            >
              <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-4xl">{getIcon(pattern.type)}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-foreground group-hover:text-primary transition-colors">
                  {pattern.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {pattern.patternType?.split("-").join(" ")} {pattern.type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
