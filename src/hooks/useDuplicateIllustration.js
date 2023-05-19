import { useCallback } from 'react';
import duplicateIllustration
  from '../actions/illustrations/duplicateIllustration';
import idToSlugs from '../utils/ids/idToSlugs';
import downloadIllustration from '../actions/illustrations/downloadIllustration';

export default function useDuplicateIllustration(illoId) {
  return useCallback(async (duplicateIlloName) => {
    const slugs = idToSlugs(illoId);

    // TODO: Make sure new illo name is unique

    const duplicateId = await duplicateIllustration(
      illoId,
      slugs.project,
      duplicateIlloName,
    );

    await downloadIllustration(duplicateId);
  }, [illoId]);
}
