import { useState, useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { AWS_ARTISAN_BUCKET } from '../constants/aws';
import bytesToBase64 from '../utils/fs/bytesToBase64';
import s3 from '../utils/s3';
import getPreviewKey from '../utils/paths/getPreviewKey';
import getLocalFallbackPath from '../utils/paths/getLocalFallbackPath';
import atoms from '../atoms';

/**
 * Proves a fallback image for the given illustration ID.
 * It will first check if a fallback image exists for the
 * given ID, and if it does, it will load the image source
 * as base64 data.
 *
 * @param {string} id - The illustration ID for which the fallback i
 *  mage should be used
 * @param {string} generatedTime - Last generated date time of the illustration
 * @return {string} src - The data URL of the fallback image,
 *  as a base64-encoded string
 */
export default function useIllustrationFallback(id) {
  const [src, setSrc] = useState();
  const illoDetail = atoms.useRecoilValue(
    atoms.illustrationDetail(id),
  );

  useEffect(() => {
    const effect = async () => {
      try {
        const fallbackPath = await getLocalFallbackPath(id);
        setSrc(convertFileSrc(fallbackPath));
        return;
      } catch (error) {
        /* Ignore Error */
      }

      try {
        const previewKey = await getPreviewKey(id);
        const content = await s3.download({
          bucket: AWS_ARTISAN_BUCKET,
          key: previewKey,
        });
        setSrc(`data:image/png;base64,${bytesToBase64(content)}`);
      } catch (error) {
        /* Ignore Error */
      }
    };

    effect();
  }, [id, illoDetail]);

  return src;
}
