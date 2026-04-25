import { Outlet, Link } from "@tanstack/react-router";
import { User, LogOut } from "lucide-react";
import react from 'react'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl text-foreground hover:text-primary transition-colors">
            KnitPattern
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/my-patterns"
              className="text-foreground hover:text-primary transition-colors"
            >
              My Patterns
            </Link>
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
