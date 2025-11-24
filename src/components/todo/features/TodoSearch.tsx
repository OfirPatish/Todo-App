"use client";

import { useState, useRef, useEffect } from "react";
import { HiSearch, HiX } from "react-icons/hi";

interface TodoSearchProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

/**
 * Search component for filtering todos
 * Provides real-time search functionality with professional styling
 */
export function TodoSearch({
  onSearchChange,
  placeholder = "Search todos...",
}: TodoSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearchChange(query);
  }, [query, onSearchChange]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent leading spaces - remove them immediately
    const value = e.target.value;
    const trimmedValue = value.trimStart();
    // Always set the trimmed value to prevent any leading spaces
    setQuery(trimmedValue);
  };

  return (
    <div className="form-control">
      <label className="label relative">
        <HiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-base-content/60 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="input input-bordered input-md sm:input-lg w-full pl-10 sm:pl-12 pr-10 sm:pr-12 focus:input-primary text-sm sm:text-base"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Search todos"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
            aria-label="Clear search"
          >
            <HiX className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        )}
      </label>
      {query && (
        <div className="label py-1">
          <span className="label-text-alt text-base-content/50 text-xs">
            Press <kbd className="kbd kbd-xs">Esc</kbd> to clear
          </span>
        </div>
      )}
    </div>
  );
}
