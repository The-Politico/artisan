import store from '../../store';

/**
 * Gets the list of all entities from the store
 * @function
 * @returns {string[]}
 */
export default async function onReadEntities() {
  const entities = await store.entities.get();
  return entities.map(([id]) => id);
}
