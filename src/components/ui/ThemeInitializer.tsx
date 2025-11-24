/**
 * Theme Initializer Script
 * Prevents FART (Flash of Unstyled Content) by setting theme before render
 * This script runs inline to ensure theme is applied immediately
 */
export function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              // Fallback if localStorage is not available
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `,
      }}
    />
  );
}
