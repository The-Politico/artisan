import { Command } from '@tauri-apps/api/shell';
import { join } from '@tauri-apps/api/path';

import getProjectsFolder from '../../utils/get-projects-folder';

export default async function OpenIllustration(projectSlug, illustrationSlug) {
  const projectsFolder = await getProjectsFolder();
  const illoFile = `${illustrationSlug}.ai`;

  const illustrationFilePath = await join(
    projectsFolder,
    projectSlug,
    illustrationSlug,
    illoFile,
  );

  const scriptCommand = await new Command(
    'run-osascript',
    [
      '-e', 'tell application id "com.adobe.illustrator"',
      '-e', 'activate',
      '-e', `open POSIX file "${illustrationFilePath}" without dialogs`,
      '-e', 'end tell',
    ],
  );

  scriptCommand.execute();
}
