"use client";

import { useState, FormEvent, useRef } from "react";
import { HiPlus, HiExclamationCircle } from "react-icons/hi";
import { TodoPriority } from "@/types/todo";
import { useTodoStore, useTodosLoading } from "@/store/todo-store";
import { getPriorityOptions, getPriorityConfig } from "@/lib/constants/priority-config";

/**
 * Input component for adding new todos
 * Uses Zustand store for state management
 * Includes validation and error handling with professional styling
 */
export function TodoInput() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const isLoading = useTodosLoading();

  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setError("Todo text cannot be empty");
      return;
    }

    try {
      await addTodo(trimmedValue, priority);
      setInputValue("");
      setPriority("medium");
      inputRef.current?.focus();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const isSubmitting = isLoading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent leading spaces - remove them immediately
    const value = e.target.value;
    const trimmedValue = value.trimStart();
    // Always set the trimmed value to prevent any leading spaces
    setInputValue(trimmedValue);
    if (error) setError(null);
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          {/* Main Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a new task..."
              className={`input input-lg input-bordered w-full ${
                error ? "input-error" : ""
              }`}
              value={inputValue}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-label="Todo input"
              aria-invalid={!!error}
              aria-describedby={error ? "todo-input-error" : undefined}
              maxLength={500}
            />
          </div>

          {/* Controls Row: Priority and Submit */}
          <div className="flex gap-2 sm:gap-2">
            {/* Priority Selector */}
            <div className="tooltip tooltip-top hidden sm:block" data-tip={getPriorityConfig(priority).label}>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-lg btn-ghost"
                  aria-label={`Select priority (current: ${getPriorityConfig(priority).label})`}
                >
                  {getPriorityConfig(priority).getIcon(undefined, getPriorityConfig(priority).iconColor)}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-200 rounded-box z-[1] mb-2 p-2 shadow-lg border border-base-300 min-w-[140px] mt-1"
                >
                  {getPriorityOptions().map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => setPriority(option.value)}
                        className={priority === option.value ? "active" : ""}
                        aria-label={`Set priority to ${option.label}`}
                      >
                        {option.getIcon(undefined, option.iconColor)}
                        <span>{option.shortLabel}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Priority Selector - Full Width */}
            <div className="tooltip tooltip-top sm:hidden" data-tip={getPriorityConfig(priority).label}>
              <div className="dropdown dropdown-bottom dropdown-left w-full">
                <label
                  tabIndex={0}
                  className="btn btn-lg btn-ghost w-full justify-center"
                  aria-label={`Select priority (current: ${getPriorityConfig(priority).label})`}
                >
                  {getPriorityConfig(priority).getIcon(undefined, getPriorityConfig(priority).iconColor)}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-200 rounded-box z-[1] mb-2 p-2 shadow-lg border border-base-300 min-w-[140px] mt-1"
                >
                  {getPriorityOptions().map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => setPriority(option.value)}
                        className={priority === option.value ? "active" : ""}
                        aria-label={`Set priority to ${option.label}`}
                      >
                        {option.getIcon(undefined, option.iconColor)}
                        <span>{option.shortLabel}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg gap-2 px-4 sm:px-6 font-semibold flex-1 sm:flex-none"
              disabled={isSubmitting || !inputValue.trim()}
              aria-label="Add todo"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <HiPlus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Task</span>
                  <span className="sm:hidden">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div
          id="todo-input-error"
          className="alert alert-error shadow-lg py-3 px-4"
          role="alert"
        >
          <HiExclamationCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}
