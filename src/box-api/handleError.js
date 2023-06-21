import { invoke } from '@tauri-apps/api/tauri';

export async function handleInvalidTokenError(cb) {
  console.log('401 error caught, refreshing token');
  await invoke('refresh_token');
  console.log('token refresh complete, retrying api call');
  return cb();
}
