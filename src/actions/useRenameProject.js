import { useCallback } from 'react';
import store from '../store';
import postProjectMeta from '../utils/archive/postProjectMeta';

/**
 * Set up a function to rename an project

 * @param {string} projectId - The ID of the project
 * @returns {function(): promise<boolean>} - A callback to trigger to rename
 */
export default function useRenameProject(projectId) {
  return useCallback(async (name) => {
    await postProjectMeta(projectId, { name });
    await store.entities.refreshId(projectId);
  }, [projectId]);
}
