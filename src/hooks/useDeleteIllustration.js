import { useCallback } from 'react';

import deleteIllustration from '../actions/illustrations/deleteIllustration';

export default function useDeleteIllustration(illoId) {
  return useCallback(async () => {
    await deleteIllustration(illoId);
  }, [illoId]);
}
