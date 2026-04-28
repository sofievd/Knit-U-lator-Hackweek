import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function LogoutButton() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--accent)",
      }}
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
