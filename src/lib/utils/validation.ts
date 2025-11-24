import { todoInputSchema } from "@/lib/schemas/todo.schema";
import { ValidationError } from "@/lib/errors/error-handler";

/**
 * Validates todo input text
 * @param text - The text to validate
 * @returns Validated and trimmed text
 * @throws {ValidationError} If validation fails
 */
export function validateTodoInput(text: string): string {
  try {
    const result = todoInputSchema.safeParse({ text });
    if (!result.success) {
      const firstError = result.error.issues[0];
      throw new ValidationError(firstError?.message || "Invalid todo input");
    }
    return result.data.text;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError("Failed to validate todo input", error);
  }
}
