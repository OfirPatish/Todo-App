"use client";

import { useTheme } from "@/hooks/useTheme";
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * Theme switcher component
 * Simple toggle button that switches between light and dark themes
 * Custom implementation for DaisyUI theme system
 */
export function ThemeSwitcher() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by rendering the same initial state on server and client
  // After mount, we'll update to show the actual theme from localStorage
  if (!mounted) {
    return (
      <button
        className="btn btn-ghost btn-circle btn-sm sm:btn-md"
        aria-label="Theme switcher"
        suppressHydrationWarning
      >
        <HiSun className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle btn-sm sm:btn-md"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <HiSun className="h-4 w-4 sm:h-5 sm:w-5 transition-transform hover:rotate-90" />
      ) : (
        <HiMoon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform hover:rotate-12" />
      )}
    </button>
  );
}
