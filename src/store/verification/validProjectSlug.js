import { PROJECTS } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';
import {
  RESRVED_PROJECT_NAME_ERROR,
  PROJECT_NAME_EXISTS_ERROR,
} from '../../errors/store';

import fetchProjectsArchive from '../../utils/archive/fetchProjectsArchive';

export default async function validProjectSlug(projectSlug, { method } = {}) {
  if (projectSlug === PROJECTS_LIST_NAME) {
    throw RESRVED_PROJECT_NAME_ERROR;
  }

  const projectEntry = await PROJECTS.get(projectSlug);

  if (projectEntry) {
    throw PROJECT_NAME_EXISTS_ERROR;
  }

  if (method !== 'download') {
    const archive = await fetchProjectsArchive();
    if (archive.find((archiveSlug) => archiveSlug === projectSlug)) {
      throw PROJECT_NAME_EXISTS_ERROR;
    }
  }

  return true;
}
