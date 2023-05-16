import { useCallback } from 'react';
import atoms from '../atoms';
import deleteIllustration from '../utils/illustrations/deleteIllustration';

export default function useDeleteProject(projectId) {
  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        await deleteIllustration(illoId);
      })),
    );
  }, [illustrations]);
}
