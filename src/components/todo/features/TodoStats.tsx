"use client";

import { memo } from "react";
import { HiClipboardList, HiCheckCircle, HiClock } from "react-icons/hi";
import { useTodosStats } from "@/store/todo-store";

/**
 * Statistics component displaying todo completion metrics
 * Uses store selector - only re-renders when stats change
 */
export const TodoStats = memo(function TodoStats() {
  const stats = useTodosStats();

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Progress Section */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-bold text-base-content/80 uppercase tracking-wider">
            Overall Progress
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-primary">
            {stats.completionPercentage}%
          </span>
        </div>
        <progress
          className="progress progress-primary w-full h-3 sm:h-4 shadow-inner"
          value={stats.completedTodos}
          max={stats.totalTodos}
          aria-label={`${stats.completionPercentage}% of todos completed`}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total */}
        <div className="stat bg-gradient-to-br from-base-200 to-base-300 rounded-lg sm:rounded-xl shadow-md border border-base-300 py-3 sm:py-4">
          <div className="stat-figure text-primary">
            <HiClipboardList className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" aria-hidden="true" />
          </div>
          <div className="stat-title text-xs font-bold text-base-content/70 uppercase tracking-wide">
            Total Tasks
          </div>
          <div className="stat-value text-2xl sm:text-3xl font-extrabold text-primary">
            {stats.totalTodos}
          </div>
        </div>

        {/* Completed */}
        <div className="stat bg-gradient-to-br from-base-200 to-base-300 rounded-lg sm:rounded-xl shadow-md border border-base-300 py-3 sm:py-4">
          <div className="stat-figure text-success">
            <HiCheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" aria-hidden="true" />
          </div>
          <div className="stat-title text-xs font-bold text-base-content/70 uppercase tracking-wide">
            Completed
          </div>
          <div className="stat-value text-2xl sm:text-3xl font-extrabold text-success">
            {stats.completedTodos}
          </div>
        </div>

        {/* Remaining */}
        <div className="stat bg-gradient-to-br from-base-200 to-base-300 rounded-lg sm:rounded-xl shadow-md border border-base-300 py-3 sm:py-4">
          <div className="stat-figure text-warning">
            <HiClock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" aria-hidden="true" />
          </div>
          <div className="stat-title text-xs font-bold text-base-content/70 uppercase tracking-wide">
            Remaining
          </div>
          <div className="stat-value text-2xl sm:text-3xl font-extrabold text-warning">
            {stats.remainingTodos}
          </div>
        </div>
      </div>
    </div>
  );
});
