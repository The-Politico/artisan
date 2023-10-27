import { writeBinaryFile } from '@tauri-apps/api/fs';
import store from '../../store';
import ensureDir from '../../utils/fs/ensureDir';
import ids from '../../utils/ids';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import s3 from '../../utils/s3';
import shareProject from '../projects/shareProject';

import {
  ARTISAN_BASE_TEMPLATE_NAME,
  AWS_ARTISAN_BUCKET,
} from '../../constants/aws';
import {
  ARCHIVE_TEMPLATES_DIRECTORY,
} from '../../constants/paths';

export default async function createIllustration(projectId, illoName) {
  const illoId = ids.generate({
    project: projectId,
    illustration: illoName,
  });

  const template = await s3.download({
    bucket: AWS_ARTISAN_BUCKET,
    key: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
  });

  const illoPath = await getIllustrationPath(illoId);
  await ensureDir(illoPath);

  const illoFilePath = await getIllustrationFilePath(illoId);
  await writeBinaryFile(illoFilePath, template);

  await store.illustrations.updateDict({
    [illoId]: {
      lastGeneratedVersion: {
        $set: null,
      },
      lastGeneratedDate: {
        $set: null,
      },
      lastPublishedDate: {
        $set: null,
      },
    },
  });

  await shareProject(projectId);

  return illoId;
}
