import { useCallback } from 'react';
import ensureDir from '../utils/fs/ensureDir';
import atoms from '../atoms';
import downloadIllustration from '../utils/illustrations/downloadIllustration';

/**
 * Hook to set up a function for downloading a project
 *
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
        await downloadIllustration(illoDetails.id);
      })),
    );
  }, [projectPath, projectSlug, illustrations]);
}
