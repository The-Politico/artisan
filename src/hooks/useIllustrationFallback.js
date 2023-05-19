import { useState, useEffect } from 'react';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { AWS_ARTISAN_BUCKET } from '../constants/aws';
import bytesToBase64 from '../utils/fs/bytesToBase64';
import s3 from '../utils/s3';
import getPreviewKey from '../utils/paths/getPreviewKey';
import getLocalFallbackPath from '../utils/paths/getLocalFallbackPath';

/**
 * Proves a fallback image for the given illustration ID.
 * It will first check if a fallback image exists for the
 * given ID, and if it does, it will load the image source
 * as base64 data.
 *
 * @param {string} id - The illustration ID for which the fallback i
 *  mage should be used
 * @return {string} src - The data URL of the fallback image,
 *  as a base64-encoded string
 */
export default function useIllustrationFallback(id) {
  const [src, setSrc] = useState();

  // TODO: Add some way to refresh this when there's a new generation?

  useEffect(() => {
    const effect = async () => {
      try {
        const fallbackPath = await getLocalFallbackPath(id);
        const content = await readBinaryFile(fallbackPath);
        setSrc(
          `data:image/png;base64,${bytesToBase64(content)}`,
        );
        return;
      } catch (error) { /* Ignore Error */ }

      try {
        const previewKey = await getPreviewKey(id);
        const content = await s3.download({
          bucket: AWS_ARTISAN_BUCKET,
          key: previewKey,
        });
        setSrc(
          `data:image/png;base64,${bytesToBase64(content)}`,
        );
      } catch (error) { /* Ignore Error */ }
    };

    effect();
  }, [id]);

  return src;
}
