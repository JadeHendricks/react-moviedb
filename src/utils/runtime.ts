import { NO_DATE } from './formatDate';

/**
 * Movies have `runtime` (minutes); series have `episode_run_time`, an array that may be empty (B13).
 * Gives "45mins" or an em dash, never "mins" or "45,60mins".
 */
export const runtimeLabel = (details: { runtime?: number | null; episode_run_time?: number[] | null }): string => {
  const minutes = details.runtime || details.episode_run_time?.[0];
  return minutes ? `${minutes}mins` : NO_DATE;
};