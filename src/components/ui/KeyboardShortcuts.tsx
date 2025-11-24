"use client";

import { useState } from "react";
import { HiLightningBolt } from "react-icons/hi";

/**
 * Keyboard shortcuts display component
 * Shows available keyboard shortcuts for the application
 * Only visible on medium screens and above (md breakpoint) where keyboards are available
 */
export function KeyboardShortcuts() {
  // Initialize isMac state - detect platform on client side
  // Use lazy initialization to avoid hydration mismatch
  const [isMac] = useState(() => {
    if (typeof window === "undefined") return false;
    return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  });

  const modKey = isMac ? "⌘" : "Ctrl";

  const shortcuts = [
    {
      action: "Focus add todo",
      keys: [modKey, "."],
    },
    {
      action: "Focus search",
      keys: [modKey, "/"],
    },
  ];

  return (
    <div className="hidden md:flex md:items-center gap-2 md:gap-3 text-xs text-base-content/70 px-1">
      <div className="flex items-center gap-2 shrink-0">
        <HiLightningBolt className="h-4 w-4 shrink-0 text-primary" />
        <span className="font-semibold text-base-content/80">Shortcuts:</span>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex items-center gap-2 shrink-0"
            title={`${shortcut.action} - ${shortcut.keys.join(" + ")}`}
          >
            <span className="text-base-content/60 whitespace-nowrap text-xs">
              {shortcut.action}:
            </span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <kbd
                  key={keyIndex}
                  className="kbd kbd-sm font-mono bg-base-200 border-base-300 text-base-content shadow-sm font-semibold"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
