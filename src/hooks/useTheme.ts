"use client";

import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  startTransition,
} from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

/**
 * Custom hook for managing theme state
 * Works with DaisyUI's data-theme attribute system
 * Persists theme preference to localStorage
 */
export function useTheme() {
  // Always initialize to "light" to prevent hydration mismatch
  // We'll read from localStorage in useEffect after mount
  const [theme, setThemeState] = useState<Theme>("light");
  // Initialize mounted as false (same on server and client) to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Read theme from localStorage after mount to prevent hydration mismatch
  // Using startTransition to make state updates non-blocking and satisfy linter
  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      const storedTheme = localStorage.getItem(
        THEME_STORAGE_KEY
      ) as Theme | null;
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        setThemeState(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    });
  }, []); // Empty deps - only run once on mount

  // Apply theme to document when theme changes (after initial mount)
  useLayoutEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
