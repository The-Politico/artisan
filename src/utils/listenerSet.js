/**
 * Functional constructor for creating a new set of unique listeners.
 * If a new listener is created with the same key, it will run the
 * unsubscription function which should clean up the listener
 *
 * @returns {Object} The listeners intervace
 */
export default function createListenerSet() {
  const listeners = new Map();

  /**
   * Adds a new listener with the given id and callback function.
   * If a listener with the same id already exists, the existing
   * listener will be unsubscribed before adding the new one.
   *
   * @param {string} id - The unique identifier for the listener.
   * @param {Function} cb - The callback function for the listener, which
   * should return a Promise that resolves to an unsubscribe function.
   *
   * @returns {Promise<void>} A Promise that resolves once the
   * listener has been added.
   */
  const add = async (id, cb) => {
    if (listeners.has(id)) {
      const prom = await listeners.get(id);
      const unsub = await prom;
      unsub();
    }

    const prom = cb();
    listeners.set(id, prom);
  };

  return {
    add,
  };
}
