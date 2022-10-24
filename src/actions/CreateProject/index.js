import { join } from '@tauri-apps/api/path';
import { createDir } from '@tauri-apps/api/fs';
import * as store from '../../store/operations/project-add';

import slugMaker from '../../utils/slug-maker';

import getProjectsFolder from '../../utils/get-projects-folder';

export default async function CreateProject(projectName) {
  const projectsFolder = await getProjectsFolder();
  const projPath = await join(
    projectsFolder,
    slugMaker(projectName),
  );

  await createDir(projPath);

  store.addProject(projectName);
}
