import { useEffect, useState } from "react";

/** Shortest time the loader stays up, so a fast (cached) page does not flash it for a frame (D2). */
export const MIN_LOADER_MS = 400;

/**
 * True while the page's queries are pending, and for at least `minMs` after the page (or `resetKey`) appeared.
 * It replaces the fixed 3-4 s timers: the loader follows the data (D2). `resetKey` identifies what the page
 * shows (e.g. "movie-101"), so opening another title brings the loader back, which the old code never did (B4).
 * The timer is cleared on unmount and on every key change, so nothing sets state after unmount (B4).
 */
export const useLoadingOverlay = (isPending: boolean, resetKey: string, minMs: number = MIN_LOADER_MS): boolean => {
  // The key the minimum time has already run out for. Different from `resetKey` means it has not.
  const [elapsedFor, setElapsedFor] = useState<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setElapsedFor(resetKey), minMs);
    return () => clearTimeout(timer);
  }, [resetKey, minMs]);
  return isPending || elapsedFor !== resetKey;
};