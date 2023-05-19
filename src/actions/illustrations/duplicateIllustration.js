import s3 from '../../utils/s3';
import slugify from '../../utils/text/slugify';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import store from '../../store';
import slugsToId from '../../utils/ids/slugsToId';
import shareProject from '../projects/shareProject';
import idToSlugs from '../../utils/ids/idToSlugs';

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

  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    key: destinationKey,
    source: sourceKey,
  });

  // Update store
  await store.entities.refreshId(destinationId);

  // Update share page
  const slugs = idToSlugs(destinationId);
  await shareProject(slugs.project);

  return destinationId;
}
