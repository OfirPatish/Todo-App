"use client";

import { Todo } from "@/types/todo";
import { getRelativeTime } from "@/utils/dateFormat";
import { HiTrash } from "react-icons/hi";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-base-200 rounded-xl border-2 border-base-300 
        hover:border-primary hover:shadow-lg hover:scale-[1.02] 
        transition-all duration-300 ease-out
        ${todo.completed ? "opacity-60 scale-95" : ""}`}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-primary checkbox-md sm:checkbox-lg transition-transform hover:scale-110"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="flex-1 min-w-0">
        <span
          className={`block text-sm sm:text-base font-medium transition-all duration-300 ${
            todo.completed
              ? "line-through text-base-content/40"
              : "text-base-content"
          }`}
        >
          {todo.text}
        </span>
        <span className="text-xs text-base-content/40 mt-1 block">
          {getRelativeTime(todo.createdAt)}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="btn btn-ghost btn-sm btn-circle text-error sm:opacity-0 sm:group-hover:opacity-100 
          transition-opacity duration-200 hover:bg-error hover:text-error-content flex-shrink-0"
        aria-label="Delete todo"
      >
        <HiTrash className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
