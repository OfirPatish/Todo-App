import { z } from "zod";
import { appConfig } from "@/config/app.config";

/**
 * Priority levels for todos
 */
export const todoPrioritySchema = z.enum(["low", "medium", "high"]);

/**
 * Schema for validating Todo objects
 * @see {@link Todo} for the corresponding TypeScript type
 */
export const todoSchema = z.object({
  id: z.string().uuid("Invalid todo ID format"),
  text: z
    .string()
    .min(
      appConfig.minTodoLength,
      `Todo text must be at least ${appConfig.minTodoLength} character`
    )
    .max(
      appConfig.maxTodoLength,
      `Todo text cannot exceed ${appConfig.maxTodoLength} characters`
    )
    .trim(),
  completed: z.boolean(),
  createdAt: z.number().int().positive("Created timestamp must be positive"),
  priority: todoPrioritySchema.default("medium"),
});

/**
 * Schema for validating an array of todos
 */
export const todosSchema = z.array(todoSchema);

/**
 * Schema for validating todo input (when creating a new todo)
 */
export const todoInputSchema = z.object({
  text: z
    .string()
    .min(
      appConfig.minTodoLength,
      `Todo text must be at least ${appConfig.minTodoLength} character`
    )
    .max(
      appConfig.maxTodoLength,
      `Todo text cannot exceed ${appConfig.maxTodoLength} characters`
    )
    .trim(),
  priority: todoPrioritySchema.default("medium"),
});

/**
 * Type inference from Zod schema
 */
export type TodoInput = z.infer<typeof todoInputSchema>;
