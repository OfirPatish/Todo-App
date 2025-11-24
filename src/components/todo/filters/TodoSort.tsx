"use client";

import { memo } from "react";
import { HiSortAscending, HiSortDescending, HiViewList } from "react-icons/hi";
import { SortOption } from "@/lib/utils/sort";

interface TodoSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

/**
 * Sort component for todos
 * Allows sorting by different criteria
 */
export const TodoSort = memo(function TodoSort({
  currentSort,
  onSortChange,
}: TodoSortProps) {
  const sortOptions: Array<{
    id: SortOption;
    label: string;
    icon: React.ReactElement;
  }> = [
    {
      id: "newest",
      label: "Newest First",
      icon: <HiSortDescending className="h-4 w-4" />,
    },
    {
      id: "oldest",
      label: "Oldest First",
      icon: <HiSortAscending className="h-4 w-4" />,
    },
    {
      id: "alphabetical",
      label: "A-Z",
      icon: <HiViewList className="h-4 w-4" />,
    },
    {
      id: "priority",
      label: "Priority",
      icon: <HiViewList className="h-4 w-4" />,
    },
  ];

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-md sm:btn-lg btn-ghost gap-1.5 sm:gap-2 font-medium hover:btn-primary border border-base-300"
        aria-label="Sort options"
      >
        <HiSortAscending className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Sort</span>
        <span className="sm:hidden text-xs">Sort</span>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-48 sm:w-52 p-2 shadow-lg border border-base-300 mt-1"
      >
        {sortOptions.map((option) => (
          <li key={option.id}>
            <button
              onClick={() => onSortChange(option.id)}
              className={`${currentSort === option.id ? "active" : ""}`}
              aria-label={`Sort by ${option.label}`}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
