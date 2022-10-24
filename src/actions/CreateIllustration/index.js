import { createDir, writeBinaryFile } from '@tauri-apps/api/fs';

import { join } from '@tauri-apps/api/path';
import * as store from '../../store/operations/illustration-add';

import { downloadS3Object } from '../../utils/download-from-s3';
import slugMaker from '../../utils/slug-maker';

import {
  AWS_STAGING_BUCKET,
  ARTISAN_TEMPLATE_KEY,
}
  from '../../constants/buckets';

import getProjectsFolder from '../../utils/get-projects-folder';

export default async function CreateIllustration(
  projectSlug,
  illustrationName,
) {
  const projectsFolder = await getProjectsFolder();
  const illustrationSlug = slugMaker(illustrationName);
  const illustrationFileName = `${illustrationSlug}.ai`;

  const illoPath = await join(
    projectsFolder,
    projectSlug,
    illustrationSlug,
  );
  await createDir(illoPath);

  const destinationFile = await join(illoPath, illustrationFileName);

  const s3Settings = {
    bucket: AWS_STAGING_BUCKET,
    key: ARTISAN_TEMPLATE_KEY,
  };

  const template = await downloadS3Object(s3Settings);
  await writeBinaryFile(destinationFile, template);

  store.addIllustration({ projectSlug, illustrationName });
}
