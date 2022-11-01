import { createDir, writeBinaryFile } from '@tauri-apps/api/fs';
import { basename, join } from '@tauri-apps/api/path';

import runPromisesSequentially from '../utils/runPromisesSequentially';

import s3 from '../utils/s3';
import fetchProjecctMeta from '../utils/archive/fetchProjectMeta';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';
import store from '../store';

import {
  METADATA_FILE_NAME,
  ARCHIVE_PROJECTS_DIRECTORY,
} from '../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../constants/aws';

export default async function downloadProject(projectSlug) {
  const keyPath = await join(ARCHIVE_PROJECTS_DIRECTORY, projectSlug);

  // Grabs file names in project folder
  const { Contents } = await s3.list({
    bucket: AWS_ARTISAN_BUCKET,
    prefix: keyPath,
  });

  const files = await Promise.all(
    Contents.map(async (d) => {
      const name = await basename(d.Key, '.ai');
      return {
        illoSlug: name,
        key: d.Key,
      };
    }),
  );

  // Gets text file for project name
  // This should be a JSON file that stores
  // the illustration names as well
  const projectName = await fetchProjecctMeta(projectSlug);
  await store.addProject(projectName, { isUploaded: true });

  // Start of downloading illustrator files
  const projectPath = await getWorkingProjectPath(projectSlug);

  const illos = await Promise.all(
    files
      .filter(({ illoSlug }) => illoSlug !== METADATA_FILE_NAME)
      .map(async ({ key, illoSlug }) => {
        const destination = await join(projectPath, illoSlug);
        const illoPath = await join(destination, `${illoSlug}.ai`);
        await createDir(destination, { recursive: true });

        const byteArray = await s3.download({
          key,
          bucket: AWS_ARTISAN_BUCKET,
        });
        await writeBinaryFile(illoPath, byteArray);

        return illoSlug;
      }),
  );

  // Add illos to store one by one
  await runPromisesSequentially(illos.map(
    (illustrationName) => () => store.addIllustration(
      { projectSlug, illustrationName },
    ),
  ));
}