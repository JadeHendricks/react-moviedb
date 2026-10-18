/** Cuts `text` to `max` characters and adds "..."; replaces the three copies of contentTrimmer. */
export const truncate = (text: string | null | undefined, max: number): string => {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
};
