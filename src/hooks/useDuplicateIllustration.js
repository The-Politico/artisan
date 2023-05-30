import { useCallback } from 'react';
import duplicateIllustration
  from '../actions/illustrations/duplicateIllustration';
import ids from '../utils/ids';
import isUniqueId from '../utils/store/isUniqueId';

export default function useDuplicateIllustration(illoId) {
  return useCallback(async (duplicateIlloName) => {
    const { project: projectId } = ids.parse(illoId);

    const valid = ids.validate({
      illustration: duplicateIlloName,
    });
    const unique = isUniqueId({
      project: projectId,
      illustration: duplicateIlloName,
    });

    if (!valid || !unique) {
      // TODO: Error System
      throw new Error('Invalid illustration name provided.');
    }

    await duplicateIllustration(
      illoId,
      projectId,
      duplicateIlloName,
    );
  }, [illoId]);
}
