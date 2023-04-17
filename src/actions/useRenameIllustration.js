import { useCallback } from 'react';
import store from '../store';
import renameIllustration from '../utils/illustrations/renameIllustration';

/**
 * Set up a function to rename an illustration

 * @param {string} illoId - The ID of the illustration
 * @returns {function(): promise<boolean>} - A callback to trigger to rename
 */
export default function useRenameIllustration(illoId) {
  return useCallback(async (name) => {
    const success = await renameIllustration(illoId, name);

    if (success) {
      await store.entities.refreshId(illoId);
      return true;
    }

    return false;
  }, [illoId]);
}
