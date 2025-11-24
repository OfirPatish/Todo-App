"use client";

import { ErrorBoundary } from "@/components/ui";
import { TodoHeader, TodoFooter, TodoContainer } from "@/components/todo";

/**
 * Main todo application page
 * Uses Zustand store for state management
 * Wrapped in error boundary for error handling
 */
export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <TodoHeader />

          <TodoContainer />

          <TodoFooter />
        </div>
      </div>
    </ErrorBoundary>
  );
}
