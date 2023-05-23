import { v4 as uuid } from 'uuid';
import { readDir, removeDir } from '@tauri-apps/api/fs';
import s3 from '../../utils/s3';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import getProjectPath from '../../utils/paths/getProjectPath';
import { ARCHIVE_TRASH_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import ids from '../../utils/ids';
import store from '../../store';
import getPreviewKey from '../../utils/paths/getPreviewKey';

export default async function deleteIllustration(id) {
  const randomId = uuid().substring(0, 8);
  const names = ids.parse(id);

  const illoPath = await getIllustrationPath(id);
  const illoKey = await getIllustrationKey(id);
  const previewKey = await getPreviewKey(id);
  const projectPath = await getProjectPath(names.project);

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  // Move AI file to trash
  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    key: [
      ARCHIVE_TRASH_DIRECTORY,
      `${nowYear}-${nowMonth}-${nowDate}`,
      names.project,
      names.illustration,
      `${randomId}.ai`,
    ].join('/'),
    source: illoKey,
  });

  // Delete AI file
  await s3.delete({
    bucket: AWS_ARTISAN_BUCKET,
    key: illoKey,
  });

  // Delete Preview file
  await s3.delete({
    bucket: AWS_ARTISAN_BUCKET,
    key: previewKey,
  });

  // Delete local files
  await removeDir(illoPath, { recursive: true });
  const dirContents = await readDir(projectPath);
  if (dirContents.length === 0) {
    await removeDir(projectPath);
  }

  // Remove from store
  await store.illustrations.refreshId(id);

  return true;
}