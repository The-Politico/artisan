import { useCallback } from 'react';
import { resolve } from '@tauri-apps/api/path';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import ensureDir from '../utils/fs/ensureDir';
import s3 from '../utils/s3';
import atoms from '../atoms';

import {
  AWS_ARTISAN_BUCKET,
  ARTISAN_BASE_TEMPLATE_NAME,
} from '../constants/aws';
import { ARCHIVE_TEMPLATES_DIRECTORY } from '../constants/paths';
import slugify from '../utils/text/slugify';

/**
 * Hook to set up a function for creating a new project
 * @function
 * @returns {function(string, string): Promise}
 */
export default function useCreateProject() {
  const slugs = atoms.use.projectSlugs();
  const settings = atoms.use.settings();
  const workingDirectory = settings['working-directory'];

  return useCallback(async (projectName, illoName) => {
    if (!projectName) {
      throw new Error('No project name provided.');
    }
    const projectSlug = slugify(projectName);

    if (slugs.indexOf(projectSlug) >= 0) {
      throw new Error(`Project, "${projectName}", already exists. Please try a new name.`);
    }

    const projectPath = await resolve(
      workingDirectory,
      projectSlug,
    );

    await ensureDir(projectPath);

    if (!illoName) {
      return;
    }

    const illoSlug = slugify(illoName);
    const illoDir = await resolve(projectPath, illoSlug);

    await ensureDir(illoDir);
    const byteArray = await s3.download({
      key: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
      bucket: AWS_ARTISAN_BUCKET,
    });

    await writeBinaryFile(
      await resolve(illoDir, `${illoSlug}.ai`),
      byteArray,
    );
  }, [workingDirectory, slugs]);
}
