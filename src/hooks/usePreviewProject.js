import { useCallback, useRef } from 'react';
import { WebviewWindow } from '@tauri-apps/api/window';
import { Command } from '@tauri-apps/api/shell';
import atoms from '../atoms';
import getProjectPath from '../utils/paths/getProjectPath';
import runPromisesSequentially from '../utils/runPromisesSequentially';
import generateIllustration
  from '../actions/illustrations/generateIllustration';
import { STATUS_ILLUSTRATION_NOT_GENERATED } from '../constants/statuses';
import getIllustrationStatus
  from '../actions/illustrations/getIllustrationStatus';

/**
 * Hook to set up a function for launching a preview (WIP)
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function usePreviewProject(projectId) {
  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );
  const [previewState, setPreviewState] = atoms.useRecoilState(
    atoms.preview,
  );

  const previewActive = !!previewState.process;

  const settings = atoms.useRecoilValue(
    atoms.settings,
  );
  const port = settings['preferred-port'];

  const { process } = previewState;

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

    // Generate each of the illustrations
    await runPromisesSequentially(
      illustrations.map(
        (illoId) => async () => {
          const illoStatus = await getIllustrationStatus(illoId);

          if (illoStatus === STATUS_ILLUSTRATION_NOT_GENERATED) {
            await generateIllustration(illoId);
          }
        },
      ),
    );

    const projectPath = await getProjectPath(projectId);

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
        {
          url: 'src/preview/index.html',
          resizable: true,
          width: 1350,
          maxWidth: 1600,
          minWidth: 940,
          maxHeight: 900,
        },
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
  }, [illustrations, previewActive, projectId, shutdownPreview]);

  return [launchPreview, shutdownPreview];
}
