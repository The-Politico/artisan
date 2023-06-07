import { useState, useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { v4 as uuidv4 } from 'uuid';
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
    (async function updateSrc() {
      try {
        const hash = uuidv4().split('-')[0];
        const fallbackPath = await getLocalFallbackPath(id);
        const fallbackSrc = `${convertFileSrc(fallbackPath)}?${hash}`;
        setSrc(fallbackSrc);
      } catch (error) {
        /* Ignore Error */
      }
    }());
  }, [id, illoDetail]);

  return src;
}
