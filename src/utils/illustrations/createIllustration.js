import s3 from '../s3';
import slugsToId from '../ids/slugsToId';
import getIllustrationKey from '../paths/getIllustrationKey';
import slugify from '../text/slugify';
import store from '../../store';
import shareProject from '../project/shareProject';
import idToSlugs from '../ids/idToSlugs';

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
