import { Link } from "@tanstack/react-router";
import { Sparkles, FileText, Save } from "lucide-react";
import react from 'react'

export  function Home() {
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
        <h1 className="text-foreground mb-8">Home</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/category/$type"
              params={{ type: category.id }}
              className="bg-card rounded-xl p-12 shadow-sm border border-border hover:shadow-md transition-all hover:border-primary/30 flex flex-col items-center justify-center gap-4 group"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h2 className="text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-center text-foreground">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground">Enter Your Measurements</h3>
            <p className="text-muted-foreground">
              Input your measurements to get started with a custom pattern.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground">We Generate a Custom Pattern</h3>
            <p className="text-muted-foreground">
              Our algorithm creates a pattern tailored to your specifications.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Save className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground">Save, View, and Track Progress</h3>
            <p className="text-muted-foreground">
              Save your patterns and track your progress as you knit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
