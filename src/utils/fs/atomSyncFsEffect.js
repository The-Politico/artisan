import { watch } from 'tauri-plugin-fs-watch-api';
import { resolve } from '@tauri-apps/api/path';
import store from '../../store';
import { LOCAL_PROJECTS_DIRECTORY } from '../../constants/paths';
import ids from '../ids';
import nearestExistingDir from './nearestExistingDir';

/**
 * This function is responsible for setting up a
 * syncing system between the file system and the atom state.
 * The function listens for any changes in the nearest existing
 * directory relative to the project or illustrations and
 * updates the atom state accordingly.
 *
 * @param {Object} options - The input configuration object.
 * @param {string} options.id - The identifier of the project/illustration.
 * @param {function} options.read - The read function to get
 * data from the file system.
 * @returns {function} - A recoil effect callback
 */
export default function atomSyncFsEffect({
  id,
  read,
}) {
  return ({
    setSelf,
  }) => {
    const initWatcher = async () => {
      const workingDir = await store.settings.get('working-directory');
      const {
        project: projectName,
        illustration: illustrationName,
      } = ids.parse(id);

      let watchDir = await resolve(
        workingDir,
        LOCAL_PROJECTS_DIRECTORY,
        projectName,
      );

      if (illustrationName) {
        watchDir = await resolve(watchDir, illustrationName);
      }

      const nearestPath = await nearestExistingDir(watchDir);

      return watch(nearestPath, { recursive: true }, async (events) => {
        events.forEach(async ({ path }) => {
          const [
            projectPathName,
            illustrationPathName,
          ] = path.split(workingDir)[1].split('/').slice(2, 4);

          // If the project doesn't match -- ignore
          if (projectName !== projectPathName) {
            return;
          }

          // If the illustration is present, and doesn't
          // match -- ignore
          if (
            illustrationName !== undefined
            && illustrationName !== illustrationPathName
          ) {
            return;
          }

          const data = await read();
          setSelf(data);
        });
      });
    };

    const unsub = initWatcher();

    return () => {
      unsub.then((cb) => cb());
    };
  };
}
