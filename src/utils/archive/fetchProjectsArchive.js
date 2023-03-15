/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import fetchProjectMeta from './fetchProjectMeta';

/**
 * Fetches project metadata for all projects in the archive.
 *
 * @param {Object} options - The options for fetching project archive metadata.
 * @param {boolean} options.skipIllustrations - A flag indicating whether to
 *  skip fetching illustration metadata.
 *
 * @returns {Promise<Array<Object>>} - A Promise that resolves with the
 *  metadata of all projects in the archive.
 */
export default async function fetchProjectsArchive(
  {
    skipIllustrations = false,
  } = {},
) {
  const params = {
    bucket: AWS_ARTISAN_BUCKET,
    delimiter: '/',
    prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/`,
  };

  const projectsPrefixes = await s3.list(params);

  const projectSlugs = projectsPrefixes?.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(`${ARCHIVE_PROJECTS_DIRECTORY}/`, '').replace('/', '');
  });

  const projectsData = await Promise.all(
    projectSlugs.map(async (slug) => fetchProjectMeta(
      slug, { skipIllustrations },
    )),
  );

  return projectsData.filter((p) => 'id' in p);
}
