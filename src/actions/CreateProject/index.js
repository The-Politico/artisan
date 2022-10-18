import { documentDir, join } from "@tauri-apps/api/path";
import { createDir } from "@tauri-apps/api/fs";
import { addProject } from "../../store/operations/project-add";

import slugMaker from "../../utils/slug-maker";

export default async function CreateProject(projectName) {

  const docsPath = await documentDir();
  const projPath = await join(docsPath, 'Artisan', 'Projects', slugMaker(projectName));
  
  await createDir(projPath);

  addProject(projectName);

}