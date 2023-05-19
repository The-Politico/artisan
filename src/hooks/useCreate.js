import { useCallback } from 'react';
import createIllustration from '../actions/illustrations/createIllustration';
import getProjectStatus from '../actions/projects/getProjectStatus';
import { STATUS_PROJECT_ARCHIVED } from '../constants/statuses';
import downloadIllustration
  from '../actions/illustrations/downloadIllustration';

/**
 * Hook to set up a function for creating a new illustration within a project
 * or to set up a new project with an initial illustration
 *
 * @param {string} projectId - The ID of the project
 * @returns {function(string): Promise}
 */
export default function useCreate(projectId) {
  return useCallback(async (illoName, { newProject } = {}) => {
    if (!newProject) {
      const status = await getProjectStatus(projectId);

      if (status === STATUS_PROJECT_ARCHIVED) {
        // TODO: Error system
        throw new Error(
          'Project must be downloaded in order to create a new illo',
        );
      }
    }

    const realProjectId = newProject || projectId;

    if (!realProjectId) {
      // TODO: TODO: Error system
      throw new Error(
        'No project provided',
      );
    }

    const illoId = await createIllustration(realProjectId, illoName);
    await downloadIllustration(illoId);
  }, [projectId]);
}
