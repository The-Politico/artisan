import { documentDir, join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";

export default async function getIlloPaths(projectSlug){

  const docsPath = await documentDir();
  const fallbackDir = await join(docsPath, "Artisan", "Projects", projectSlug);
  const dirContents = await readDir(fallbackDir, {recursive: true});

  const illos = []

  dirContents.forEach((item) => {
    if ('children' in item)
    illos.push(item.path)
  })

  return illos;

}