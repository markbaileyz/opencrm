
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create the media query
    const mediaQuery = window.matchMedia(query);
    // Set the initial value
    setMatches(mediaQuery.matches);

    // Create a handler function for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change", handler);

    // Clean up function
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]); // Only re-run if the query changes

  return matches;
}
