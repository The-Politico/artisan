import { Command } from '@tauri-apps/api/shell';

import { resolveResource } from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/api/fs';
import store from '../../store';
import getEtag from '../../utils/fs/getEtag';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';

/**
 * Generates an HTML files and fallback images from an Adobe Illustrator
 * document (.ai) file.
 *
 * @param {string} projectSlug - The project slug.
 * @param {string} illustrationSlug - The illustration slug.
 *
 * @returns {Promise<void>} - A Promise that resolves after
 *  the generation is completed
 */
export default async function generateIllustration(id) {
  const aiScript = await resolveResource('resources/ai2html.js');
  const exportScript = await resolveResource('resources/exportArtboards.js');

  if (!aiScript || !exportScript) {
    // TODO: Should probabaly throw an error
    return false;
  }

  const aiPath = await getIllustrationFilePath(id);
  const aiPathExists = await exists(aiPath);

  // Can't generate it if the file doesn't exist
  if (!aiPathExists) {
    return false;
  }

  await new Promise((resolve, reject) => {
    const scriptCommand = new Command(
      'run-osascript',
      [
        '-e', 'tell application id "com.adobe.illustrator"',
        '-e', 'activate',
        '-e', `open POSIX file "${aiPath}" without dialogs`,
        '-e', `do javascript file "${aiScript}"`,
        '-e', 'delay 2',
        '-e', `do javascript file "${exportScript}"`,
        '-e', 'end tell',
      ],
    );

    const errors = [];

    scriptCommand.stderr.on('data', (line) => {
      errors.push(line);
    });

    scriptCommand.on('close', ({ code }) => {
      if (code === 1) {
        reject(new Error(errors.join('|')));
      }

      resolve();
    });

    scriptCommand.execute();
  });

  const fileVersion = await getEtag(aiPath);
  await store.illustrations.updateDict({
    [id]: {
      lastGeneratedVersion: {
        $set: fileVersion,
      },
      lastGeneratedDate: {
        $set: (new Date()).toISOString(),
      },
    },
  });

  return true;
}
