import { useCallback } from 'react';
import atoms from '../atoms';
import backupIllustration from '../utils/illustrations/backupIllustration';
import { STATUS_PROJECT_VALID_UPLOAD } from '../constants/statuses';

/**
 * Backs up a project's illustrations.
 *
 * @param {string} projectId - The ID of the project to backup.
 * @returns {function(): Promise<boolean>} - A function that executes a backup
 *  if the project is valid or the 'force' flag is set.
 */
export default function useBackupProject(projectId) {
  const illustrations = atoms.use.illustrationsInProject(projectId);
  const status = atoms.use.status(projectId);

  return useCallback(async ({ force = true } = {}) => {
    if (!force && status !== STATUS_PROJECT_VALID_UPLOAD) {
      // TODO: Replace this with custom error
      throw new Error('TK TK TK');
    }

    await Promise.all(
      illustrations.map((async (illoId) => {
        await backupIllustration(illoId, { force });
      })),
    );
  }, [illustrations]);
}
