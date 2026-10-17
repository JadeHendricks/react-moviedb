import React from 'react';
import { tmdbImage, type ImageSize } from '../../api/tmdbClient';
import imageNotFound from '../../images/imageNotFound.jpg';

interface MediaImageProps {
  /** TMDB image path, e.g. "/abc.jpg". A missing path shows the bundled fallback image. */
  path: string | null | undefined;
  size?: ImageSize;
  /** Pixel widths offered to the browser as a srcset ([300, 780] -> w300 300w, w780 780w). `size` stays the src fallback. */
  widths?: readonly number[];
  /** The `sizes` attribute that goes with `widths`: how wide the image is drawn at each breakpoint. */
  sizes?: string;
  className?: string;
  /** Pass the title or name. Undefined becomes an empty alt, never the string "undefined" (B23). */
  alt: string | undefined;
}

function MediaImage({ path, size = 'w500', widths, sizes, className, alt }: MediaImageProps) {
  // The bundled fallback is a single local file, so it gets no srcset.
  const srcSet =
    path && widths && widths.length > 0
      ? widths.map((width) => `${tmdbImage(path, `w${width}`)} ${width}w`).join(', ')
      : undefined;
  return (
    <img
      src={path ? tmdbImage(path, size) : imageNotFound}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      className={className}
      alt={alt ?? ''}
    />
  );
}

export default MediaImage;
