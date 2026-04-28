import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { usePatterns } from "../util/queryOptions";

export function PatternList() {
  const navigate = useNavigate();
  const { data: patterns = [], isLoading, error } = usePatterns();

  const getIcon = () => {
    // Default icon for all patterns (the parameters might contain pattern type info)
    return "✨";
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

      {isLoading ? (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-muted-foreground">Loading your patterns...</p>
        </div>
      ) : error ? (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center space-y-4">
          <p className="text-destructive">Failed to load patterns</p>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      ) : patterns.length === 0 ? (
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
                <span className="text-4xl">{getIcon()}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-foreground group-hover:text-primary transition-colors">
                  {pattern.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Custom knitting pattern
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
