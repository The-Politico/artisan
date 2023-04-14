import { ENTITIES } from './constants';
import fetchProjectMeta from '../utils/archive/fetchProjectMeta';
import { fetchIlloMetaFromSlug } from '../utils/archive/fetchIlloMeta';

/**
 * Refreshes just a single IDd entity, to update it's data
 * from the cloud
 *
 * @param {string} id - The ID of the entity to update

 */
export default async function refreshEntity(id) {
  const entityInfo = await ENTITIES.get(id);

  if (id.startsWith('P-')) {
    const projectInfo = await fetchProjectMeta(
      entityInfo.slug, { skipIllustrations: true },
    );

    await ENTITIES.set(id, {
      ...entityInfo,
      ...projectInfo,
    });
  }

  if (id.startsWith('I-')) {
    const projectInfo = await ENTITIES.get(entityInfo.project);
    const illoInfo = await fetchIlloMetaFromSlug(
      projectInfo.slug,
      entityInfo.slug,
    );

    await ENTITIES.set(id, {
      ...entityInfo,
      name: illoInfo.name,
    });
  }
}
