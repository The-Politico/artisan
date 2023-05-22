import store from '../../store';
import ids from '../../utils/ids';
import duplicateIllustration from '../illustrations/duplicateIllustration';
import downloadIllustration from '../illustrations/downloadIllustration';

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

  const illustrations = await store.illustrations.get();
  const illustrationsInProject = illustrations
    .filter(([id]) => ids.parse(id).project === sourceId);

  await Promise.all(
    illustrationsInProject.map((async (illoId) => {
      const { illustration: illoName } = ids.parse(illoId);

      const duplicateId = await duplicateIllustration(
        illoId,
        projectName,
        illoName,
      );

      await downloadIllustration(duplicateId);
    })),
  );
}
