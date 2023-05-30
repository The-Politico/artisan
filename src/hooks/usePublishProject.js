import { useCallback } from 'react';
import atoms from '../atoms';
import { STATUS_ILLUSTRATION_NOT_GENERATED } from '../constants/statuses';
import publishIllustration from '../actions/illustrations/publishIllustration';
import getIllustrationStatus
  from '../actions/illustrations/getIllustrationStatus';
import generateIllustration
  from '../actions/illustrations/generateIllustration';

export default function usePublishProject(projectId) {
  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );

  return useCallback(async () => {
    await Promise.all(
      illustrations.map((async (illoId) => {
        const illoStatus = await getIllustrationStatus(illoId);

        if (illoStatus === STATUS_ILLUSTRATION_NOT_GENERATED) {
          await generateIllustration(illoId);
        }

        await publishIllustration(illoId, { production: true });
      })),
    );
  }, [illustrations]);
}
