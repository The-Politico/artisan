/* TODO: FS Sync: Ignore this file for now */

import { watch } from 'tauri-plugin-fs-watch-api';
import { exists } from '@tauri-apps/api/fs';
import { resolve } from '@tauri-apps/api/path';
import store from '../../store';
import onWriteAI from './onWriteAI';
import onWriteProject from './onWriteProject';
import onRemoveProject from './onRemoveProject';
import createQueue from '../../utils/queue';
import { LOCAL_PROJECTS_DIRECTORY } from '../../constants/paths';

/**
 * Sets up a file system watcher on the working directory.
 * When changes are detected in the directory, it triggers the
 * corresponding functions based on the type of change.
 */
export default async function fsSync() {
  const workingDir = await store.settings.get('working-directory');
  const projectsDir = await resolve(workingDir, LOCAL_PROJECTS_DIRECTORY);

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

    const [, projectName, illustrationName, filename] = path
      .split(projectsDir)[1]
      .split('/');

    if (!illustrationName) {
      if (pathExists) {
        await onWriteProject({
          projectName,
          filepath: path,
        });

        return;
      }

      await onRemoveProject({
        projectName,
      });

      return;
    }

    if (filename && filename.endsWith('.ai')) {
      if (pathExists) {
        await onWriteAI({
          projectName,
          illustrationName,
          filename,
          filepath: path,
        });
      }
    }
  };

  const queue = createQueue(fsChangeCallback);
  watch(projectsDir, { recursive: true }, async (events) => {
    events.forEach(({ path }) => {
      queue.add({ path });
    });
  });
}
