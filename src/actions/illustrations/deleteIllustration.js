import { readDir, removeDir } from '@tauri-apps/api/fs';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import getProjectPath from '../../utils/paths/getProjectPath';
import ids from '../../utils/ids';
import store from '../../store';

export default async function deleteIllustration(id) {
  const names = ids.parse(id);

  const illoPath = await getIllustrationPath(id);
  const projectPath = await getProjectPath(names.project);

  // Delete local files
  try {
    await removeDir(illoPath, { recursive: true });

    // Delete projcect folder if no illustrations remain
    const dirContents = await readDir(projectPath);
    const onlyDsStore = dirContents.every(({ name }) => name === '.DS_Store');
    if (onlyDsStore || dirContents.length === 0) {
      await removeDir(projectPath, { recursive: true });
    }

    // Remove from store
    await store.illustrations.delete(id);
  } catch (error) {
    // TO DO: Error boundry system
    console.log(error);
  }

  return true;
}
