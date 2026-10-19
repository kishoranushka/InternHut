export const THEME_STORAGE_KEY = "theme";

/**
 * Runs during HTML parsing, before first paint: applies the saved theme, or the
 * OS preference when nothing is saved, so the page never flashes the wrong theme.
 */
const SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeScript() {
  // Executable only in the server HTML; inert on client renders (silences React's
  // "script tag while rendering" dev warning, per Next's preventing-flash guide).
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
