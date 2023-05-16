import store from '../../store';

/**
 * Gets the data for an illustration
 * @function
 * @returns {Object}
 */
export default async function onReadIllustration(illoId) {
  const details = await store.entities.get(illoId);
  return details;
}
