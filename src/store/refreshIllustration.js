import fetchArchive from '../utils/archive/fetchArchive';
import deleteValue from './delete';
import updateDict from './updateDict';

/**
 * Refreshes just a single IDd entity, to update it's data
 * from the cloud
 * @deprecated
 * @param {string} id - The ID of the entity to update

 */
export default async function refreshIllustration(id) {
  const archive = await fetchArchive();
  const archiveInfo = archive.find((record) => record.id === id);

  if (!archiveInfo) {
    await deleteValue('illustrations', id);
    return false;
  }

  const update = {
    [id]: {
      slug: {
        $set: archiveInfo.slug,
      },
      project: {
        $set: archiveInfo.project,
      },
      lastUpdated: {
        $set: archiveInfo.lastUpdated,
      },
      cloudVersion: {
        $set: archiveInfo.version,
      },
    },
  };

  await updateDict('illustrations', update);
  return true;
}
