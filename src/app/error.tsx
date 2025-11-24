"use client";

import { useEffect } from "react";
import { HiExclamationCircle } from "react-icons/hi";

/**
 * Error UI component for Next.js error boundaries
 * Automatically shown when an error occurs in the app directory
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <HiExclamationCircle className="h-16 w-16 text-error" />
          </div>
          <h2 className="card-title justify-center text-2xl mb-2">
            Something went wrong
          </h2>
          <p className="text-base-content/70 mb-4">
            {process.env.NODE_ENV === "development"
              ? error.message
              : "An unexpected error occurred. Please try again."}
          </p>
          <div className="card-actions justify-center gap-2">
            <button className="btn btn-primary" onClick={reset}>
              Try Again
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

