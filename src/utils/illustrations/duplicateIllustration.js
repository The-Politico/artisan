import s3 from '../s3';
import slugify from '../text/slugify';
import getIllustrationKey from '../paths/getIllustrationKey';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import store from '../../store';
import slugsToId from '../ids/slugsToId';
import shareIllustration from './shareIllustration';

export default async function duplicateIllustration(
  sourceId,
  projectId,
  illoName,
) {
  const sourceKey = await getIllustrationKey(sourceId);

  const destinationIlloSlug = slugify(illoName);
  const destinationId = slugsToId({
    project: projectId,
    illustration: destinationIlloSlug,
  });

  const destinationKey = await getIllustrationKey(destinationId);

  // Move AI file to trash
  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    key: destinationKey,
    source: sourceKey,
  });

  // Update store
  await store.entities.refreshId(destinationId);

  // Update share page
  await shareIllustration(destinationId);

  return destinationId;
}
