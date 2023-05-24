import { watch } from 'tauri-plugin-fs-watch-api';
import { resolve } from '@tauri-apps/api/path';
import store from '../../store';
import { LOCAL_PROJECTS_DIRECTORY } from '../../constants/paths';
import ids from '../ids';
import nearestExistingDir from './nearestExistingDir';

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

          // console.log('Change!', id);
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
