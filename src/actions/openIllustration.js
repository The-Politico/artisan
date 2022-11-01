import { Command } from '@tauri-apps/api/shell';
import { join } from '@tauri-apps/api/path';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

export default async function openIllustration(projectSlug, illustrationSlug) {
  const projectPath = await getWorkingProjectPath(projectSlug);

  const illustrationFilePath = await join(
    projectPath,
    illustrationSlug,
    `${illustrationSlug}.ai`,
  );

  const scriptCommand = new Command(
    'run-osascript',
    [
      '-e', 'tell application id "com.adobe.illustrator"',
      '-e', 'activate',
      '-e', `open POSIX file "${illustrationFilePath}" without dialogs`,
      '-e', 'end tell',
    ],
  );

  await scriptCommand.execute();
}
