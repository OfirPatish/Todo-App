import { Suspense, useState, useEffect, useMemo } from "react";
import { TodoInput, TodoList, TodoStats, TodoSearch } from "../features";
import { TodoFilters, TodoFilter, TodoActions } from "../filters";
import { TodoSort } from "../filters/TodoSort";
import { TodoExportImport } from "../actions/TodoExportImport";
import { TodoErrorDisplay } from "../feedback/TodoErrorDisplay";
import { TodoLoadingFallback } from "../feedback/TodoLoadingFallback";
import { SortOption } from "@/lib/utils/sort";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useTodoStore, useTodosStats, useTodosError } from "@/store/todo-store";
import { KeyboardShortcuts } from "@/components/ui";

/**
 * Main container component for todo functionality
 * Uses Zustand store for optimized state management
 */
export function TodoContainer() {
  // Initialize store on mount - only once
  const initialize = useTodoStore((state) => state.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Use selectors for optimized re-renders
  const todosMap = useTodoStore((state) => state.todos);
  const error = useTodosError();
  const stats = useTodosStats();

  // Get actions from store
  const clearError = useTodoStore((state) => state.clearError);

  const [filter, setFilter] = useState<TodoFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Convert Map to array - Zustand will only trigger when Map actually changes
  const todos = useMemo(() => Array.from(todosMap.values()), [todosMap]);
  const hasTodos = todos.length > 0;

  // Get todo IDs
  const todoIds = useMemo(() => todos.map((todo) => todo.id), [todos]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onFocusSearch: () => {
      const input = document.querySelector(
        '[aria-label="Search todos"]'
      ) as HTMLInputElement;
      input?.focus();
      // Cursor position and trimming handled by onFocus handler in TodoSearch component
    },
    onAddTodo: () => {
      const input = document.querySelector(
        '[aria-label="Todo input"]'
      ) as HTMLInputElement;
      input?.focus();
      // Cursor position and trimming handled by onFocus handler in TodoInput component
    },
  });

  return (
    <main className="card bg-base-100 shadow-2xl border-2 border-base-300/50 rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="card-body p-4 sm:p-6 md:p-8 lg:p-10">
        {error && <TodoErrorDisplay error={error} onClear={clearError} />}

        {/* Add Todo Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <TodoInput />
          {/* Show keyboard shortcuts hint on larger screens */}
          <div className="mt-2 sm:mt-3">
            <KeyboardShortcuts />
          </div>
        </div>

        {hasTodos && (
          <>
            {/* Search and Controls Section */}
            <div className="mb-6 space-y-3 sm:space-y-4">
              {/* Search, Sort, and Export/Import Row */}
              <div className="flex gap-2 sm:gap-3 items-start">
                <div className="flex-1">
                  <TodoSearch
                    onSearchChange={setSearchQuery}
                    placeholder="Search todos..."
                  />
                </div>
                <div className="flex flex-shrink-0 gap-1.5 sm:gap-2 pt-0.5">
                  <TodoSort
                    currentSort={sortOption}
                    onSortChange={setSortOption}
                  />
                  <TodoExportImport />
                </div>
              </div>

              {/* Filters - Full width on mobile, inline on larger screens */}
              <div className="w-full pt-2 border-t border-base-300">
                <TodoFilters
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  activeCount={stats.remainingTodos}
                  completedCount={stats.completedTodos}
                />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-base-300 to-transparent" />
                <span className="text-xs sm:text-xs font-bold text-base-content/60 uppercase tracking-widest px-2 sm:px-3">
                  Your Tasks
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-base-300 to-transparent" />
              </div>
            </div>
          </>
        )}

        {/* Todo List */}
        <Suspense fallback={<TodoLoadingFallback />}>
          <TodoList
            todoIds={todoIds}
            filter={filter}
            sortOption={sortOption}
            searchQuery={searchQuery}
          />
        </Suspense>

        {hasTodos && (
          <>
            {/* Actions and Stats Section */}
            <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t-2 border-base-300 space-y-4 sm:space-y-5 md:space-y-6">
              <TodoActions />
              <TodoStats />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
