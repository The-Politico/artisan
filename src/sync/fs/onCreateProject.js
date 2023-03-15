import omit from 'lodash/omit';
import { v4 as uuidv4 } from 'uuid';
import urlJoin from 'url-join';
import store from '../../store';
import titleify from '../../utils/text/titleify';
import versionize from '../../utils/text/versionize';
import fetchProjectMeta from '../../utils/archive/fetchProjectMeta';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import s3 from '../../utils/s3';

/**
 * Creates a new project in the store if it does not already exist.
 * If it already exists, updates the existing project with metadata
 * from the archive.
 *
 * @param {Object} options - The options for creating a new project.
 * @param {string} options.projectSlug - The slug of the project to create.
 *
 * @returns {Promise<void>} - A Promise that resolves when the project is
 * created or updated.
 */
export default async function onCreateProject({ projectSlug }) {
  const projectInfo = await getProjectInfoFromSlug(projectSlug);

  if (projectInfo) {
    // The project is being downloaded (or already exists)
    const existingProjectMeta = await fetchProjectMeta(projectSlug);
    await store.entities.set({
      [existingProjectMeta.id]: {
        ...omit(existingProjectMeta, 'illustrations'),
        healthy: true,
        publicUrl: undefined,
      },
    });
  } else {
    // The project is new
    const name = titleify(projectSlug);
    const id = `P-${uuidv4()}`;
    const version = versionize();

    await s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: name,
      key: `${urlJoin(ARCHIVE_PROJECTS_DIRECTORY, projectSlug)}/`,
      contentType: 'application/x-directory',
      metadata: {
        name,
        version,
        id,
      },
    });

    await store.entities.refresh();
  }
}
