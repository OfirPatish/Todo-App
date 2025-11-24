"use client";

import { HiClipboardCheck } from "react-icons/hi";
import { ThemeSwitcher } from "@/components/ui";

/**
 * Header component for the todo application
 * Clean, professional design with minimal decorative elements
 */
export function TodoHeader() {
  return (
    <header className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      {/* Theme Switcher */}
      <div className="flex justify-end mb-4 sm:mb-6 md:mb-8">
        <ThemeSwitcher />
      </div>

      <div className="text-center">
        {/* Logo Icon */}
        <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg">
            <HiClipboardCheck className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary-content" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-3 sm:mb-4 tracking-tight">
          Todo App
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-xl mx-auto leading-relaxed px-2">
          Organize your tasks, boost your productivity
        </p>
      </div>
    </header>
  );
}
