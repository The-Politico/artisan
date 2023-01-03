import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
} from '../../constants/paths';

import { fetchIlloMeta } from './fetchIlloMeta';

import s3 from '../s3';

/**
 * @param {String} files Array of file names
 * @return {String} Project display name
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

  let illustrations;
  if (!skipIllustrations) {
    const illosList = await s3.list({
      bucket: AWS_ARTISAN_BUCKET,
      prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/${projectSlug}/`,
    });
    illustrations = await fetchIlloMeta(illosList);
  }

  return {
    slug: projectSlug,
    illustrations,
    lastUploaded: LastModified.toISOString(),
    ...Metadata,
  };
}
