import { useCallback } from 'react';
import atoms from '../atoms';
import publishIllustration from '../utils/illustrations/publishIllustration';

export default function usePublishProject(projectId) {
  const illustrations = atoms.use.illustrationsInProject(projectId);

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        await publishIllustration(illoId);
      })),
    );
  }, [illustrations]);
}
