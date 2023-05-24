import { useCallback } from 'react';

import atoms from '../atoms';
import archiveIllustration from '../actions/illustrations/archiveIllustration';
import archiveProject from '../actions/projects/archiveProject';

/**
 * Hook to set up an archiving function for a project
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useArchiveProject(projectId) {
  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        await archiveIllustration(illoId);
      })),
    );

    await archiveProject(projectId);
  }, [projectId]);
}
