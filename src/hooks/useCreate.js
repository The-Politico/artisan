import { useCallback } from 'react';
import createIllustration from '../actions/illustrations/createIllustration';
import ids from '../utils/ids';
import isUniqueId from '../utils/store/isUniqueId';

/**
 * Hook to set up a function for creating a new illustration within a project
 * or to set up a new project with an initial illustration
 *
 * @param {string} projectId - The ID of the project
 * @returns {function(string): Promise}
 */
export default function useCreate(projectId) {
  return useCallback(async (illoName, { newProject } = {}) => {
    const realProjectId = newProject || projectId;

    if (!realProjectId) {
      // TODO: TODO: Error system
      throw new Error('No project provided');
    }

    const validIdCharacters = ids.validate({
      project: realProjectId,
      illustration: illoName,
    });

    if (!validIdCharacters) {
      // TODO: Error System
      throw new Error('Invalid project or illustration name provided.');
    }

    const unique = await isUniqueId({
      project: realProjectId,
      illustration: illoName,
      unique: newProject ? 'project' : 'illustration',
    });

    if (!unique) {
      // TODO: Error System
      throw new Error('Project/Illustration name is not unique');
    }

    await createIllustration(realProjectId, illoName);
  }, [projectId]);
}
