import { resolve } from '@tauri-apps/api/path';
import store from '../../store';
import getIllustrationStatus from './getIllustrationStatus';
import getIllustrationPath from '../paths/getIllustrationPath';
import getLocalFallbackPath from '../paths/getLocalFallbackPath';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
  ARCHIVE_PREVIEWS_DIRECTORY,
} from '../../constants/paths';
import getWorkingProjectPath from '../paths/getProjectPath';

/**
 * Get illustration data and its related project information, paths, and keys
 *
 * @param {string} id - The ID of the illustration to fetch data for
 * @returns {Promise<Object>} Returns an object with illustration meta
 * information, status, project information, and paths.
 */
export default async function getIllustrationData(id) {
  const info = await store.entities.get(id);
  const { slug: illustrationSlug, project } = info;
  const projectInfo = await store.entities.get(project);
  const { slug: projectSlug } = projectInfo;

  const status = await getIllustrationStatus(id);

  const projectPath = await getWorkingProjectPath(projectSlug);
  const dir = await resolve(projectPath, illustrationSlug);
  const fp = await getIllustrationPath(projectSlug, illustrationSlug);
  const fallbackPath = await getLocalFallbackPath(
    projectSlug,
    illustrationSlug,
  );

  const key = `${ARCHIVE_PROJECTS_DIRECTORY}/${projectSlug}/${illustrationSlug}.ai`;
  const fallbackKey = `${ARCHIVE_PREVIEWS_DIRECTORY}/${id}.png`;

  return {
    meta: info,
    status,
    project: projectInfo,
    paths: {
      dir,
      filePath: fp,
      key,
      fallbackPath,
      fallbackKey,
    },
  };
}
