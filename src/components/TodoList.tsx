"use client";

import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { HiDocumentText } from "react-icons/hi";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-base-content/50">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-base-200 rounded-full mb-6 animate-pulse">
          <HiDocumentText className="h-12 w-12 text-base-content/30" />
        </div>
        <h3 className="text-xl font-semibold text-base-content/70 mb-2">
          No tasks yet
        </h3>
        <p className="text-sm text-base-content/50">
          Start by adding your first task above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          style={{
            animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
          }}
        >
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
