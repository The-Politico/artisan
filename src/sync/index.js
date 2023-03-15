import fsSync from './fs';
import s3Sync from './s3';
import RecoilSyncRoot from './recoil';

/**
 * Starts the various sync processes and listeners
 *
 * @async
 * @function
 * @returns {Promise<void>} - A Promise that resolves when the
 *  sync process is started.
 */
async function startSync() {
  await fsSync();
  // await s3Sync();
}

export default {
  start: startSync,
  RecoilSyncRoot,
};
