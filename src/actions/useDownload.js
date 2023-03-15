import { useCallback } from 'react';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { resolve } from '@tauri-apps/api/path';
import ensureDir from '../utils/fs/ensureDir';
import s3 from '../utils/s3';
import atoms from '../atoms';

import { AWS_ARTISAN_BUCKET } from '../constants/aws';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../constants/paths';

/**
 * Hook to set up a function for downloading a project
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useDownload(projectId) {
  const project = atoms.use.project(projectId);
  const { slug: projectSlug } = project;

  const illustrations = atoms.use.illustrationsInProject(projectId);
  const projectPath = atoms.use.projectPath(projectId);

  return useCallback(async () => {
    await ensureDir(projectPath);
    await Promise.all(
      illustrations.map((async (illoDetails) => {
        const { slug: illoSlug } = illoDetails;
        const illoDir = await resolve(projectPath, illoSlug);

        await ensureDir(illoDir);

        const byteArray = await s3.download({
          key: `${ARCHIVE_PROJECTS_DIRECTORY}/${projectSlug}/${illoSlug}.ai`,
          bucket: AWS_ARTISAN_BUCKET,
        });

        await writeBinaryFile(
          await resolve(illoDir, `${illoSlug}.ai`),
          byteArray,
        );
      })),
    );
  }, [projectPath, projectSlug, illustrations]);
}
