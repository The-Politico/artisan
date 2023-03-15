import { Command } from '@tauri-apps/api/shell';

import { join, resolveResource } from '@tauri-apps/api/path';
import getWorkingProjectPath from '../paths/getWorkingProjectPath';

/**
 * Generates an HTML files and fallback images from an Adobe Illustrator
 * document (.ai) file.

 * @param {string} projectSlug - The project slug.
 * @param {string} illustrationSlug - The illustration slug.
 *
 * @returns {Promise<void>} - A Promise that resolves after
 *  the generation is completed
 */
export default async function generateIllustration(
  projectSlug, illustrationSlug,
) {
  const illoFile = `${illustrationSlug}.ai`;
  const projectPath = await getWorkingProjectPath(projectSlug);

  const illustrationFilePath = await join(
    projectPath,
    illustrationSlug,
    illoFile,
  );

  const aiScript = await resolveResource('ai2html.js');
  const exportScript = await resolveResource('exportArtboards.js');

  if (aiScript) {
    const scriptCommand = await new Command(
      'run-osascript',
      [
        '-e', 'tell application id "com.adobe.illustrator"',
        '-e', 'activate',
        '-e', `open POSIX file "${illustrationFilePath}" without dialogs`,
        '-e', `do javascript file "${aiScript}"`,
        '-e', 'delay 5',
        '-e', `do javascript file "${exportScript}"`,
        '-e', 'end tell',
      ],
    );

    scriptCommand.execute();
  }
}
