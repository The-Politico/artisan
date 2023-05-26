import { Command } from '@tauri-apps/api/shell';

import { resolveResource } from '@tauri-apps/api/path';
import store from '../../store';
import getEtag from '../../utils/fs/getEtag';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getIllustrationStatus from './getIllustrationStatus';
import { STATUS_ILLUSTRATION_NONEXISTENT } from '../../constants/statuses';
import shareProject from '../projects/shareProject';
import ids from '../../utils/ids';

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

  const status = await getIllustrationStatus(id);
  if (status === STATUS_ILLUSTRATION_NONEXISTENT) {
    return false;
  }

  const aiPath = await getIllustrationFilePath(id);
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

  const { project: projectId } = ids.parse(id);
  await shareProject(projectId);

  return true;
}
