/**
 * Footer component for the todo application
 * Displays attribution and technology stack
 */
export function TodoFooter() {
  return (
    <footer className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-14">
      <p className="text-xs sm:text-sm text-base-content/60 font-medium">
        Built with{" "}
        <span className="font-bold text-primary">Next.js</span> &{" "}
        <span className="font-bold text-secondary">DaisyUI</span>
      </p>
    </footer>
  );
}
