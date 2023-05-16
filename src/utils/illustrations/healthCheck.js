/* TODO: Cloud Sync: Ignore this file for now */

import store from '../../store';
import runPromisesSequentially from '../runPromisesSequentially';
import checkIllustration from './checkIllustration';

/**
 * Health-check function that retrieves all entities from the store,
 * filters the ones that are illustrations, and runs checks on
 * them sequentially.
 *
 * @return {Promise}
 */
export default async function healthCheck() {
  const entities = await store.entities.get();

  const illustrations = entities.filter(
    ([id, info]) => id.startsWith('I-') && !!info.version,
  );

  await runPromisesSequentially(
    illustrations.map(([illoId]) => () => checkIllustration(illoId)),
  );
}
