/* eslint-disable */
import { useCallback } from 'react';
import store from '../store';
// import postProjectMeta from '../utils/archive/postProjectMeta';

/**
 * @deprecated until further notice
 * Set up a function to rename an project

 * @param {string} projectId - The ID of the project
 * @returns {function(): promise<boolean>} - A callback to trigger to rename
 */
export default function useRenameProject(projectId) {
  // return useCallback(async (name) => {
  //   await postProjectMeta(projectId, { name });
  //   await store.illustrations.refreshId(projectId);
  // }, [projectId]);
}
