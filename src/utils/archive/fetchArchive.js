/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import slugsToId from '../ids/slugsToId';

/**
 * Fetches all illustrations in the archive.
 *
 * @returns {Promise<Array<Object>>} - A Promise that resolves with the
 *  metadata of all illustrations in the archive.
 */
export default async function fetchArchive() {
  const projectsPrefix = `${ARCHIVE_PROJECTS_DIRECTORY}/`;
  const params = {
    bucket: AWS_ARTISAN_BUCKET,
    prefix: projectsPrefix,
  };

  const resp = await s3.list(params);
  return resp.Contents
    .filter((record) => record.Key.endsWith('.ai'))
    .map((record) => {
      const [, projectSlug, illoFile] = record.Key.split('/');
      const illoSlug = illoFile.split('.ai')[0];
      const id = slugsToId({ project: projectSlug, illustration: illoSlug });

      return {
        id,
        slug: illoSlug,
        project: projectSlug,
        version: record.ETag.split('"')[1],
        lastUpdated: record.LastModified.toISOString(),
      };
    });
}
