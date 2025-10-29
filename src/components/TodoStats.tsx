"use client";

import { Todo } from "@/types/todo";
import { HiClipboardList, HiCheckCircle, HiClock } from "react-icons/hi";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;
  const completionPercentage =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-base-content/70">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>
        <progress
          className="progress progress-primary w-full h-3"
          value={completedTodos}
          max={totalTodos}
        ></progress>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total */}
        <div className="stats shadow bg-base-200">
          <div className="stat p-3 sm:p-4">
            <div className="stat-figure text-primary">
              <HiClipboardList className="h-8 w-8" />
            </div>
            <div className="stat-title text-xs">Total</div>
            <div className="stat-value text-2xl text-primary">{totalTodos}</div>
          </div>
        </div>

        {/* Completed */}
        <div className="stats shadow bg-base-200">
          <div className="stat p-3 sm:p-4">
            <div className="stat-figure text-success">
              <HiCheckCircle className="h-8 w-8" />
            </div>
            <div className="stat-title text-xs">Done</div>
            <div className="stat-value text-2xl text-success">
              {completedTodos}
            </div>
          </div>
        </div>

        {/* Remaining */}
        <div className="stats shadow bg-base-200">
          <div className="stat p-3 sm:p-4">
            <div className="stat-figure text-warning">
              <HiClock className="h-8 w-8" />
            </div>
            <div className="stat-title text-xs">Left</div>
            <div className="stat-value text-2xl text-warning">
              {remainingTodos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
