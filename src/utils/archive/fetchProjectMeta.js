import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
} from '../../constants/paths';

import { fetchIlloListMeta } from './fetchIlloMeta';

import s3 from '../s3';

/**
 * Fetches metadata for a project with the given slug from S3.
 *
 * @param {string} projectSlug - The slug of the project to fetch metadata for.
 * @param {Object} options - The options for fetching project metadata.
 * @param {boolean} options.skipIllustrations - A flag indicating whether
 *  to skip fetching illustration metadata.
 *
 * @returns {Promise<Object>} - A Promise that resolves with the metadata
 *  of the project.
 */
export default async function fetchProjectMeta(
  projectSlug,
  {
    skipIllustrations = false,
  } = {},
) {
  const { Metadata, LastModified } = await s3.head({
    bucket: AWS_ARTISAN_BUCKET,
    key: `${ARCHIVE_PROJECTS_DIRECTORY}/${projectSlug}/`,
  });

  const optionalMeta = {};
  if (!skipIllustrations) {
    const illosList = await s3.list({
      bucket: AWS_ARTISAN_BUCKET,
      prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/${projectSlug}/`,
    });
    optionalMeta.illustrations = await fetchIlloListMeta(illosList);
  }

  return {
    slug: projectSlug,
    lastUpdated: LastModified.toISOString(),
    ...Metadata,
    ...optionalMeta,
  };
}
