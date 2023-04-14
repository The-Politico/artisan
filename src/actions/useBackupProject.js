import { useCallback } from 'react';
import atoms from '../atoms';
import backupIllustration from '../utils/illustrations/backupIllustration';
import { STATUS_PROJECT_VALID_UPLOAD } from '../constants/statuses';
import runPromisesSequentially from '../utils/runPromisesSequentially';

/**
 * Backs up a project's illustrations.
 *
 * @param {string} projectId - The ID of the project to backup.
 * @returns {function(): Promise<boolean>} - A function that executes a backup
 *  if the project is valid or the 'force' flag is set.
 */
export default async function useBackupProject(projectId) {
  const illustrations = atoms.use.illustrationsInProject(projectId);
  const status = atoms.use.status(projectId);

  return useCallback(async ({ force = false } = {}) => {
    if (!force && status !== STATUS_PROJECT_VALID_UPLOAD) {
      return false;
    }

    await runPromisesSequentially(illustrations.map(
      (illustration) => async () => {
        await backupIllustration(illustration);
      },
    ));

    return true;
  }, [illustrations]);
}
