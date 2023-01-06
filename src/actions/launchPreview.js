import { WebviewWindow } from '@tauri-apps/api/window';
import { Command } from '@tauri-apps/api/shell';

import store from '../store';

import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';
import shutdownPreview from './shutdownPreview';

export default async function launchPreview(projectSlug) {
  const projectsFolder = await getWorkingProjectPath(projectSlug);

  const { port, pid: currentActiveProcess } = await store.getPreview();

  if (currentActiveProcess) {
    throw new Error('There is already an active process!');
  }

  const command = new Command(
    'start-local-server',
    ['-m', 'http.server', port],
    { cwd: projectsFolder },
  );
  const childProcess = await command.spawn();

  await store.updatePreview(projectSlug, childProcess.pid);

  setTimeout(() => {
    const webview = new WebviewWindow(
      'embed-preview',
      {
        url: 'src/preview/index.html',
        resizable: true,
        width: 1350,
        maxWidth: 1350,
        minWidth: 940,
        maxHeight: 900,
      },
    );

    webview.once('tauri://error', (error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
    });

    webview.once('tauri://close-requested', async () => {
      await shutdownPreview();
    });
  }, 1000);
}
