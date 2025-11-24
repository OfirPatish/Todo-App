import { z } from "zod";
import { Todo } from "@/types/todo";
import { todosSchema } from "@/lib/schemas/todo.schema";
import { appConfig } from "@/config/app.config";

/**
 * Storage key for todos in localStorage
 */
const STORAGE_KEY = appConfig.storageKey;

/**
 * Custom error class for storage operations
 */
export class StorageError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * Migrates old todos to include priority field if missing
 * @param todos - Array of todos to migrate
 * @returns Migrated todos with priority field
 */
function migrateTodos(todos: unknown[]): Todo[] {
  return todos.map((todo: unknown) => {
    if (typeof todo === "object" && todo !== null) {
      const todoObj = todo as Record<string, unknown>;
      // Add priority if missing (default to medium)
      if (
        !todoObj.priority ||
        !["low", "medium", "high"].includes(todoObj.priority as string)
      ) {
        return { ...todoObj, priority: "medium" as const };
      }
      return todoObj;
    }
    return todo;
  }) as Todo[];
}

/**
 * Retrieves todos from localStorage with validation
 * @returns Array of validated todos
 * @throws {StorageError} If storage read fails or data is invalid
 */
export function getTodosFromStorage(): Todo[] {
  try {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    // Migrate old todos before validation
    const migrated = migrateTodos(Array.isArray(parsed) ? parsed : []);

    // Validate migrated todos
    const validated = todosSchema.parse(migrated);

    return validated;
  } catch (error) {
    // If validation fails, clear corrupted data
    if (error instanceof z.ZodError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Invalid todo data in storage, clearing...", error);
      }
      clearTodosFromStorage();
      return [];
    }

    throw new StorageError("Failed to read todos from storage", error);
  }
}

/**
 * Saves todos to localStorage with error handling
 * @param todos - Array of todos to save
 * @throws {StorageError} If storage write fails
 */
export function saveTodosToStorage(todos: Todo[]): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    // Validate before saving
    const validated = todosSchema.parse(todos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new StorageError("Invalid todo data provided", error);
    }

    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new StorageError(
        "Storage quota exceeded. Please delete some todos.",
        error
      );
    }

    throw new StorageError("Failed to save todos to storage", error);
  }
}

/**
 * Clears all todos from localStorage
 */
export function clearTodosFromStorage(): void {
  try {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    throw new StorageError("Failed to clear todos from storage", error);
  }
}
