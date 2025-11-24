"use client";

import { memo, useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { HiDocumentText, HiSparkles } from "react-icons/hi";
import { TodoFilter } from "../filters/TodoFilters";
import { SortOption, sortTodos } from "@/lib/utils/sort";
import { searchTodos } from "@/lib/utils/search";
import { useTodoStore } from "@/store/todo-store";
import { Todo } from "@/types/todo";

interface TodoListProps {
  todoIds: string[];
  filter: TodoFilter;
  sortOption: SortOption;
  searchQuery: string;
}

/**
 * Empty state component for when there are no todos
 */
const EmptyState = memo(function EmptyState({
  filter,
  searchQuery,
}: {
  filter: TodoFilter;
  searchQuery: string;
}) {
  if (searchQuery) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-base-200 to-base-300 rounded-full mb-4 sm:mb-5 md:mb-6 shadow-inner">
          <HiDocumentText className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-base-content/30" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2 sm:mb-3">
          No results found
        </h3>
        <p className="text-sm sm:text-base text-base-content/60 mb-4 sm:mb-6 max-w-sm mx-auto px-4">
          No todos match your search query &quot;{searchQuery}&quot;
        </p>
      </div>
    );
  }

  const messages = {
    all: {
      title: "No tasks yet",
      description: "Start by adding your first task above to get organized",
    },
    active: {
      title: "No active tasks",
      description: "All your tasks are completed! Great job! 🎉",
    },
    completed: {
      title: "No completed tasks",
      description: "Complete some tasks to see them here",
    },
  };

  const message = messages[filter];

  return (
    <div className="text-center py-12 sm:py-16 md:py-20">
      <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-base-200 to-base-300 rounded-full mb-4 sm:mb-5 md:mb-6 shadow-inner">
        <HiDocumentText className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-base-content/30" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2 sm:mb-3">
        {message.title}
      </h3>
      <p className="text-sm sm:text-base text-base-content/60 mb-4 sm:mb-6 max-w-sm mx-auto px-4">
        {message.description}
      </p>
      {filter === "all" && (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-base-content/40 px-4">
          <HiSparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Your tasks will appear here</span>
        </div>
      )}
    </div>
  );
});

/**
 * List component for displaying todos
 * Uses store selectors for optimized rendering
 *
 * @param todoIds - Array of todo IDs to display
 * @param filter - Current filter to apply
 * @param sortOption - Current sort option
 * @param searchQuery - Current search query
 */
export const TodoList = memo(function TodoList({
  todoIds,
  filter,
  sortOption,
  searchQuery,
}: TodoListProps) {
  // Get todos from store using selector
  const todosMap = useTodoStore((state) => state.todos);

  // Filter, search, and sort todos
  const processedTodoIds = useMemo(() => {
    // Convert IDs to todos
    const todos = todoIds
      .map((id) => todosMap.get(id))
      .filter((todo): todo is Todo => todo !== undefined);

    // First filter by status
    let filtered = todos;
    switch (filter) {
      case "active":
        filtered = todos.filter((todo) => !todo.completed);
        break;
      case "completed":
        filtered = todos.filter((todo) => todo.completed);
        break;
      default:
        filtered = todos;
    }

    // Then search
    const searched = searchTodos(filtered, searchQuery);

    // Finally sort
    const sorted = sortTodos(searched, sortOption);

    // Return IDs only
    return sorted.map((todo) => todo.id);
  }, [todoIds, todosMap, filter, searchQuery, sortOption]);

  // Memoize the list rendering
  const todoItems = useMemo(
    () =>
      processedTodoIds.map((id) => (
        <div
          key={id}
          className="transition-opacity duration-300 ease-out opacity-100"
        >
          <TodoItem todoId={id} />
        </div>
      )),
    [processedTodoIds],
  );

  if (processedTodoIds.length === 0) {
    return <EmptyState filter={filter} searchQuery={searchQuery} />;
  }

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4" role="list" aria-label="Todo list">
      {todoItems}
    </div>
  );
});
