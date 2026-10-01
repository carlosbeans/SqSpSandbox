import * as React from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll to the top on every route change (path or query
 * string), so navigating never leaves the new page scrolled mid-content.
 *
 * Skips when the location carries a hash — deep links like the DNS
 * nameservers redirect scroll themselves to a specific section (see
 * `src/pages/DNS_Settings.js`), and this would otherwise fight that.
 *
 * Also switches the browser's native scroll restoration to "manual" so
 * Back/Forward don't reintroduce the old offset after this hook has
 * already scrolled to the top.
 */
export function useScrollToTopOnNavigate() {
  const { pathname, search, hash } = useLocation();

  React.useEffect(() => {
    if (typeof window === "undefined" || !("scrollRestoration" in window.history)) {
      return;
    }
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);
}
