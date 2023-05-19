import { useCallback } from 'react';
import duplicateIllustration
  from '../actions/illustrations/duplicateIllustration';
import idToSlugs from '../utils/ids/idToSlugs';
import downloadIllustration
  from '../actions/illustrations/downloadIllustration';
import atoms from '../atoms';
import slugify from '../utils/text/slugify';

export default function useDuplicateProject(projectId) {
  const illustrations = atoms.useRecoilValue(
    atoms.illustrationsInProject(projectId),
  );

  return useCallback(async (duplicateProjectName) => {
    // TODO: Make sure new project name is unique

    const duplicateProjectSlug = slugify(duplicateProjectName);

    await Promise.all(
      illustrations.map((async (illoId) => {
        const slugs = idToSlugs(illoId);

        const duplicateId = await duplicateIllustration(
          illoId,
          duplicateProjectSlug,
          slugs.illustration,
        );

        await downloadIllustration(duplicateId);
      })),
    );
  }, [projectId, illustrations]);
}
