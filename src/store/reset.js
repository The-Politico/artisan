import { ENTITIES, PREVIEW } from './constants';

/**
 * Resets all of the stores to proper defaults
 */
export default async function reset() {
  // Will bring this back eventually
  await Promise.all([
    // SETTINGS.reset(),
    ENTITIES.reset(),
    PREVIEW.reset(),
  ]);
}
