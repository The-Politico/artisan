import s3 from '../../utils/s3';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import store from '../../store';
import shareProject from '../projects/shareProject';
import ids from '../../utils/ids';

import {
  AWS_ARTISAN_BUCKET,
  ARTISAN_BASE_TEMPLATE_NAME,
} from '../../constants/aws';
import {
  ARCHIVE_TEMPLATES_DIRECTORY,
} from '../../constants/paths';

export default async function createIllustration(projectId, illoName) {
  const illoId = ids.generate({
    project: projectId,
    illustration: illoName,
  });

  const illoKey = await getIllustrationKey(illoId);

  await s3.copy({
    bucket: AWS_ARTISAN_BUCKET,
    source: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
    key: illoKey,
  });

  await store.illustrations.refreshId(illoId);

  // Update share page
  await shareProject(projectId);

  return illoId;
}
