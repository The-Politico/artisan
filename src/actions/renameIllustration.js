import { renameFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import store from '../store';

export default async function renameIllustration(
  projectSlug,
  illustrationSlug,
  newName,
) {
  console.log("Inside rename now");
  const illoInfo = await store.renameIllustration({
    project: projectSlug,
    slug: illustrationSlug,
    name: newName,
  });

  const { slug: newIlloSlug } = illoInfo;

  const projectFolder = await join(
    await store.getWorkingDir(),
    projectSlug,
  );

  await renameFile(
    await join(projectFolder, illustrationSlug),
    await join(projectFolder, newIlloSlug),
  );

  await renameFile(
    await join(projectFolder, newIlloSlug, `${illustrationSlug}.ai`),
    await join(projectFolder, newIlloSlug, `${newIlloSlug}.ai`),
  );
}
