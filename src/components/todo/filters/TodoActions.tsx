"use client";

import { memo } from "react";
import { HiTrash } from "react-icons/hi";
import { useTodosStats, useTodoStore } from "@/store/todo-store";

/**
 * Action buttons component for bulk todo operations
 * Uses store selector - only re-renders when completed count changes
 */
export const TodoActions = memo(function TodoActions() {
  const stats = useTodosStats();
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  if (stats.completedTodos === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <button
        onClick={clearCompleted}
        className="btn btn-sm btn-ghost text-error hover:bg-error hover:text-error-content gap-1.5 sm:gap-2 font-medium transition-all text-xs sm:text-sm"
        aria-label={`Clear ${stats.completedTodos} completed todo${
          stats.completedTodos > 1 ? "s" : ""
        }`}
      >
        <HiTrash className="h-4 w-4" />
        <span className="whitespace-nowrap">
          <span className="hidden sm:inline">Clear Completed </span>
          <span className="sm:hidden">Clear </span>
          ({stats.completedTodos})
        </span>
      </button>
    </div>
  );
});
