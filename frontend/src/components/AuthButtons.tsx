import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { LogoutButton } from "./LogoutButton";

export function AuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <LogoutButton />
      </SignedIn>
    </>
  );
}
