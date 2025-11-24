"use client";

import { useRef } from "react";
import { HiDownload, HiUpload } from "react-icons/hi";
import { useTodoStore } from "@/store/todo-store";

/**
 * Export/Import component for todos
 * Uses Zustand store for state management
 * Allows users to backup and restore their todos
 */
export function TodoExportImport() {
  const exportTodos = useTodoStore((state) => state.exportTodos);
  const importTodos = useTodoStore((state) => state.importTodos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const json = exportTodos();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `todos-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export todos:", error);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importTodos(text);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to import todos:", error);
    }
  };

  return (
    <div className="flex gap-1 sm:gap-1.5">
      <button
        onClick={handleExport}
        className="btn btn-md sm:btn-lg btn-ghost gap-1.5 sm:gap-2 font-medium hover:btn-primary border border-base-300"
        aria-label="Export todos"
      >
        <HiDownload className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Export</span>
      </button>
      <label className="btn btn-md sm:btn-lg btn-ghost gap-1.5 sm:gap-2 cursor-pointer font-medium hover:btn-primary border border-base-300">
        <HiUpload className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Import</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
          aria-label="Import todos"
        />
      </label>
    </div>
  );
}
