import { invoke } from '@tauri-apps/api/tauri';

export async function handleInvalidTokenError(cb) {
  try {
    await invoke('refresh_token');
  } catch (error) {
    throw new Error('Unable to refresh access token, must sign in again');
    // store.auth.reset();
  }

  return cb();
}
