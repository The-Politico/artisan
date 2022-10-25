import { WebviewWindow } from '@tauri-apps/api/window';
import { readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

import { getStoreValue, updateStoreValue } from '../../store';

import getProjectsFolder from '../../utils/get-projects-folder';

import { PREVIEW_PORT } from '../../constants/buckets';

export default async function Preview(projectSlug) {
  await updateStoreValue('active-project', projectSlug);

  const projectsFolder = await getProjectsFolder();
  const projectDir = await join(projectsFolder, projectSlug);
  const entries = await readDir(projectDir, {
    recursive: true,
  });

  const command = new Command(
    'start-local-server',
    ['-m', 'http.server', PREVIEW_PORT],
    { cwd: projectDir },
  );

  const illoPaths = [];

  entries.forEach((entry) => {
    if ('children' in entry) {
      const outputPath = `${entry.path}/ai2html-output/`;
      illoPaths.push(outputPath);
    }
  });

  const currentActiveProcess = await getStoreValue('active-preview-process');

  if (currentActiveProcess) {
    throw new Error('There is already an active process!');
  }
  const childProcess = await command.spawn();

  updateStoreValue(
    'active-preview-process',
    childProcess.pid,
    { override: true },
  );

  setTimeout(() => {
    const webview = new WebviewWindow(
      'embed-preview',
      { url: 'src/actions/Preview/PreviewWindow/index.html' },
    );

    webview.once('tauri://error', (error) => {
      console.log(error);
    });

    webview.once('tauri://close-requested', async () => {
      const killCommand = new Command(
        'kill-process',
        String(childProcess.pid),
      );
      await killCommand.spawn();
      await updateStoreValue('active-preview-process', null);
    });
  }, 1000);
}
