import urlJoin from 'url-join';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import store from '../../store';
import s3 from '../s3';

export default async function postProjectMeta(
  id,
  {
    name,
    slug: slugFromArg,
  },
) {
  let slug = slugFromArg;
  if (!slug) {
    const localProjectInfo = await store.entities.get(id);
    slug = localProjectInfo?.slug;
  }

  if (!slug) {
    throw new Error('Must include a slug if uploading a new project.');
  }

  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: name,
    key: `${urlJoin(ARCHIVE_PROJECTS_DIRECTORY, slug)}/`,
    contentType: 'application/x-directory',
    metadata: {
      name,
      id,
    },
  });
}
