import uniq from 'lodash/uniq';
import getIllustrationStatus from '../illustrations/getIllustrationStatus';
import getIllosInProject from '../../utils/store/getIllosInProject';

import {
  STATUS_PROJECT_OK,
  STATUS_PROJECT_NOT_GENERATED,
  STATUS_PROJECT_VALID_UPLOAD,
  STATUS_PROJECT_DOWNLOAD_AVAILABLE,
  STATUS_PROJECT_MISMATCH,
  STATUS_ILLUSTRATION_OK,
  STATUS_ILLUSTRATION_NOT_GENERATED,
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
} from '../../constants/statuses';

const MISMATCH_ILLUSTRATION_STATUSES = [
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
];

/**
 * Determines the project status based on the illustration statuses.
 *
 * @param {String} id - The project id
 * @returns {String} The project status
 *
 * @throws An error if the project status cannot be derived.
 */
export default async function getProjectStatus(id) {
  const illustrationsInProject = await getIllosInProject(id);

  // If no illustrations, the project is ok
  if (illustrationsInProject.length === 0) {
    return STATUS_PROJECT_OK;
  }

  const illoStatuses = await Promise.all(
    illustrationsInProject.map(async ([illoId]) => {
      const status = await getIllustrationStatus(illoId);
      return status;
    }),
  );

  // If any of the illustrations need to be generated, then that takes
  // precedence on the project status
  if (illoStatuses.indexOf(STATUS_ILLUSTRATION_NOT_GENERATED) > -1) {
    return STATUS_PROJECT_NOT_GENERATED;
  }

  // If every illustration is ok, then the whole project is ok
  if (
    illoStatuses.every((status) => status === STATUS_ILLUSTRATION_OK)
  ) {
    return STATUS_PROJECT_OK;
  }

  // Statuses that cause mismatch issues
  const uniqMismatchStatuses = uniq(illoStatuses)
    .filter((status) => MISMATCH_ILLUSTRATION_STATUSES.indexOf(status) > -1);

  // If there's a mix of mismatch statuses...
  if (uniqMismatchStatuses.length > 1) {
    // If there's a valid upload and something else, there's a mismatch
    if (
      uniqMismatchStatuses.indexOf(
        STATUS_ILLUSTRATION_VALID_UPLOAD,
      ) > -1
    ) {
      return STATUS_PROJECT_MISMATCH;
    }

    // If there's only archived and downloads, a download should fix it
    return STATUS_PROJECT_DOWNLOAD_AVAILABLE;
  }

  const commonStatus = uniqMismatchStatuses[0];
  // If there's a single common status then the project has the same
  if (commonStatus === STATUS_ILLUSTRATION_VALID_UPLOAD) {
    return STATUS_PROJECT_VALID_UPLOAD;
  }

  // If there's a single common status then the project has the same
  if (commonStatus === STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE) {
    return STATUS_PROJECT_DOWNLOAD_AVAILABLE;
  }

  return STATUS_PROJECT_OK;

  // I should be handling all possible conditions above this
  // throw new Error('Project status could not be derived.');
}
