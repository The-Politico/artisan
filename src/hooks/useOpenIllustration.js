import { useCallback } from 'react';
import { open } from '@tauri-apps/api/shell';
import getIllustrationFilePath from '../utils/paths/getIllustrationFilePath';

/**
 * Hook to set up a function for opening an illustration in Adobe
 * @function
 * @param {string} illoId - The ID of the illustration
 * @returns {function(): Promise}
 */
export default function useOpenIllustration(illoId) {
  return useCallback(async () => {
    const illoPath = await getIllustrationFilePath(illoId);
    await open(illoPath);
  }, [illoId]);
}
