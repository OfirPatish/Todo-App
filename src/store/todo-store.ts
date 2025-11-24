import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TodoStore } from "./todo-store.types";
import { createTodoCoreSlice } from "./todo-core-slice";

/**
 * Main todo store
 * Simplified version focusing on core CRUD operations
 * Devtools middleware is lightweight and only activates when Redux DevTools extension is present
 */
const storeCreator =
  process.env.NODE_ENV === "development"
    ? devtools(createTodoCoreSlice, { name: "todo-store" })
    : createTodoCoreSlice;

export const useTodoStore = create<TodoStore>()(
  storeCreator as typeof createTodoCoreSlice
);

// Re-export selectors for convenience
export * from "./todo-selectors";
