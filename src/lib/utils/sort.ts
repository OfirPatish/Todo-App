import { Todo } from "@/types/todo";

export type SortOption = "newest" | "oldest" | "alphabetical" | "priority";

/**
 * Priority order for sorting (high to low)
 */
const PRIORITY_ORDER: Record<Todo["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Sorts todos based on the selected sort option
 * @param todos - Array of todos to sort
 * @param sortOption - Sort option to apply
 * @returns Sorted array of todos
 */
export function sortTodos(todos: Todo[], sortOption: SortOption): Todo[] {
  const sorted = [...todos];

  switch (sortOption) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt - a.createdAt);

    case "oldest":
      return sorted.sort((a, b) => a.createdAt - b.createdAt);

    case "alphabetical":
      return sorted.sort((a, b) => a.text.localeCompare(b.text));

    case "priority":
      return sorted.sort((a, b) => {
        // First sort by priority (high to low)
        const priorityDiff =
          PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        // Then by creation date (newest first)
        return b.createdAt - a.createdAt;
      });

    default:
      return sorted;
  }
}
