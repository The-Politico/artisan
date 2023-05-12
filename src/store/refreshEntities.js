import difference from 'lodash/difference';
import fetchArchive from '../utils/archive/fetchArchive';
import { ENTITIES } from './constants';
import updateDict from './updateDict';

/**
 * Refreshes local entity store with latest data from the archive.
 * Adds missing entities to the store, updates the local version of entities
 * present in the archive, and removes entities not in the archive.
 *
 * @throws {Error} - An error if data does not match
 * the schema defined in TYPE_ENTITY_STORE_ITEM.
 */
export default async function refresh() {
  const archive = await fetchArchive();

  // Update missing data from archive
  const updates = archive.reduce((acc, current) => {
    acc[current.id] = {
      slug: {
        $set: current.slug,
      },
      project: {
        $set: current.project,
      },
      lastUpdated: {
        $set: current.lastUpdated,
      },
      cloudVersion: {
        $set: current.version,
      },
    };

    return acc;
  }, {});
  await updateDict('entities', updates);

  // Mark missing illustrations as such
  const archiveIllustrationIds = archive.map(({ id }) => id);
  const localEntityEntries = await ENTITIES.entries();
  const localEntitiyIds = localEntityEntries.map(([id]) => id);

  const missingIllustrationsFromArchive = difference(
    localEntitiyIds, archiveIllustrationIds,
  );
  const missingUpdates = missingIllustrationsFromArchive.reduce(
    (acc, current) => {
      acc[current.id] = {
        cloudVersion: {
          $set: null,
        },
      };

      return acc;
    }, {},
  );
  await updateDict('entities', missingUpdates);
}
