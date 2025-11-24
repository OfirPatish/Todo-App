"use client";

import { useEffect, useCallback } from "react";

interface KeyboardShortcutsOptions {
  onFocusSearch?: () => void;
  onAddTodo?: () => void;
}

/**
 * Custom hook for keyboard shortcuts
 * Provides keyboard shortcuts for common actions
 *
 * @param options - Configuration options for keyboard shortcuts
 */
export function useKeyboardShortcuts({
  onFocusSearch,
  onAddTodo,
}: KeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + /: Focus search (common in web apps, avoids browser conflicts)
      // Allow this to work even when in an input to enable switching between inputs
      if (modKey && e.key === "/" && !e.shiftKey) {
        e.preventDefault();
        onFocusSearch?.();
        return;
      }

      // Ctrl/Cmd + .: Focus add todo input (period key, avoids browser conflicts)
      // Allow this to work even when in an input to enable switching between inputs
      if (modKey && e.key === "." && !e.shiftKey) {
        e.preventDefault();
        onAddTodo?.();
        return;
      }

      // For other modifier key combinations, don't trigger shortcuts when typing in inputs
      // This prevents interfering with normal typing
      const target = e.target as HTMLElement;
      if (
        (modKey || e.altKey || e.shiftKey) &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
    },
    [onFocusSearch, onAddTodo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
