"use client";

import { useState, FormEvent } from "react";
import { HiPlus } from "react-icons/hi";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddTodo(trimmedValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
      <input
        type="text"
        placeholder="What do you need to do today?"
        className="input input-bordered input-md sm:input-lg flex-1 focus:input-primary transition-all duration-200"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary btn-md sm:btn-lg gap-2"
        aria-label="Add todo"
      >
        <HiPlus className="h-5 w-5" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
