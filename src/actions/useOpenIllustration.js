import { useCallback } from 'react';
import { open } from '@tauri-apps/api/shell';
import getIllustrationFilePath from '../utils/paths/getIllustrationFilePath';

/**
 * Hook to set up a function for opening a project in file explorer
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function useOpenIllustration(illoId) {
  return useCallback(async () => {
    const illoPath = await getIllustrationFilePath(illoId);
    await open(illoPath);
  }, [illoId]);
}
