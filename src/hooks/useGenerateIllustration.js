import { useCallback } from 'react';
import generateIllustration
  from '../actions/illustrations/generateIllustration';

/**
 * Hook to set up a function for generating an illustration
 * @function
 * @param {string} illoId - The ID of the illustration
 * @returns {function(): Promise}
 */
export default function useGenerateIllustration(illoId) {
  return useCallback(async () => {
    await generateIllustration(illoId);
  }, [illoId]);
}
