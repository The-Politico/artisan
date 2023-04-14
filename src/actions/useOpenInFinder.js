import { useCallback } from 'react';
import { open } from '@tauri-apps/api/shell';
import atoms from '../atoms';

/**
 * Hook to set up a function for opening a project in file explorer
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useOpenInFinder(projectId) {
  const projectPath = atoms.use.projectPath(projectId);

  return useCallback(() => {
    open(projectPath);
  }, [projectPath]);
}
