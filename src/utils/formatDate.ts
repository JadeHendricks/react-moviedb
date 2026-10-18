// Fixed English list on purpose: Intl 'en-GB' prints "Sept" for September, moment printed "Sep".
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/** Shown for a missing or invalid date (D5); moment used to print "Invalid date". */
export const NO_DATE = '\u2014';

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/;

/**
 * Formats a TMDB date ("2024-10-02") as "02 Oct 2024", the same as moment's "DD MMM YYYY".
 * Missing, empty or impossible dates (e.g. "2024-02-30") give an em dash.
 */
export const formatDate = (value: string | null | undefined): string => {
  const match = value ? ISO_DATE.exec(value) : null;
  if (!match) return NO_DATE;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  // Round-trip through Date so 31 Feb or month 13 are rejected instead of rolling over.
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    return NO_DATE;
  }
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${match[1]}`;
};

/** Movies carry `release_date`, series carry `first_air_date`; either may be an empty string (B12). */
export const releaseDateOf = (item: { release_date?: string | null; first_air_date?: string | null }): string =>
  formatDate(item.release_date || item.first_air_date);
