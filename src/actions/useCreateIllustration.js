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
 * Hook to set up a function for creating a new illustration within a project
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(string): Promise}
 */
export default function useCreateIllustration(projectId) {
  const projectPath = atoms.use.projectPath(projectId);
  const illos = atoms.use.illustrationsInProject(projectId);
  const illoSlugs = illos.map(({ slug }) => slug);

  return useCallback(async (illoName) => {
    const illoSlug = slugify(illoName);

    if (illoSlugs.indexOf(illoSlug) >= 0) {
      throw new Error(
        `Illustration, "${illoName}", already exists in project. Please try a new name.`,
      );
    }

    const illoDir = await resolve(
      projectPath,
      illoSlug,
    );

    await ensureDir(illoDir);
    const byteArray = await s3.download({
      key: `${ARCHIVE_TEMPLATES_DIRECTORY}/${ARTISAN_BASE_TEMPLATE_NAME}`,
      bucket: AWS_ARTISAN_BUCKET,
    });

    await writeBinaryFile(
      await resolve(illoDir, `${illoSlug}.ai`),
      byteArray,
    );
  }, [illoSlugs]);
}
