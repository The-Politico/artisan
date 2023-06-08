import { useState, useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { v4 as uuidv4 } from 'uuid';
import getLocalFallbackPath from '../utils/paths/getLocalFallbackPath';
import atoms from '../atoms';

/**
 * Proves a fallback image for the given illustration ID.
 *
 * @param {string} id - The illustration ID for which the fallback
 *  image should be used
 * @return {string} src - A URL for the fallback image
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
