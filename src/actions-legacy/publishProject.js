/* eslint-disable no-await-in-loop */
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import mime from 'mime/lite';

import store from '../store';
import backupFiles from './backupFiles';
import outputShare from './outputShare';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';
import s3 from '../utils/s3';

import {
  AWS_PRODUCTION_BUCKET,
} from '../constants/aws';
import {
  AI2HTML_OUTPUT_DIR,
  PUBLISH_EMBED_PATH,
} from '../constants/paths';

export default async function publishProject(projectSlug) {
  await backupFiles(projectSlug);

  const projectFolder = await getWorkingProjectPath(projectSlug);
  const projectMeta = await store.getProject(projectSlug);
  const { illustrations } = projectMeta;

  await Promise.all(
    illustrations.map(async (illo) => {
      const illoSlug = illo.slug;
      const outputPath = await join(
        projectFolder,
        illoSlug,
        AI2HTML_OUTPUT_DIR,
      );
      const outputFiles = await readDir(outputPath, { recursive: true });

      await Promise.all(
        outputFiles.map(async (outputFile) => {
          const body = await readBinaryFile(outputFile.path);
          const contentType = mime.getType(outputFile.path);
          const key = await join(
            PUBLISH_EMBED_PATH,
            projectSlug,
            illoSlug,
            outputFile.name,
          );

          await s3.upload({
            bucket: AWS_PRODUCTION_BUCKET,
            key,
            contentType,
            body,
          });
        }),
      );
    }),
  );

  await outputShare(projectSlug);
}
