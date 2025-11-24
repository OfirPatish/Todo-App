/**
 * Loading fallback component displayed while todos are loading
 */
export function TodoLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
      <span className="loading loading-spinner loading-md sm:loading-lg text-primary" />
    </div>
  );
}

