import { Todo } from "@/types/todo";

/**
 * Filters todos based on search query
 * Searches in todo text (case-insensitive)
 * @param todos - Array of todos to search
 * @param query - Search query string
 * @returns Filtered array of todos matching the query
 */
export function searchTodos(todos: Todo[], query: string): Todo[] {
  if (!query.trim()) {
    return todos;
  }

  const lowerQuery = query.toLowerCase().trim();
  return todos.filter((todo) => todo.text.toLowerCase().includes(lowerQuery));
}
