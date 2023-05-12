import { useCallback } from 'react';

import deleteIllustration from '../utils/illustrations/deleteIllustration';

export default function useDeleteIllustration(illoId) {
  return useCallback(async () => {
    await deleteIllustration(illoId);
  }, [illoId]);
}
