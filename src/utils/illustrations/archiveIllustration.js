import { removeDir } from '@tauri-apps/api/fs';
import store from '../../store';
import {
  STATUS_ILLUSTRATION_OK,
} from '../../constants/statuses';
import getIllustrationStatus from './getIllustrationStatus';
import getIllustrationPath from '../paths/getIllustrationPath';

export default async function archiveIllustration(
  id,
  {
    force = false,
  } = {},
) {
  const status = await getIllustrationStatus(id);

  if (status !== STATUS_ILLUSTRATION_OK && !force) {
    return false;
  }

  const illoPath = await getIllustrationPath(id);

  await removeDir(illoPath, { recursive: true });

  // Update latest version uploaded
  await store.entities.updateDict({
    [id]: {
      lastUploadedVersion: {
        $set: null,
      },
      lastUploadedDate: {
        $set: null,
      },
      version: {
        $set: null,
      },
    },
  });

  return true;
}
