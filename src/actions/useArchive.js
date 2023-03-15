import { useCallback } from 'react';
import { removeDir } from '@tauri-apps/api/fs';

import atoms from '../atoms';

/**
 * Hook to set up an archiving function for a project
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useArchive(projectId) {
  const project = atoms.use.project(projectId);
  const { healthy } = project;
  const projectPath = atoms.use.projectPath(projectId);

  return useCallback(async () => {
    if (!healthy) {
      throw new Error(
        'The project is not healthy and data could be lost if you archive it.',
      );
    }

    await removeDir(projectPath, { recursive: true });
  }, [healthy]);
}
