/**
 * Application configuration
 * Centralizes app-wide configuration values
 */
export const appConfig = {
  /**
   * Maximum length for todo text
   */
  maxTodoLength: 500,

  /**
   * Minimum length for todo text
   */
  minTodoLength: 1,

  /**
   * Storage key for todos in localStorage
   */
  storageKey: "todos",
} as const;

