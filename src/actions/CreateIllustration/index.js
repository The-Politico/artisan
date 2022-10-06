import { copyFile } from '@tauri-apps/api/fs';
import { resolveResource, documentDir, join } from '@tauri-apps/api/path';

import { Store } from 'tauri-plugin-store-api';

import SlugMaker from '../../utils/SlugMaker';
const store = new Store('./utils/store');

export default async function CreateIllustration({projectSlug, illustrationTitle}) {

  const illustrationFileName = illustrationTitle + ".ai";
  const templateFile = await resolveResource('template-standard.ai');

  const docsPath = await documentDir();
  const destinationFile = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationFileName);

  await copyFile(templateFile, destinationFile);

    // update settings
    const previousProjectSetting = await store.get(projectSlug);
    const updatedProjectSetting = previousProjectSetting.illustrations.push({
      "name": illustrationTitle,
      "slug": SlugMaker(illustrationTitle),
      "publicURL": null
    })
    await store.set('projects', {value: updatedProjectSetting});

}
