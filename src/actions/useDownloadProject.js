import { useCallback } from 'react';
import atoms from '../atoms';
import downloadIllustration from '../utils/illustrations/downloadIllustration';

/**
 * Hook to set up a function for downloading a project
 *
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useDownloadProject(projectId) {
  const illustrations = atoms.use.illustrationsInProject(projectId);

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        await downloadIllustration(illoId);
      })),
    );
  }, [illustrations]);
}
