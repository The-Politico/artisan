import { useState, useEffect } from 'react';
import { resolve } from '@tauri-apps/api/path';
import { exists, readBinaryFile } from '@tauri-apps/api/fs';
import { watch } from 'tauri-plugin-fs-watch-api';
import { ARCHIVE_PREVIEWS_DIRECTORY } from '../constants/paths';
import atoms from '../atoms';
import bytesToBase64 from '../utils/fs/bytesToBase64';
import createListenerSet from '../utils/listenerSet';

const listeners = createListenerSet();

/**
 * Proves a fallback image for the given illustration ID.
 * It will first check if a fallback image exists for the
 * given ID, and if it does, it will load the image source
 * as base64 data. It also sets up a listener to react to any changes
 * made to the fallback images.
 *
 * @param {string} id - The illustration ID for which the fallback i
 *  mage should be used
 * @return {string} src - The data URL of the fallback image,
 *  as a base64-encoded string
 */
export default function useIllustrationFallback(id) {
  const [src, setSrc] = useState();
  const settings = atoms.use.settings();
  const workingDirectory = settings['working-directory'];
  const fallbackImgName = `${id}.png`;

  useEffect(() => {
    const effect = async () => {
      const fallbackPath = await resolve(
        workingDirectory,
        `_${ARCHIVE_PREVIEWS_DIRECTORY}`,
        fallbackImgName,
      );

      const fallbackExists = await exists(fallbackPath);

      if (fallbackExists) {
        const content = await readBinaryFile(fallbackPath);
        setSrc(
          `data:image/png;base64,${bytesToBase64(content)}`,
        );
      }
    };

    const addListener = async () => {
      const previewsDirectory = await resolve(
        workingDirectory,
        `_${ARCHIVE_PREVIEWS_DIRECTORY}`,
      );

      listeners.add(
        id, () => watch(
          previewsDirectory,
          { recursive: false },
          async (events) => {
            events.forEach(({ path }) => {
              if (path.endsWith(fallbackImgName)) {
                effect();
              }
            });
          },
        ),
      );
    };

    effect();
    addListener();
  }, [id, workingDirectory]);

  return src;
}
