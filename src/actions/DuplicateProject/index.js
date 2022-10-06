import { copyFile } from "@tauri-apps/api/fs";

import { documentDir, join } from "@tauri-apps/api/path";

export default async function Duplicate({originalFilePath, copyFileName}) {
  console.log(originalFilePath); 

  const illustrationFileName = copyFileName + ".ai";
  const docsPath = await documentDir();
  const destinationFile = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationFileName);

  await copyFile(originalFilePath, destinationFile);
  // update store
  
}