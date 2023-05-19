import store from '../../store';

/**
 * Writes new data to an illustration entity
 * @function
 * @param {Object} value - The data to update with
 * @param {String=} value.name - A new name
 * @param {String=} value.slug - A new slug
 * @param {String=} value.lastUpdated - A new last updated time
 * @param {String=} illoId - The ID of the illustration to change
 * @returns {Promise}
 */
export default async function onWriteIllustration(value, illoId) {
  const baseEntityData = await store.illustrations.get(illoId);

  const change = {
    name: value.name,
    slug: value.slug,
    lastUpdated: new Date().toISOString(),
  };

  await store.illustrations.set({
    [illoId]: {
      ...baseEntityData,
      ...change,
    },
  });
}
