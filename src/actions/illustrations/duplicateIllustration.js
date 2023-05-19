import s3 from '../../utils/s3';
import slugify from '../../utils/text/slugify';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import store from '../../store';
import ids from '../../utils/ids';
import shareProject from '../projects/shareProject';

export default async function duplicateIllustration(
  sourceId,
  projectId,
  illoName,
) {
  const valid = ids.validate({
    illustration: illoName,
  });

  // TODO: Error System
  if (!valid) {
    throw new Error('Invalid illustration name provided.');
  }

  const sourceKey = await getIllustrationKey(sourceId);

  const destinationIlloSlug = slugify(illoName);
  const destinationId = ids.gen({
    project: projectId,
    illustration: destinationIlloSlug,
  });

  const destinationKey = await getIllustrationKey(destinationId);

  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    key: destinationKey,
    source: sourceKey,
  });

  // Update store
  await store.illustrations.refreshId(destinationId);

  // Update share page
  await shareProject(projectId);

  return destinationId;
}
