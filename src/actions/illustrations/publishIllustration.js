import { readBinaryFile, readDir, exists } from '@tauri-apps/api/fs';
import { Body } from '@tauri-apps/api/http';

import mime from 'mime/lite';
import {
  AWS_PRODUCTION_BUCKET,
  AWS_STAGING_BUCKET,
} from '../../constants/aws';
import getIllustrationOutputKey
  from '../../utils/paths/getIllustrationOutputKey';
import getIllustrationOutputPath
  from '../../utils/paths/getIllustrationOutputPath';
import store from '../../store';
import fetchHermes from '../../hermes/fetchHermes';

const BUCKETS = {
  staging: AWS_STAGING_BUCKET,
  production: AWS_PRODUCTION_BUCKET,
};

export default async function publishIllustration(id, {
  staging = false,
  production = false,
}) {
  if (!staging && !production) {
    throw new Error('No publishing mode set.');
  }

  if (!!staging && !!production) {
    throw new Error('Must choose one publishing mode');
  }

  const bucket = (function getBucket() {
    if (staging) {
      return 'staging';
    }

    if (production) {
      return 'production';
    }

    return undefined;
  }());

  const illoOutputPath = await getIllustrationOutputPath(id);
  const illoOutputKey = await getIllustrationOutputKey(id);

  const outputExists = await exists(illoOutputPath);
  if (!outputExists) {
    return false;
  }

  const contents = await readDir(illoOutputPath);
  const uploadableContents = contents
    .filter(
      (file) => file.path.endsWith('.png')
        || file.path.endsWith('.jpg')
        || file.path.endsWith('.html'),
    );

  await Promise.all(uploadableContents.map(async (file) => {
    const body = await readBinaryFile(file.path);
    const contentType = mime.getType(file.path);
    const outputKey = [
      illoOutputKey,
      file.name,
    ].join('/');

    await fetchHermes({
      route: 'aws/upload',
      method: 'POST',
      body,
      bucket: BUCKETS[bucket],
      contentType,
      bodyType: Body.bytes,
      key: outputKey,
    });
  }));

  if (production) {
    await store.illustrations.updateDict({
      [id]: {
        lastPublishedDate: {
          $set: (new Date()).toISOString(),
        },
      },
    });
  }

  return true;
}
