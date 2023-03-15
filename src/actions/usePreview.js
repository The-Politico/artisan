import { useCallback, useRef } from 'react';
import { WebviewWindow } from '@tauri-apps/api/window';
import { Command } from '@tauri-apps/api/shell';
import atoms from '../atoms';

/**
 * Hook to set up a function for launching a preview (WIP)
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function usePreview(projectId) {
  const previewActive = atoms.use.isPreviewActive();
  const settings = atoms.use.settings();
  const port = settings['preferred-port'];
  const [previewState, setPreviewState] = atoms.use.preview.useRecoilState();
  const { process } = previewState;
  const projectPath = atoms.use.projectPath(projectId);

  const shutdownPreview = useCallback(async () => {
    if (!previewActive) {
      return;
    }

    const killCommand = new Command(
      'kill-process',
      String(process),
    );

    await killCommand.spawn();

    setPreviewState({
      process: null,
      project: null,
    });
  }, [previewActive, process]);

  const shutdownFunctionRef = useRef();
  shutdownFunctionRef.current = shutdownPreview;

  const launchPreview = useCallback(async () => {
    if (previewActive) {
      await shutdownPreview();
    }

    const command = new Command(
      'start-local-server',
      ['-m', 'http.server', port],
      { cwd: projectPath },
    );
    const childProcess = await command.spawn();

    setPreviewState({
      process: childProcess.pid,
      project: projectId,
    });

    setTimeout(() => {
      const webview = new WebviewWindow(
        'embed-preview',
        { url: 'src/preview/index.html' },
      );

      webview.once('tauri://error', (error) => {
        /* eslint-disable-next-line no-console */
        console.log(error);
      });

      webview.once('tauri://close-requested', async () => {
        if (shutdownFunctionRef.current) {
          await shutdownFunctionRef.current();
        }
      });
    }, 1000);
  }, [previewActive, projectPath, shutdownPreview]);

  return [launchPreview, shutdownPreview];
}
