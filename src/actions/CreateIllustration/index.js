import { copyFile, createDir, writeBinaryFile } from '@tauri-apps/api/fs';

import { resolveResource, documentDir, join } from '@tauri-apps/api/path';
import { addIllustration } from '../../store/operations/illustration-add';

import SlugMaker from '../../utils/SlugMaker';
import downloadTemplate from './utils/DownloadTemplate';

export default async function CreateIllustration(projectSlug, illustrationName) {

  const illustrationSlug = SlugMaker(illustrationName);
  const illustrationFileName = illustrationSlug + ".ai";

  const docsPath = await documentDir();
  const illoPath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug);
  await createDir(illoPath); 

  const destinationFile = await join(illoPath, illustrationFileName);
  const template = await downloadTemplate();
  await writeBinaryFile(destinationFile, template)

  addIllustration(projectSlug, illustrationName);

}
