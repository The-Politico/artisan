import fetchArchive from '../utils/archive/fetchArchive';
import deleteValue from './delete';
import updateDict from './updateDict';

/**
 * Refreshes just a single IDd entity, to update it's data
 * from the cloud
 *
 * @param {string} id - The ID of the entity to update

 */
export default async function refreshEntity(id) {
  const archive = await fetchArchive();
  const archiveInfo = archive.find((record) => record.id === id);

  if (!archiveInfo) {
    await deleteValue('entities', id);
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

  await updateDict('entities', update);
  return true;
}
