import type { MediaType } from '../api/queries';

/** A list row is a series only when it says so; person credits and untagged rows are movies. */
export const mediaTypeOf = (item: { media_type?: string }): MediaType => (item.media_type === 'tv' ? 'tv' : 'movie');

/**
 * Detail page of a title (D1). Movies keep the old `/movieSummary/:id`, so existing links still work;
 * series get `/seriesSummary/:id`, so the type no longer depends on which tab was open (B9).
 */
export const detailPath = (type: MediaType, id: string | number | undefined): string =>
  `/${type === 'tv' ? 'seriesSummary' : 'movieSummary'}/${id}`;