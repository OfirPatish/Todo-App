import { HiExclamationCircle } from "react-icons/hi";

interface TodoErrorDisplayProps {
  error: string;
  onClear: () => void;
}

/**
 * Error display component for showing todo-related errors
 *
 * @param error - The error message to display
 * @param onClear - Callback function to clear the error
 */
export function TodoErrorDisplay({
  error,
  onClear,
}: TodoErrorDisplayProps) {
  return (
    <div className="alert alert-error shadow-lg mb-3 sm:mb-4 py-2 sm:py-3" role="alert">
      <HiExclamationCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
      <span className="flex-1 text-sm sm:text-base break-words">{error}</span>
      <button
        className="btn btn-xs sm:btn-sm btn-ghost btn-circle shrink-0"
        onClick={onClear}
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}

