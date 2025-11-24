import { StateCreator } from "zustand";
import { Todo, TodoPriority } from "@/types/todo";
import { TodoStore, TodoState, TodoActions } from "./todo-store.types";
import {
  getTodosFromStorage,
  saveTodosToStorage,
} from "@/lib/storage/todo-storage";
import { validateTodoInput } from "@/lib/utils/validation";
import { handleError } from "@/lib/errors/error-handler";

/**
 * Core todo slice - handles CRUD operations and state management
 */
export const createTodoCoreSlice: StateCreator<
  TodoStore,
  [],
  [],
  TodoState & TodoActions
> = (set, get) => ({
  // Initial state
  todos: new Map(),
  isLoading: true,
  error: null,
  _initialized: false,

  initialize: () => {
    if (get()._initialized) return;

    try {
      const storedTodos = getTodosFromStorage();
      const todosMap = new Map<string, Todo>();
      storedTodos.forEach((todo) => {
        todosMap.set(todo.id, todo);
      });

      set({
        todos: todosMap,
        isLoading: false,
        _initialized: true,
      });
    } catch (err) {
      const errorMessage = handleError(err);
      set({ error: errorMessage, isLoading: false, _initialized: true });
      console.error("Failed to load todos:", err);
    }
  },

  addTodo: async (text: string, priority: TodoPriority = "medium") => {
    try {
      set({ error: null });
      const validatedText = validateTodoInput(text);

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: validatedText,
        completed: false,
        createdAt: Date.now(),
        priority,
      };

      set((state) => {
        const newTodos = new Map(state.todos);
        newTodos.set(newTodo.id, newTodo);
        saveTodosToStorage(Array.from(newTodos.values()));
        return { todos: newTodos };
      });
    } catch (err) {
      const errorMessage = handleError(err);
      set({ error: errorMessage });
      throw err;
    }
  },

  deleteTodo: (id: string) => {
    set({ error: null });
    set((state) => {
      const newTodos = new Map(state.todos);
      newTodos.delete(id);
      saveTodosToStorage(Array.from(newTodos.values()));
      return { todos: newTodos };
    });
  },

  toggleTodo: (id: string) => {
    set({ error: null });
    set((state) => {
      const todo = state.todos.get(id);
      if (!todo) return state;

      const newTodos = new Map(state.todos);
      newTodos.set(id, { ...todo, completed: !todo.completed });
      saveTodosToStorage(Array.from(newTodos.values()));
      return { todos: newTodos };
    });
  },

  updateTodo: async (id: string, text: string, priority?: TodoPriority) => {
    try {
      set({ error: null });
      const validatedText = validateTodoInput(text);

      set((state) => {
        const todo = state.todos.get(id);
        if (!todo) return state;

        // Check if anything actually changed
        const textChanged = todo.text !== validatedText;
        const priorityChanged =
          priority !== undefined && todo.priority !== priority;

        if (!textChanged && !priorityChanged) {
          return state;
        }

        const newTodos = new Map(state.todos);
        newTodos.set(id, {
          ...todo,
          text: validatedText,
          ...(priority && { priority }),
        });
        saveTodosToStorage(Array.from(newTodos.values()));
        return { todos: newTodos };
      });
    } catch (err) {
      const errorMessage = handleError(err);
      set({ error: errorMessage });
      throw err;
    }
  },

  updateTodoPriority: (id: string, priority: TodoPriority) => {
    set({ error: null });
    set((state) => {
      const todo = state.todos.get(id);
      if (!todo || todo.priority === priority) {
        return state;
      }

      const newTodos = new Map(state.todos);
      newTodos.set(id, { ...todo, priority });
      saveTodosToStorage(Array.from(newTodos.values()));
      return { todos: newTodos };
    });
  },

  clearCompleted: () => {
    set({ error: null });
    set((state) => {
      const newTodos = new Map(state.todos);
      Array.from(newTodos.entries()).forEach(([id, todo]) => {
        if (todo.completed) {
          newTodos.delete(id);
        }
      });
      saveTodosToStorage(Array.from(newTodos.values()));
      return { todos: newTodos };
    });
  },

  exportTodos: () => {
    const todos = Array.from(get().todos.values());
    return JSON.stringify(todos, null, 2);
  },

  importTodos: async (json: string) => {
    try {
      set({ error: null });
      const imported = JSON.parse(json);

      if (!Array.isArray(imported)) {
        throw new Error("Invalid import format");
      }

      set((state) => {
        const newTodos = new Map(state.todos);
        const existingIds = new Set(state.todos.keys());
        imported.forEach((todo: Todo) => {
          if (!existingIds.has(todo.id)) {
            newTodos.set(todo.id, todo);
          }
        });
        saveTodosToStorage(Array.from(newTodos.values()));
        return { todos: newTodos };
      });
    } catch (err) {
      const errorMessage = handleError(err);
      set({ error: errorMessage });
      throw err;
    }
  },

  clearError: () => {
    set({ error: null });
  },
});
