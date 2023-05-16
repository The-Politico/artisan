import { useCallback } from 'react';
import { STATUS_PROJECT_OK } from '../constants/statuses';

import atoms from '../atoms';
import archiveIllustration from '../utils/illustrations/archiveIllustration';
import archiveProject from '../utils/project/archiveProject';
import getProjectStatus from '../utils/project/getProjectStatus';

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
    const status = await getProjectStatus(projectId);

    if (status !== STATUS_PROJECT_OK) {
      // TODO: Replace this with custom error
      throw new Error(
        'The project is not healthy and data could be lost if you archive it.',
      );
    }

    await Promise.all(
      illustrations.map((async (illoId) => {
        await archiveIllustration(illoId);
      })),
    );

    await archiveProject(projectId);
  }, [projectId]);
}
