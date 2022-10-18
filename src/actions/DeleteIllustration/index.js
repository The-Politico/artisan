import { removeFile, removeDir } from "@tauri-apps/api/fs";
import { documentDir, join } from '@tauri-apps/api/path';

import { removeIllustration } from "../../store/operations/illustration-remove";

export default async function DeleteIllustration(projectSlug, illustrationSlug) {

  const docsPath = await documentDir();
  const illustrationDirPath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug);

  await removeDir(illustrationDirPath, { recursive: true });

}