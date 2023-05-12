import { Command } from '@tauri-apps/api/shell';

import { resolveResource } from '@tauri-apps/api/path';
import store from '../../store';
import getEtag from '../fs/getEtag';
import {
  STATUS_ILLUSTRATION_NOT_GENERATED,
  STATUS_ILLUSTRATION_ARCHIVED,
} from '../../constants/statuses';
import getIllustrationStatus from './getIllustrationStatus';
import getIllustrationFilePath from '../paths/getIllustrationFilePath';

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
export default async function generateIllustration(
  id,
  { force = false } = {},
) {
  const aiScript = await resolveResource('ai2html.js');
  const exportScript = await resolveResource('exportArtboards.js');

  if (!aiScript || !exportScript) {
    // TODO: Should probabaly throw an error
    return false;
  }

  const status = await getIllustrationStatus(id);
  const aiPath = await getIllustrationFilePath(id);

  // If the file doesn't exist, you can't generate anything
  if (status === STATUS_ILLUSTRATION_ARCHIVED) {
    return false;
  }

  // Don't generate if the status isn't ready for one
  // (unless the force flag is on)
  if (status !== STATUS_ILLUSTRATION_NOT_GENERATED && !force) {
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
  await store.entities.updateDict({
    [id]: {
      version: {
        $set: fileVersion,
      },
    },
  });

  return true;
}
