import store from '../../store';

/**
 * Gets the user's auth config
 * @function
 * @returns {Object}
 */
export default async function readAuth() {
  const authEntries = await store.auth.get();
  return Object.fromEntries(authEntries);
}
