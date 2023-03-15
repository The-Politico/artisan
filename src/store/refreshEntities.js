import differenceBy from 'lodash/differenceBy';
import flatten from 'lodash/flatten';
import { assertion } from '@recoiljs/refine';
import fetchProjectsArchive from '../utils/archive/fetchProjectsArchive';
import { ENTITIES } from './constants';
import { TYPE_ENTITY_STORE_ITEM } from '../constants/types';

/**
 * Refreshes local entity store with latest data from the archive.
 * Adds missing entities to the store, updates the local version of entities
 * present in the archive, and removes entities not in the archive.
 *
 * @throws {Error} - An error if data does not match
 * the schema defined in TYPE_ENTITY_STORE_ITEM.
 */
export default async function refresh() {
  const archiveProjects = await fetchProjectsArchive();
  const archiveIllustrations = flatten(
    archiveProjects
      .map(
        ({ id, illustrations }) => illustrations
          .map((illustration) => ({ project: id, ...illustration })),
      ),
  );

  const localEntitiesEntries = await ENTITIES.entries();
  const localEntities = localEntitiesEntries.map(([, value]) => value);

  const localProjects = localEntities
    .filter(({ id }) => id.startsWith('P-'));

  const localIllustrations = localEntities
    .filter(({ id }) => id.startsWith('I-'));

  const missingProjectsFromArchive = differenceBy(
    localProjects, archiveProjects, (({ id }) => id),
  );
  const missingIllustrationsFromArchive = differenceBy(
    localIllustrations, archiveIllustrations, (({ id }) => id),
  );

  // Add missing projects to local entities store
  await Promise.all(archiveProjects.map((project) => {
    const localData = localProjects.find(({ id }) => id === project.id);

    const mergedLocalData = {
      ...project,
      healthy: localData?.healthy,
    };

    assertion(TYPE_ENTITY_STORE_ITEM)(mergedLocalData);
    return ENTITIES.set(project.id, mergedLocalData);
  }));

  // Add missing illustrations to local entities store
  await Promise.all(archiveIllustrations.map((illustration) => {
    assertion(TYPE_ENTITY_STORE_ITEM)(illustration);
    return ENTITIES.set(illustration.id, illustration);
  }));

  // Remove projects and illustrations not in archive from local entities store
  await Promise.all(
    [
      ...missingProjectsFromArchive,
      ...missingIllustrationsFromArchive,
    ].map((project) => ENTITIES.delete(project.id)),
  );

  await ENTITIES.save();
}
