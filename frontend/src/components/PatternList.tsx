import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { usePatterns } from "../util/queryOptions";

export function PatternList() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { data: patterns = [], isLoading, error } = usePatterns();

  const getIcon = () => {
    // Default icon for all patterns (the parameters might contain pattern type info)
    return  <Sparkles
                            className="w-6 h-6"
                            style={{ color: "var(--primary)" }}
                          />;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center relative justify-center gap-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-2 w-fit rounded-lg transition-colors absolute left-0"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <span className="flex gap-2 items-center"> <ArrowLeft
            className="w-5 h-5"
            style={{ color: "var(--foreground)" }}
          /> 
          Home</span>
         
        </button>
        <h1
          className="text-3xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          My Patterns
        </h1>
       
      </div>

      {!isLoaded ? (
        <div
          className="rounded-lg shadow-sm border p-12 text-center"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--muted-foreground)" }}>
            Loading authentication...
          </p>
        </div>
      ) : !isSignedIn ? (
        <div
          className="rounded-lg shadow-sm border p-12 text-center space-y-4"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--muted-foreground)" }}>
            Sign in to see your patterns
          </p>
          <SignInButton mode="modal">
            <button
              className="inline-block px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Sign in
            </button>
          </SignInButton>
        </div>
      ) : isLoading ? (
        <div
          className="rounded-lg shadow-sm border p-12 text-center"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--muted-foreground)" }}>
            Loading your patterns...
          </p>
        </div>
      ) : error ? (
        <div
          className="rounded-lg shadow-sm border p-12 text-center space-y-4"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--destructive)" }}>Failed to load patterns</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Please try refreshing the page
          </p>
        </div>
      ) : patterns.length === 0 ? (
        <div
          className="rounded-lg shadow-sm border p-12 text-center space-y-4"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--muted-foreground)" }}>No patterns yet</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
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
              className="rounded-lg shadow-sm border p-6 hover:shadow-md transition-all space-y-4 group"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <span className="text-4xl">{getIcon()}</span>
                </div>
                {pattern.isMock && (
                  <span
                    className="px-2 py-1 text-xs font-medium rounded"
                    style={{
                      backgroundColor: "var(--secondary-background)",
                      color: "var(--foreground)",
                    }}
                  >
                    Mock
                  </span>
                )}
              </div>
              <div className="space-y-1">
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
