import { useCallback } from 'react';
import atoms from '../atoms';
import generateIllustration from '../utils/illustrations/generateIllustration';

/**
 * Hook to set up a function for generating an illustration
 * @function
 * @param {string} illoId - The ID of the illustration
 * @returns {function(): Promise}
 */
export default function useGenerateIllustration(illoId) {
  const illoDetails = atoms.use.illustration(illoId);
  const { slug: illoSlug, project: projectId } = illoDetails;

  const project = atoms.use.project(projectId);
  const { slug: projectSlug } = project;

  return useCallback(() => {
    generateIllustration(projectSlug, illoSlug);
  }, [projectSlug, illoSlug]);
}
