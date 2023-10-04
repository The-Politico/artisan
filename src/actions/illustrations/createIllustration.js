import { writeBinaryFile } from '@tauri-apps/api/fs';
import { ResponseType } from '@tauri-apps/api/http';
import store from '../../store';
import ensureDir from '../../utils/fs/ensureDir';
import ids from '../../utils/ids';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import shareProject from '../projects/shareProject';
import fetchHermes from '../../hermes/fetchHermes';

import {
  ARTISAN_BASE_TEMPLATE_NAME,
  AWS_ARTISAN_BUCKET,
  AWS_TEST_BUCKET,
} from '../../constants/aws';
import {
  ARCHIVE_TEMPLATES_DIRECTORY,
} from '../../constants/paths';

export default async function createIllustration(projectId, illoName) {
  const illoId = ids.generate({
    project: projectId,
    illustration: illoName,
  });

  // TODO: Bucket Swap
  const template = await fetchHermes({
    route: 'aws/download',
    bucket: AWS_TEST_BUCKET,
    key: 'testing/artisan/templates/base.ai',
    responseType: 'Binary',
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
