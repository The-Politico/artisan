import { useCallback } from 'react';
import duplicateProject from '../actions/projects/duplicateProject';

export default function useDuplicateProject(projectId) {
  return useCallback(async (duplicateProjectName) => {
    await duplicateProject(projectId, duplicateProjectName);
  }, [projectId]);
}
