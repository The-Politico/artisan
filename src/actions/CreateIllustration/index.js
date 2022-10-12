import { copyFile, createDir, writeBinaryFile } from '@tauri-apps/api/fs';

import { resolveResource, documentDir, join } from '@tauri-apps/api/path';
import { addIllustration } from '../../store/operations/illustration-add';

import { downloadS3Object } from '../../utils/download-from-s3';
import SlugMaker from '../../utils/SlugMaker';

export default async function CreateIllustration(projectSlug, illustrationName) {

  const illustrationSlug = SlugMaker(illustrationName);
  const illustrationFileName = illustrationSlug + ".ai";

  const docsPath = await documentDir();
  const illoPath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug);
  await createDir(illoPath); 

  const destinationFile = await join(illoPath, illustrationFileName);

  const s3Settings = {
    bucket: import.meta.env.VITE_AWS_STAGING_BUCKET,
    key:  "artisan-test/templates/base.ai",
  }

  const template = await downloadS3Object(s3Settings);
  await writeBinaryFile(destinationFile, template)

  addIllustration(projectSlug, illustrationName);

}
