import { useCallback } from 'react';
import atoms from '../atoms';
import deleteIllustration from '../actions/illustrations/deleteIllustration';

export default function useDeleteProject(projectId) {
  const [activeProject, setActiveProject] = atoms.useRecoilState(
    atoms.activeProject,
  );

  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        await deleteIllustration(illoId);
      })),
    );

    if (activeProject === projectId) {
      setActiveProject(undefined);
    }
  }, [illustrations]);
}
