import ids from '../../utils/ids';
import getIllosInProject from '../../utils/store/getIllosInProject';
import duplicateIllustration from '../illustrations/duplicateIllustration';

export default async function duplicateProject(
  sourceId,
  projectName,
) {
  const valid = ids.validate({
    project: projectName,
  });

  // TODO: Error System
  if (!valid) {
    throw new Error('Invalid illustration name provided.');
  }

  const illustrationsInProject = await getIllosInProject(sourceId);

  await Promise.all(
    illustrationsInProject.map((async ([illoId]) => {
      const { illustration: illoName } = ids.parse(illoId);

      await duplicateIllustration(
        illoId,
        projectName,
        illoName,
      );
    })),
  );
}
