import { useTodoStore } from "./todo-store";
import { useMemo } from "react";

/**
 * Selectors for optimized re-renders
 * These hooks only re-render when their specific data changes
 */

/**
 * Get a single todo by ID
 */
export const useTodoById = (id: string) =>
  useTodoStore((state) => state.todos.get(id));

/**
 * Get statistics about todos (total, completed, remaining, completion percentage)
 * Uses memoization to prevent SSR issues
 */
export const useTodosStats = () => {
  const todosMap = useTodoStore((state) => state.todos);

  return useMemo(() => {
    const todos = Array.from(todosMap.values());
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const remainingTodos = totalTodos - completedTodos;
    const completionPercentage =
      totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return {
      totalTodos,
      completedTodos,
      remainingTodos,
      completionPercentage,
    };
  }, [todosMap]);
};

/**
 * Get error state
 */
export const useTodosError = () => useTodoStore((state) => state.error);

/**
 * Get loading state
 */
export const useTodosLoading = () => useTodoStore((state) => state.isLoading);

