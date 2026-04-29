import { Outlet, Link } from "@tanstack/react-router";
import { AuthButtons } from "./AuthButtons";

export function Layout() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <nav
        className="border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Knit-U-Lator
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/my-patterns"
              style={{ color: "var(--foreground)" }}
              className="hover:opacity-80 transition-opacity"
            >
              My Patterns
            </Link>
            <AuthButtons />
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}
