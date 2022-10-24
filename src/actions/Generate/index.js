import { Command } from '@tauri-apps/api/shell';

import { join, resolveResource } from '@tauri-apps/api/path';

import getProjectsFolder from '../../utils/get-projects-folder';

export default async function Generate(projectSlug, illustrationSlug) {
  const illoFile = `${illustrationSlug}.ai`;
  const projectsFolder = await getProjectsFolder();

  const illustrationFilePath = await join(
    projectsFolder,
    projectSlug,
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
