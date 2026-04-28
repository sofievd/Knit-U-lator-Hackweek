import { Outlet, Link } from "@tanstack/react-router";
import react from 'react'
import { AuthButtons } from "./AuthButtons";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl text-foreground hover:text-primary transition-colors">
            Knit-U-Lator
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/my-patterns"
              className="text-foreground hover:text-primary transition-colors"
            >
              My Patterns
            </Link>
            <AuthButtons />
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
