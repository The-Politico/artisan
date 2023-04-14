import { exists } from '@tauri-apps/api/fs';
import store from '../../store';
import { fetchIlloMetaFromSlug } from '../archive/fetchIlloMeta';
import getIllustrationPath from '../paths/getIllustrationPath';
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
    slug: illustrationSlug,
    project,
    version,
    lastUploadedVersion,
  } = info;
  const projectInfo = await store.entities.get(project);
  const { slug: projectSlug } = projectInfo;

  const illoPath = await getIllustrationPath(projectSlug, illustrationSlug);

  // Check if the file is still on disk
  const illoFileExists = await exists(illoPath);
  if (!illoFileExists) {
    return STATUS_ILLUSTRATION_ARCHIVED;
  }

  // Get versions
  const fileVersion = await getEtag(illoPath);
  const {
    version: cloudVersion,
  } = await fetchIlloMetaFromSlug(projectSlug, illustrationSlug);

  // Check if the file's version matches the one recorded in the store
  if (version !== fileVersion) {
    return STATUS_ILLUSTRATION_NOT_GENERATED;
  }

  if (version !== cloudVersion) {
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
