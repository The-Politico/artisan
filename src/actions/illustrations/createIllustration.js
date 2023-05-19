import s3 from '../../utils/s3';
import slugsToId from '../../utils/ids/slugsToId';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import slugify from '../../utils/text/slugify';
import store from '../../store';
import shareProject from '../projects/shareProject';
import idToSlugs from '../../utils/ids/idToSlugs';

import {
  AWS_ARTISAN_BUCKET,
  ARTISAN_BASE_TEMPLATE_NAME,
} from '../../constants/aws';
import {
  ARCHIVE_TEMPLATES_DIRECTORY,
} from '../../constants/paths';

export default async function createIllustration(projectId, illoName) {
  const illoSlug = slugify(illoName);

  // TODO: Make sure slug is unique

  const illoId = slugsToId({
    project: projectId,
    illustration: illoSlug,
  });
  const illoKey = await getIllustrationKey(illoId);

  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    source: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
    key: illoKey,
  });

  await store.entities.refreshId(illoId);

  // Update share page
  const slugs = idToSlugs(illoId);
  await shareProject(slugs.project);

  return illoId;
}
