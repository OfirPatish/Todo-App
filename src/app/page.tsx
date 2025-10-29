"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { TodoStats } from "@/components/TodoStats";
import { HiClipboardCheck } from "react-icons/hi";

export default function Home() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl shadow-lg mb-3 sm:mb-4">
            <HiClipboardCheck className="h-7 w-7 sm:h-8 sm:w-8 text-primary-content" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-2">
            Todo App
          </h1>
          <p className="text-sm sm:text-base text-base-content/60">
            Stay organized and get things done
          </p>
        </div>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <TodoInput onAddTodo={addTodo} />

            <div className="divider my-2"></div>

            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />

            {todos.length > 0 && (
              <>
                <div className="divider my-2"></div>
                <TodoStats todos={todos} />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-base-content/50 text-xs sm:text-sm">
          <p>Built with Next.js & DaisyUI</p>
        </div>
      </div>
    </div>
  );
}
