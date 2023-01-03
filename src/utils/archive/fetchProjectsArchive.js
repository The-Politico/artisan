/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import fetchProjectMeta from './fetchProjectMeta';

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
