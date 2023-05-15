import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import mime from 'mime/lite';
import { AWS_PRODUCTION_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import getIllustrationOutputKey from '../paths/getIllustrationOutputKey';
import getIllustrationOutputPath from '../paths/getIllustrationOutputPath';
import store from '../../store';

export default async function publishIllustration(id) {
  const illoOutputPath = await getIllustrationOutputPath(id);
  const illoOutputKey = await getIllustrationOutputKey(id);

  const contents = await readDir(illoOutputPath);
  const uploadableContents = contents
    .filter(
      (file) => file.path.endsWith('.png')
        || file.path.endsWith('.html'),
    );

  await Promise.all(uploadableContents.map(async (file) => {
    const body = await readBinaryFile(file.path);
    const contentType = mime.getType(file.path);
    const outputKey = [
      illoOutputKey,
      file.name,
    ].join('/');

    await s3.upload({
      bucket: AWS_PRODUCTION_BUCKET,
      key: outputKey,
      contentType,
      body,
    });
  }));

  await store.entities.updateDict({
    [id]: {
      lastPublishedDate: {
        $set: (new Date()).toISOString(),
      },
    },
  });
}
