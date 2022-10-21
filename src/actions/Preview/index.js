import { WebviewWindow } from '@tauri-apps/api/window';
import { readDir } from '@tauri-apps/api/fs';
import { documentDir, join } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

import { getStoreValue, updateStoreValue } from '../../store';

export default async function Preview(projectSlug) {
  const docsPath = await documentDir();
  const projectDir = await join(docsPath, 'Artisan', 'Projects', projectSlug);
  const entries = await readDir(projectDir, {
    recursive: true,
  });

  const command = new Command(
    'start-local-server',
    ['-m', 'http.server', '8080'],
    { cwd: projectDir },
  );

  const illoPaths = [];

  entries.forEach((entry) => {
    if ('children' in entry) {
      const outputPath = `${entry.path}/ai2html-output/`;
      illoPaths.push(outputPath);
    }
  });

  let activeProcess = await getStoreValue('active-preview-process');

  if (activeProcess) {
    const killCommand = new Command('kill-process', String(activeProcess));
    await killCommand.spawn();
  }
  const childProcess = await command.spawn();

  updateStoreValue('active-preview-process',
    childProcess.pid, { override: true });
  activeProcess = childProcess.pid;

  setTimeout(() => {
    const webview = new WebviewWindow('embed-preview', {
      url: 'src/actions/Preview/PreviewWindow/index.html',
    });
    webview.once('tauri://error', (error) => {
      console.log(error);
    });
    webview.once('tauri://close-requested', async () => {
      const killCommand = new Command('kill-process',
        String(activeProcess));
      await killCommand.spawn();
    });
  }, 1000);
}
