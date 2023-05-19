import { useCallback } from 'react';
import createIllustration from '../actions/illustrations/createIllustration';
import getProjectStatus from '../actions/projects/getProjectStatus';
import { STATUS_PROJECT_ARCHIVED } from '../constants/statuses';
import downloadIllustration from '../actions/illustrations/downloadIllustration';
import slugify from '../utils/text/slugify';

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
        // TODO: Replace this with custom error
        throw new Error(
          'Project must be downloaded in order to create a new illo',
        );
      }
    }

    const realProjectId = newProject ? slugify(newProject) : projectId;

    if (!realProjectId) {
      // TODO: Replace this with custom error
      throw new Error(
        'No project provided',
      );
    }

    // TODO: Make sure new project is unique

    // TODO: Make sure Illo Name is unique

    const illoId = await createIllustration(realProjectId, illoName);
    await downloadIllustration(illoId);
  }, [projectId]);
}
