import { resolve } from '@tauri-apps/api/path';
import { exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { ARCHIVE_PREVIEWS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import getEtag from '../fs/getEtag';
import store from '../../store';

export default async function fetchPreviews() {
  const workingDirectory = await store.settings.get('working-directory');

  const previewsList = await s3.list({
    bucket: AWS_ARTISAN_BUCKET,
    delimiter: '/',
    prefix: `${ARCHIVE_PREVIEWS_DIRECTORY}/`,
  });

  const previews = previewsList.Contents
    .map(({ Key }) => Key.split(`${ARCHIVE_PREVIEWS_DIRECTORY}/`)[1])
    .filter((key) => !!key);

  await Promise.all(previews.map(async (key) => {
    const filePath = await resolve(
      workingDirectory,
      `_${ARCHIVE_PREVIEWS_DIRECTORY}`,
      key,
    );

    const archiveKey = [
      ARCHIVE_PREVIEWS_DIRECTORY,
      key,
    ].join('/');

    const fileExists = await exists(filePath);

    if (fileExists) {
      const { ETag: uploadedEtagDirty } = await s3.head({
        bucket: AWS_ARTISAN_BUCKET,
        key: archiveKey,
      });

      const uploadedEtag = uploadedEtagDirty.split('"')[1];
      const localEtag = await getEtag(filePath);

      if (uploadedEtag === localEtag) {
        return;
      }
    }

    const content = await s3.download({
      bucket: AWS_ARTISAN_BUCKET,
      key: archiveKey,
    });

    await writeBinaryFile(filePath, content);
  }));
}
