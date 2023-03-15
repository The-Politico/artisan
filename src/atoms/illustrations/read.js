import store from '../../store';

/**
 * Gets the data for an illustration
 * @function
 * @returns {Object}
 */
export default async function onReadIllustration(illoId) {
  return store.entities.get(illoId);
}
