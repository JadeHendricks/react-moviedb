import { useEffect, useState } from "react";

/**
 * True for `ms` after mount, then false. This keeps today's fixed-length loader overlay;
 * Phase 4 (D2) ties it to the queries instead. The timer is cleared on unmount, which the old
 * `clearTimeout(fn)` calls never did (B4).
 */
export const useTimedLoader = (ms: number): boolean => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
};
