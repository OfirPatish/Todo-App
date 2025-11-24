"use client";

import { memo } from "react";
import { HiViewList, HiCheckCircle, HiClock } from "react-icons/hi";

export type TodoFilter = "all" | "active" | "completed";

interface TodoFiltersProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
}

/**
 * Filter component for todos
 * Allows filtering by All, Active, or Completed
 */
export const TodoFilters = memo(function TodoFilters({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
}: TodoFiltersProps) {
  const filters: Array<{
    id: TodoFilter;
    label: string;
    icon: React.ReactElement;
  }> = [
    {
      id: "all",
      label: "All",
      icon: <HiViewList className="h-4 w-4" />,
    },
    {
      id: "active",
      label: "Active",
      icon: <HiClock className="h-4 w-4" />,
    },
    {
      id: "completed",
      label: "Completed",
      icon: <HiCheckCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`btn btn-sm sm:btn-sm gap-1.5 sm:gap-2 font-medium transition-all ${
              isActive
                ? "btn-primary shadow-md"
                : "btn-ghost hover:btn-primary hover:shadow-sm"
            }`}
            aria-label={`Filter by ${filter.label}`}
            aria-pressed={isActive}
          >
            {filter.icon}
            <span className="text-xs sm:text-sm">{filter.label}</span>
            {filter.id === "active" && activeCount > 0 && (
              <span className="badge badge-xs sm:badge-sm badge-primary badge-outline">
                {activeCount}
              </span>
            )}
            {filter.id === "completed" && completedCount > 0 && (
              <span className="badge badge-xs sm:badge-sm badge-success badge-outline">
                {completedCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
});
