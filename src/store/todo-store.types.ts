import { Todo, TodoPriority } from "@/types/todo";

/**
 * Core todo store state
 */
export interface TodoState {
  todos: Map<string, Todo>;
  isLoading: boolean;
  error: string | null;
  _initialized: boolean;
}

/**
 * Core CRUD actions for todos
 */
export interface TodoActions {
  initialize: () => void;
  addTodo: (text: string, priority?: TodoPriority) => Promise<void>;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (
    id: string,
    text: string,
    priority?: TodoPriority
  ) => Promise<void>;
  updateTodoPriority: (id: string, priority: TodoPriority) => void;
  clearCompleted: () => void;
  exportTodos: () => string;
  importTodos: (json: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Complete todo store interface
 */
export interface TodoStore extends TodoState, TodoActions {}
