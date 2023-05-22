import { useCallback } from 'react';
import duplicateProject from '../actions/projects/duplicateProject';
import isUniqueId from '../utils/store/isUniqueId';
import ids from '../utils/ids';

export default function useDuplicateProject(projectId) {
  return useCallback(async (duplicateProjectName) => {
    const valid = ids.validate({
      project: duplicateProjectName,
    });
    const unique = isUniqueId({
      project: duplicateProjectName,
    });

    if (!valid || !unique) {
      // TODO: Error System
      throw new Error('Invalid project name provided.');
    }

    await duplicateProject(projectId, duplicateProjectName);
  }, [projectId]);
}
