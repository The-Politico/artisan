import { createDir, writeBinaryFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import slugify from '../utils/text/slugify';
import store from '../store';
import s3 from '../utils/s3';

import {
  AWS_ARTISAN_BUCKET,
  ARTISAN_BASE_TEMPLATE_NAME,
} from '../constants/aws';
import { ARCHIVE_TEMPLATES_DIRECTORY } from '../constants/paths';

import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

export default async function createIllustration(
  projectSlug,
  illustrationName,
) {
  const projectsFolder = await getWorkingProjectPath(projectSlug);
  const illustrationSlug = slugify(illustrationName);
  const illustrationFileName = `${illustrationSlug}.ai`;

  const illoPath = await join(
    projectsFolder,
    illustrationSlug,
  );
  await createDir(illoPath);

  const destinationFile = await join(illoPath, illustrationFileName);

  const template = await s3.download({
    bucket: AWS_ARTISAN_BUCKET,
    key: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
  });
  await writeBinaryFile(destinationFile, template);

  store.addIllustration({ projectSlug, illustrationName });
}
