import { watch } from 'tauri-plugin-fs-watch-api';
import { exists } from '@tauri-apps/api/fs';
import store from '../../store';
import onWriteAI from './onWriteAI';
import onWriteProject from './onWriteProject';
import onRemoveProject from './onRemoveProject';
import createQueue from '../../utils/queue';
import healthCheck from '../../utils/illustrations/healthCheck';

/**
 * Sets up a file system watcher on the working directory.
 * When changes are detected in the directory, it triggers the
 * corresponding functions based on the type of change.
 */
export default async function fsSync() {
  const workingDir = await store.settings.get('working-directory');

  const fsChangeCallback = async ({ path }) => {
    let pathExists;
    try {
      pathExists = await exists(path);
    } catch (error) {
      if (error.startsWith('path not allowed on the configured scope')) {
        return;
      }

      throw error;
    }

    const [, projectSlug, illustrationSlug, filename] = path
      .split(workingDir)[1]
      .split('/');

    if (!illustrationSlug) {
      if (pathExists) {
        await onWriteProject({
          projectSlug,
        });

        return;
      }

      await onRemoveProject({
        projectSlug,
      });

      return;
    }

    if (filename && filename.endsWith('.ai')) {
      if (pathExists) {
        await onWriteAI({
          projectSlug,
          illustrationSlug,
          filename,
        });
      }
    }
  };

  const queue = createQueue(fsChangeCallback);
  watch(workingDir, { recursive: true }, async (events) => {
    events.forEach(({ path }) => {
      queue.add({ path });
    });
  });

  healthCheck();
  setInterval(healthCheck, 60 * 1000);
}
