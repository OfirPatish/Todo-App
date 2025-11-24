"use client";

import { memo, useState, useRef, useEffect } from "react";
import { TodoPriority } from "@/types/todo";
import { getRelativeTime } from "@/utils/dateFormat";
import { HiTrash, HiCheckCircle, HiPencil } from "react-icons/hi";
import { useTodoStore, useTodoById } from "@/store/todo-store";
import { getPriorityOptions } from "@/lib/constants/priority-config";

interface TodoItemProps {
  todoId: string;
}

/**
 * Individual todo item component
 * Uses Zustand store with selector - only re-renders when this specific todo changes
 * Supports inline editing on double-click
 */
export const TodoItem = memo(function TodoItem({ todoId }: TodoItemProps) {
  // Use selector to only subscribe to this specific todo
  const todo = useTodoById(todoId);

  // Get actions from store
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const updateTodoPriority = useTodoStore((state) => state.updateTodoPriority);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(() => todo?.text || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive display text: use editText when editing, otherwise use todo.text directly
  // This avoids the need to sync state in effects, following React best practices
  const displayText = isEditing ? editText : todo?.text || "";

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current && todo) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, todo]);

  if (!todo) return null;

  const handleDoubleClick = () => {
    if (!todo.completed) {
      setEditText(todo.text);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      try {
        await updateTodo(todo.id, trimmedText);
      } catch {
        setEditText(todo.text);
      }
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handlePriorityChange = (newPriority: TodoPriority) => {
    if (newPriority !== todo.priority) {
      updateTodoPriority(todo.id, newPriority);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
        todo.completed
          ? "border-base-300 bg-base-200 opacity-50"
          : "border-base-300 bg-base-100 hover:border-primary hover:shadow-lg"
      }`}
      role="listitem"
    >
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
          {/* Checkbox */}
          <label className="label cursor-pointer p-0 flex-shrink-0 mt-0.5 sm:mt-1">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-md sm:checkbox-lg transition-all hover:scale-110"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              aria-label={`Mark "${todo.text}" as ${
                todo.completed ? "incomplete" : "complete"
              }`}
            />
          </label>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="input input-bordered input-sm sm:input-sm w-full focus:input-primary"
                    maxLength={500}
                  />
                ) : (
                  <p
                    className={`text-sm sm:text-base md:text-lg font-semibold transition-all leading-relaxed break-words ${
                      todo.completed
                        ? "line-through text-base-content/40"
                        : "text-base-content cursor-pointer"
                    } ${!todo.completed ? "hover:text-primary" : ""}`}
                    onDoubleClick={handleDoubleClick}
                    title={!todo.completed ? "Double-click to edit" : undefined}
                  >
                    {displayText}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 sm:mt-3 flex-wrap">
                  <time
                    className="text-xs font-medium text-base-content/50 whitespace-nowrap"
                    dateTime={new Date(todo.createdAt).toISOString()}
                  >
                    {getRelativeTime(todo.createdAt)}
                  </time>
                  {!todo.completed && (
                    <div className="flex items-center gap-1">
                      {getPriorityOptions().map((option) => {
                        const isSelected = todo.priority === option.value;
                        return (
                          <div
                            key={option.value}
                            className="tooltip tooltip-top hidden sm:block"
                            data-tip={option.label}
                          >
                            <button
                              type="button"
                              onClick={() => handlePriorityChange(option.value)}
                              className={`btn btn-xs btn-circle ${
                                isSelected
                                  ? option.color
                                  : "btn-ghost opacity-50 hover:opacity-100"
                              } transition-all`}
                              aria-label={`Set priority to ${option.label}${
                                isSelected ? " (current)" : ""
                              }`}
                            >
                              {option.getIcon("h-3.5 w-3.5")}
                            </button>
                          </div>
                        );
                      })}
                      {/* Mobile: Show current priority badge */}
                      <div className="sm:hidden">
                        <div className="badge badge-sm badge-outline">
                          {getPriorityOptions().find((opt) => opt.value === todo.priority)?.shortLabel || "Med"}
                        </div>
                      </div>
                    </div>
                  )}
                  {todo.completed && (
                    <div className="badge badge-success badge-sm gap-1.5 font-medium">
                      <HiCheckCircle className="h-3 w-3" />
                      <span className="hidden sm:inline">Done</span>
                    </div>
                  )}
                  {!todo.completed && !isEditing && (
                    <div className="badge badge-ghost badge-sm gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium hidden sm:flex">
                      <HiPencil className="h-3 w-3" />
                      <span className="text-xs">Edit</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-ghost btn-sm sm:btn-sm btn-circle text-error opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-error hover:text-error-content flex-shrink-0"
                aria-label={`Delete todo: "${todo.text}"`}
              >
                <HiTrash className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
