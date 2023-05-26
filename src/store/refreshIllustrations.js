import difference from 'lodash/difference';
import fetchArchive from '../utils/archive/fetchArchive';
import { ILLUSTRATIONS } from './init';
import updateDict from './updateDict';

/**
 * Refreshes local entity store with latest data from the archive.
 * Adds missing illustrations to the store, updates the local version of
 * illustrations present in the archive, and removes illustrations
 * not in the archive.
 * @deprecated
 * @throws {Error} - An error if data does not match
 * the schema defined in TYPE_ILLUSTRATION_STORE_ITEM.
 */
export default async function refreshIllustrations() {
  const archive = await fetchArchive();

  if (!archive) {
    return false;
  }

  // Update missing data from archive
  const updates = archive.reduce((acc, current) => {
    acc[current.id] = {
      lastGeneratedVersion: {
        $set: null,
      },
      lastGeneratedDate: {
        $set: null,
      },
      lastPublished: {
        $set: null,
      },
    };

    return acc;
  }, {});

  await updateDict('illustrations', updates);

  // Mark missing illustrations as such
  const archiveIllustrationIds = archive.map(({ id }) => id);
  const localIllustrationEntries = await ILLUSTRATIONS.entries();
  const localIllustrationIds = localIllustrationEntries.map(([id]) => id);

  const missingIllustrationsFromArchive = difference(
    localIllustrationIds, archiveIllustrationIds,
  );

  const missingUpdates = missingIllustrationsFromArchive.reduce(
    (acc, current) => {
      acc[current] = {
        cloudVersion: {
          $set: null,
        },
      };

      return acc;
    }, {},
  );
  await updateDict('illustrations', missingUpdates);

  return true;
}
