import { removeFile, removeDir } from "@tauri-apps/api/fs";
import { documentDir, join } from '@tauri-apps/api/path';

import { removeIllustration } from "../../store/operations/illustration-remove";

export default async function DeleteIllustration(projectSlug, illustrationSlug) {

  const illoFile = illustrationSlug + ".ai"
  const docsPath = await documentDir();
  const illustrationDirPath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug);
  const illustrationFilePath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug, illoFile);
  const outputDir = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug, "ai2html-output");
  await removeFile(illustrationFilePath);
  await removeDir(outputDir, { recursive: true });

  // removeIllustration(projectSlug, illustrationSlug);
  

}