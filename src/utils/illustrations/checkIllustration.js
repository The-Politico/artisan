import { exists, removeDir } from '@tauri-apps/api/fs';
import store from '../../store';
import backupIllustration from './backupIllustration';
import generateIllustration from './generateIllustration';
import downloadIllustration from './downloadIllustration';
import {
  STATUS_ILLUSTRATION_OK,
  STATUS_ILLUSTRATION_NOT_GENERATED,
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
  STATUS_ILLUSTRATION_ARCHIVED,
} from '../../constants/statuses';
import getIllustrationData from './getIllustrationData';

/**
 * Checks the status of an illustration and performs corresponding actions
 * such as removing directories, generating, backing up, or downloading
 * the illustration.
 *
 * @param {string} id - The unique identifier of the illustration
 * to be checked.
 */
export default async function checkIllustration(id) {
  const {
    meta,
    status,
    paths,
  } = await getIllustrationData(id);

  if (status === STATUS_ILLUSTRATION_OK) {
    return;
  }

  if (status === STATUS_ILLUSTRATION_ARCHIVED) {
    const illoFileExists = await exists(paths.filePath);
    if (illoFileExists) {
      await removeDir(paths.dir, { recursive: true });
    }

    await store.entities.set({
      [id]: {
        ...meta,
        version: null,
        lastUploadedVersion: null,
      },
    });

    return;
  }

  if (status === STATUS_ILLUSTRATION_NOT_GENERATED) {
    await generateIllustration(id);
    await checkIllustration(id);
    return;
  }

  if (status === STATUS_ILLUSTRATION_VALID_UPLOAD) {
    await backupIllustration(id);
    await checkIllustration(id);
    return;
  }

  if (status === STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE) {
    await downloadIllustration(id);
    await checkIllustration(id);
  }
}
