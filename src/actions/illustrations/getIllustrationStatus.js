import { exists } from '@tauri-apps/api/fs';
import store from '../../store';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getEtag from '../../utils/fs/getEtag';
import {
  STATUS_ILLUSTRATION_OK,
  STATUS_ILLUSTRATION_NOT_GENERATED,
  STATUS_ILLUSTRATION_NONEXISTENT,
} from '../../constants/statuses';

/**
 * Checks the status of an illustration file by comparing its versions on disk,
 * in store, and on the cloud.
 *
 * @param {string} id - The ID of the illustration file.
 * @returns {string} The illustration's status
 */
export default async function getIllustrationStatus(id) {
  // Get entity information from store
  const info = await store.illustrations.get(id);
  const {
    lastGeneratedVersion,
  } = info;

  const illoFilePath = await getIllustrationFilePath(id);

  // Check if the file is still on disk
  const illoFileExists = await exists(illoFilePath);
  if (!illoFileExists) {
    return STATUS_ILLUSTRATION_NONEXISTENT;
  }

  // Check if the file's version matches the one recorded in the store
  const fileVersion = await getEtag(illoFilePath);
  if (lastGeneratedVersion !== fileVersion) {
    return STATUS_ILLUSTRATION_NOT_GENERATED;
  }

  // If nothing above has occured, then things are good!
  return STATUS_ILLUSTRATION_OK;
}
