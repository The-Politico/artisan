import { watch } from 'tauri-plugin-fs-watch-api';
import store from '../../store';
import onWriteAI from './onWriteAI';
import onCreateAI from './onCreateAI';
import onCreateProject from './onCreateProject';
import onRemoveProject from './onRemoveProject';

const SINGLE_FILE_OPERATIONS = [
  'Write',
  'Create',
  'Remove',
];

/**
 * Sets up a file system watcher on the working directory.
 * When changes are detected in the directory, it triggers the
 * corresponding functions based on the type of change.
 */
export default async function fsSync() {
  const workingDir = await store.settings.get('working-directory');

  await watch(workingDir, { recursive: true }, async (event) => {
    const { type, payload } = event;
    console.log('watch', type, payload);

    if (SINGLE_FILE_OPERATIONS.indexOf(type) > -1) {
      const [, projectSlug, illustrationSlug, filename] = payload
        .split(workingDir)[1]
        .split('/');

      if (!illustrationSlug) {
        if (type === 'Create') {
          await onCreateProject({
            projectSlug,
          });

          return;
        }

        if (type === 'Remove') {
          await onRemoveProject({
            projectSlug,
          });

          return;
        }
      }

      if (filename && filename.endsWith('.ai')) {
        if (type === 'Write') {
          await onWriteAI({
            projectSlug,
            illustrationSlug,
            filename,
          });

          return;
        }

        if (type === 'Create') {
          await onCreateAI({
            projectSlug,
            illustrationSlug,
            filename,
          });
        }
      }
    }
  });
}
