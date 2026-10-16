import React from 'react';
import { tmdbImage, type ImageSize } from '../../api/tmdbClient';
import imageNotFound from '../../images/imageNotFound.jpg';

interface MediaImageProps {
  /** TMDB image path, e.g. "/abc.jpg". A missing path shows the bundled fallback image. */
  path: string | null | undefined;
  size?: ImageSize;
  className?: string;
  /** Pass the title or name. Undefined becomes an empty alt, never the string "undefined" (B23). */
  alt: string | undefined;
}

function MediaImage({ path, size = 'w500', className, alt }: MediaImageProps) {
  return <img src={path ? tmdbImage(path, size) : imageNotFound} className={className} alt={alt ?? ''} />;
}

export default MediaImage;