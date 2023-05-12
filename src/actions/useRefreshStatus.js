import { useCallback } from 'react';
import atoms from '../atoms';

// TODO: I don't think this works the way we want it to
// We need to figure out a better way to get updated
// statuses into the atoms

/**
 * @deprecated
 * Set up a refresh function to refresh the status of a given entity.
 *
 * @param {string} id - The ID of the entity to be refreshed.
 * @return {function} - A callback to trigger the refresh
 */
export default function useRefreshStatus(id) {
  const setStatus = atoms.use.status.useSetRecoilState(id);

  return useCallback(async () => {
    const status = await atoms.sync.read.status(id);
    setStatus(status);
  }, [id]);
}
