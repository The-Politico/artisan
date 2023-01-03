import fetchProjectsArchive from '../../../utils/archive/fetchProjectsArchive';
import { ENTITIES } from '../../../store/init';

export default async function onReadIllustration(illoId) {
  const localEntities = await ENTITIES.values();
  const illustrationInLocal = await localEntities.find(
    ({ id }) => id === illoId,
  );
  if (illustrationInLocal) {
    return {
      ...illustrationInLocal,
    };
  }

  const archive = await fetchProjectsArchive();
  const projectWithIllo = archive
    .find(
      ({ illustrations }) => illustrations
        .some(({ id }) => id === illoId),
    );

  if (projectWithIllo) {
    const illoInArchive = projectWithIllo
      .illustrations.find(({ id }) => id === illoId);
    return {
      ...illoInArchive,
      type: 'illustration',
      project: projectWithIllo.id,
      fallback: 'asset://...',
    };
  }

  throw new Error(`Project not found: ${illoId}`);
}
