import { useCallback } from 'react';
import { open } from '@tauri-apps/api/shell';
import getProjectPath from '../utils/paths/getProjectPath';

/**
 * Hook to set up a function for opening a project in file explorer
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useOpenProject(projectId) {
  return useCallback(async () => {
    const projectPath = await getProjectPath(projectId);
    await open(projectPath);
  }, [projectId]);
}
