import { exists } from '@tauri-apps/api/fs';
import store from '../../store';
import getIllustrationFilePath from '../paths/getIllustrationFilePath';
import getEtag from '../fs/getEtag';
import {
  STATUS_ILLUSTRATION_OK,
  STATUS_ILLUSTRATION_NOT_GENERATED,
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
  STATUS_ILLUSTRATION_ARCHIVED,
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
  const info = await store.entities.get(id);
  const {
    version: lastGeneratedVersion,
    cloudVersion,
    lastUploadedVersion,
  } = info;

  const illoFilePath = await getIllustrationFilePath(id);

  // Check if the file is still on disk
  const illoFileExists = await exists(illoFilePath);
  if (!illoFileExists) {
    return STATUS_ILLUSTRATION_ARCHIVED;
  }

  // Check if the file's version matches the one recorded in the store
  const fileVersion = await getEtag(illoFilePath);
  if (lastGeneratedVersion !== fileVersion) {
    return STATUS_ILLUSTRATION_NOT_GENERATED;
  }

  if (lastGeneratedVersion !== cloudVersion) {
    // Check if the last known upload from this machine was the last upload
    if (lastUploadedVersion === cloudVersion) {
      return STATUS_ILLUSTRATION_VALID_UPLOAD;
    }

    // If not, then there's a new update available
    return STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE;
  }

  // If nothing above has occured, then things are good!
  return STATUS_ILLUSTRATION_OK;
}
